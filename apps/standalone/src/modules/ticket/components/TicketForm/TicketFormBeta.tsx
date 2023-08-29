import {
  emailRegex,
  generatePath,
  useJob,
  useNavigate,
} from "@moose-desk/core";

import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import useSaveDataGlobal from "@moose-desk/core/hooks/useSaveDataGlobal";
import {
  Customer,
  EmailIntegration,
  priorityOptions,
  TicketRepository,
} from "@moose-desk/repo";
import { Card } from "antd";
import { uniqBy } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { catchError, map, of } from "rxjs";
import { MDButton } from "src/components/UI/Button/MDButton";
import TextEditorTicketBeta from "src/components/UI/Editor/TextEditorTicketBeta";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import { MDInput } from "src/components/UI/Input";
import Select from "src/components/UI/Select/Select";
import useDeepEffect from "src/hooks/useDeepEffect";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import ResultShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ResultShopifySearch";
import { ModalCustomer } from "src/modules/ticket/components/ModalCustomer";
import { AgentSelect } from "src/modules/ticket/components/TicketForm/AgentSelect";
import { AutoSelect } from "src/modules/ticket/components/TicketForm/AutoSelect";
import { SelectList } from "src/modules/ticket/components/TicketForm/SelectList";
import { SelectTag } from "src/modules/ticket/components/TicketForm/SelectTag";
import { TagSelect } from "src/modules/ticket/components/TicketForm/TagSelect";
import {
  getListCustomerApi,
  getListEmailIntegration,
} from "src/modules/ticket/helper/api";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import useFormCreateTicket from "src/modules/ticket/store/useFormCreateTicket";
import { wrapImageWithAnchorTag } from "src/utils/localValue";

interface TicketFormProps {
  primaryEmail?: EmailIntegration;
  initialValues?: any;
}

const validateCCEmail = (
  value: string[],
  fromEmail = "",
  toEmail = ""
): boolean | string => {
  if (!value) return true;
  let checked = true;
  for (const item of value) {
    if (item === fromEmail) {
      return "fromEmail";
    }
    if (item === toEmail) {
      return "toEmail";
    }
    if (!emailRegex.test(item)) {
      checked = false;
      break;
    }
  }
  return checked;
};

export const TicketFormBeta = ({ primaryEmail, ...props }: TicketFormProps) => {
  const queryClient = useQueryClient();
  const [enableCC, setEnableCC] = useState(false);
  const message = useMessage();
  const notification = useNotification();
  const navigate = useNavigate();
  const updateContent = useFormCreateTicket((state) => state.updateState);
  const [fromEmail, setFromEmail] = useState(primaryEmail);
  const [toEmail, setToEmail] = useState({ value: "", id: "" });
  const [form] = Form.useForm();
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const { setDataSaved }: any = useSaveDataGlobal();
  const { t } = useTranslation();
  const [openModalCustomer, setOpenModalCustomer] = useState(false);
  const contentCreate = useFormCreateTicket((state) => state.content);
  const [isChanged, setIsChanged] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState<string>("");
  const debounceCustomer: string = useDebounce(searchCustomer, 200);
  const [dataCustomersFetch, setDataCustomerFetch] = useState<Customer[]>([]);
  const { data: dataCustomers, isFetching: isFetchingCustomer } = useQuery({
    queryKey: ["getCustomers", { page: 1, limit: 10, query: debounceCustomer }],
    queryFn: () =>
      getListCustomerApi({ page: 1, limit: 10, query: debounceCustomer }),
    retry: 3,
    // staleTime: 10000,
    onSuccess: (data) => {
      setDataCustomerFetch(uniqBy([...data, ...dataCustomersFetch], "_id"));
    },
    onError: () => {
      message.error(t("messages:error.get_customer"));
    },
  });
  const customersOptions = useMemo(() => {
    if (!dataCustomers) return [];
    return dataCustomers.map((item) => {
      return {
        label: `${item.firstName} ${item.lastName} - ${item.email}`,
        value: item.email,
        obj: item,
      };
    });
  }, [dataCustomers]);

  const { data: dataEmailIntegration } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500, isLive: 1 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      message.error(t("messages:error.get_customer"));
    },
  });
  const emailIntegrationOptions = useMemo(() => {
    if (!dataEmailIntegration) return [];
    return dataEmailIntegration.map((item) => {
      return {
        label: `${item.name} - ${item.supportEmail}`,
        value: item._id,
        obj: item,
      };
    });
  }, [dataEmailIntegration]);

  const { run: CreateTicket } = useJob((dataSubmit: any) => {
    message.loading.show(t("messages:loading.creating_ticket"));

    return TicketRepository()
      .create(dataSubmit)
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(t("messages:success.create_ticket"));
            // navigate()
            navigate(
              generatePath(TicketRoutePaths.Detail, { id: data.data._id })
            );
          } else {
            if (data.statusCode === 409) {
              notification.error(
                `Ticket is ${dataSubmit.email} already exists.`
              );
            }
          }
        }),
        catchError((err) => {
          message.loading.hide();
          notification.error(t("messages:error.create_ticket"));

          return of(err);
        })
      );
  });

  const handleChangeForm = useCallback((changedValue) => {
    if (changedValue.content) {
      const contentSplit = changedValue.content.split("- - - - - - -");
      updateContent({ content: contentSplit[0] });
    } else {
      updateContent({ content: "" });
    }
  }, []);

  const onFinish = (values: any) => {
    const tags: string[] = values.tags;
    const findCustomer = dataCustomersFetch.find(
      (item) => item.email === values.to
    );

    const dataCreate: any = {
      fromEmail: {
        email: fromEmail?.supportEmail,
        name: fromEmail?.name,
      },
      senderConfigId: values.from,
      agentObjectId: values.assignee
        ? values.assignee.split(",")[0]
        : undefined,
      agentEmail: values.assignee ? values.assignee.split(",")[1] : undefined,
      toEmails: [
        {
          email: values.to,
          name: findCustomer
            ? `${findCustomer.firstName} ${findCustomer.lastName}`
            : values.to.split("@")[0],
        },
      ],
      customerObjectId: findCustomer ? findCustomer._id : undefined,

      ccEmails: enableCC ? values?.CC : [],
      bccEmails: enableCC ? values?.BCC : [],
      subject: values.subject,
      description: wrapImageWithAnchorTag(values.content),
      status: "OPEN",
      priority: values.priority,
      tags: tags,
      attachmentIds: files,
    };
    CreateTicket(dataCreate);
  };

  const onChangeEmailIntegration = (value: string, options: any) => {
    form.setFieldValue(
      "content",
      options?.obj?.signature
        ? `${
            contentCreate || "<br/>"
          }<div class='divide'> - - - - - - - </div><div class='signature'>${
            options?.obj?.signature
          }</div>`
        : contentCreate
    );
    setFromEmail(options.obj);
    form.validateFields();
  };

  const onChangeEmail = (value: string, options: any) => {
    setToEmail({
      value,
      id: options?.obj ? options?.obj?._id : "",
    });
    setDataSaved({ customerId: options?.obj ? options?.obj?._id : "" });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["saveData"]);
    };
  }, []);
  useDeepEffect(() => {
    if (!enableCC) {
      form.setFieldValue("CC", []);
      form.setFieldValue("BCC", []);
    }
  }, [enableCC]);
  return (
    <Form
      colon={false}
      form={form}
      layout={"horizontal"}
      enableReinitialize
      onFinish={onFinish}
      onValuesChange={handleChangeForm}
      className="form-ticket"
      {...props}
    >
      <div className="flex h-full ">
        <Card
          className="w-full flex-1"
          style={{
            borderRightWidth: 0,
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            position: "relative",
          }}
          bodyStyle={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 16,
            position: "relative",
            overflow: "auto",
          }}
        >
          <Header className="mb-5" title="New Ticket"></Header>

          <div className=" flex w-full  items-center pb-3">
            <Form.Item
              className="m-0 w-full"
              name="subject"
              // label="Subject"
              rules={[
                {
                  required: true,
                  message: "Subject is required",
                  whitespace: true,
                },
              ]}
            >
              <MDInput placeholder="Subject" />
            </Form.Item>
          </div>

          <div className="flex-1 flex justify-end flex-col">
            <div className="md-from-detail w-full flex items-center gap-2 px-3">
              <span className="w-[40px]">From:</span>
              <Form.Item
                className="m-0 w-full"
                name="from"
                rules={[{ required: true, message: "From is required" }]}
              >
                <SelectList
                  bordered={false}
                  showSearch
                  onChange={onChangeEmailIntegration}
                  options={emailIntegrationOptions}
                  filterOption={(input, option: any) => {
                    return (
                      option?.label
                        ?.toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                />
              </Form.Item>
            </div>
            <div className="md-to-detail w-full flex items-center gap-2 px-3">
              <span className="w-[40px]">To:</span>
              <Form.Item
                className="w-full m-0"
                name="to"
                rules={[
                  {
                    required: true,
                    message: "Email address is required",
                  },
                  {
                    type: "email",
                    message: "The email address is not valid",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        emailIntegrationOptions.find(
                          (item) => item.value === getFieldValue("from")
                        )?.obj.supportEmail === value
                      ) {
                        return Promise.reject(
                          new Error(
                            "The recipient's email must not be the same as the sender's email"
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <AutoSelect
                  bordered={false}
                  notFoundContent={true}
                  placeholder="Email"
                  options={customersOptions}
                  onChange={onChangeEmail}
                  setOpenModalCustomer={setOpenModalCustomer}
                  onSearch={(value) => {
                    setSearchCustomer(value);
                  }}
                />
              </Form.Item>
              <span
                className="link"
                onClick={() => {
                  setEnableCC(!enableCC);
                }}
              >
                CC/BCC
              </span>
            </div>
            {enableCC ? (
              <div className="md-cc-detail w-full flex items-center gap-2 px-3">
                <span className="w-[40px]">CC:</span>
                <Form.Item
                  className="w-full m-0"
                  name="CC"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          validateCCEmail(
                            value,
                            emailIntegrationOptions.find(
                              (item) => item.value === getFieldValue("from")
                            )?.obj.supportEmail,
                            getFieldValue("to")
                          ) === true
                        ) {
                          return Promise.resolve();
                        } else if (
                          validateCCEmail(
                            value,
                            emailIntegrationOptions.find(
                              (item) => item.value === getFieldValue("from")
                            )?.obj.supportEmail,
                            getFieldValue("to")
                          ) === "fromEmail"
                        ) {
                          return Promise.reject(
                            new Error(
                              "The recipient's email must not be the same as the sender's email"
                            )
                          );
                        } else if (
                          validateCCEmail(
                            value,
                            emailIntegrationOptions.find(
                              (item) => item.value === getFieldValue("from")
                            )?.obj.supportEmail,
                            getFieldValue("to")
                          ) === "toEmail"
                        ) {
                          return Promise.reject(
                            new Error(
                              "The CC's email must not be the same as the to email"
                            )
                          );
                        } else {
                          return Promise.reject(
                            new Error("The email address is not valid")
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <SelectTag
                    mode="tags"
                    bordered={false}
                    placeholder="Email"
                    options={customersOptions}
                    onSearch={(value) => {
                      setSearchCustomer(value);
                    }}
                    onClick={() => {
                      setSearchCustomer("");
                    }}
                    loading={isFetchingCustomer}
                  />
                </Form.Item>
              </div>
            ) : (
              <></>
            )}
            {enableCC ? (
              <div className="md-bcc-detail w-full flex items-center gap-2 px-3">
                <span className="w-[40px]">BCC:</span>

                <Form.Item
                  className="m-0 w-full"
                  name="BCC"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          validateCCEmail(
                            value,
                            emailIntegrationOptions.find(
                              (item) => item.value === getFieldValue("from")
                            )?.obj.supportEmail,
                            getFieldValue("to")
                          ) === true
                        ) {
                          return Promise.resolve();
                        } else if (
                          validateCCEmail(
                            value,
                            emailIntegrationOptions.find(
                              (item) => item.value === getFieldValue("from")
                            )?.obj.supportEmail,
                            getFieldValue("to")
                          ) === "fromEmail"
                        ) {
                          return Promise.reject(
                            new Error(
                              "The recipient's email must not be the same as the sender's email"
                            )
                          );
                        } else if (
                          validateCCEmail(
                            value,
                            emailIntegrationOptions.find(
                              (item) => item.value === getFieldValue("from")
                            )?.obj.supportEmail,
                            getFieldValue("to")
                          ) === "toEmail"
                        ) {
                          return Promise.reject(
                            new Error(
                              "The BCC's email must not be the same as the to email"
                            )
                          );
                        } else {
                          return Promise.reject(
                            new Error("The email address is not valid")
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <SelectTag
                    bordered={false}
                    mode="tags"
                    placeholder="Email"
                    options={customersOptions}
                    onSearch={(value) => {
                      setSearchCustomer(value);
                    }}
                    onClick={() => {
                      setSearchCustomer("");
                    }}
                    loading={isFetchingCustomer}
                  />
                </Form.Item>
              </div>
            ) : (
              <></>
            )}

            <div>
              <Form.Item name="content" className="w-full mb-0">
                <TextEditorTicketBeta
                  form={form}
                  files={files}
                  setFiles={setFiles}
                  setLoadingButton={setLoadingButton}
                  setIsChanged={setIsChanged}
                  init={{
                    menubar: false,
                    placeholder: "Please input your message here......",

                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          <div className="mt-3 flex justify-end items-center gap-2">
            <MDButton
              onClick={() => {
                // createState
                // stateCreate.resetState();
                navigate(TicketRoutePaths.Index);
              }}
            >
              Cancel
            </MDButton>
            <MDButton
              disabled={!isChanged || loadingButton}
              loading={loadingButton}
              type="primary"
              htmlType="submit"
            >
              Send
            </MDButton>
          </div>
        </Card>
        <Card
          style={{
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          className="w-[350px] scroll-y"
          bodyStyle={{ padding: 16 }}
        >
          <Form.Item
            labelAlign="left"
            label={<span style={{ width: 60 }}>Assignee</span>}
            name="assignee"
          >
            <AgentSelect />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            label={<span style={{ width: 60 }}>Priority</span>}
            name="priority"
          >
            <Select size="large" options={priorityOptions}></Select>
          </Form.Item>

          <Form.Item
            labelAlign="left"
            name="tags"
            label={<span style={{ width: 60 }}>Tags</span>}
          >
            <TagSelect maxTagCount={undefined} />
          </Form.Item>

          <div>
            <ResultShopifySearch email={toEmail?.value} id={toEmail?.id} />
          </div>
          {/* <Divider /> */}
        </Card>
      </div>
      <ModalCustomer
        open={openModalCustomer}
        setOpen={setOpenModalCustomer}
        email={toEmail.value}
      />
    </Form>
  );
};

export default TicketFormBeta;

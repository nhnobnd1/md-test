import {
  emailRegex,
  generatePath,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import useSaveDataGlobal from "@moose-desk/core/hooks/useSaveDataGlobal";
import {
  EmailIntegration,
  TicketRepository,
  priorityOptions,
} from "@moose-desk/repo";
import { Card } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { catchError, map, of } from "rxjs";
import { MDButton } from "src/components/UI/Button/MDButton";
import TextEditorTicket from "src/components/UI/Editor/TextEditorTicket";
import { Form } from "src/components/UI/Form";
import { MDInput } from "src/components/UI/Input";
import Select from "src/components/UI/Select/Select";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { ModalCustomer } from "src/modules/ticket/components/ModalCustomer";
import { AutoSelect } from "src/modules/ticket/components/TicketForm/AutoSelect";
import { SelectList } from "src/modules/ticket/components/TicketForm/SelectList";
import { SelectTag } from "src/modules/ticket/components/TicketForm/SelectTag";
import {
  getListAgentApi,
  getListCustomerApi,
  getListEmailIntegration,
  getTagsTicket,
} from "src/modules/ticket/helper/api";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import { wrapImageWithAnchorTag } from "src/utils/localValue";

interface TicketFormProps {
  primaryEmail?: EmailIntegration;
  initialValues?: any;
}

const validateCCEmail = (value: string[], fromEmail = ""): boolean => {
  if (!value) return true;
  let checked = true;
  for (const item of value) {
    if (item === fromEmail) {
      checked = false;
      break;
    }
    if (!emailRegex.test(item)) {
      checked = false;
      break;
    }
  }
  return checked;
};

export const TicketForm = ({ primaryEmail, ...props }: TicketFormProps) => {
  const queryClient = useQueryClient();
  const [enableCC, setEnableCC] = useState(false);
  const message = useMessage();
  const notification = useNotification();
  const navigate = useNavigate();

  const [fromEmail, setFromEmail] = useState(primaryEmail);
  const [toEmail, setToEmail] = useState({ value: "", id: "" });
  const [form] = Form.useForm();
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const { dataSaved }: any = useSaveDataGlobal();
  const { t } = useTranslation();
  const [openModalCustomer, setOpenModalCustomer] = useState(false);
  // const stateCreate = useFormCreateTicket((state) => state);

  const { data: dataCustomers, refetch: refetchCustomer } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: () => getListCustomerApi({ page: 1, limit: 500 }),
    retry: 3,
    staleTime: 10000,
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
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500 }),
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

  const { data: dataAgents } = useQuery({
    queryKey: [
      "getAgents",
      {
        page: 1,
        limit: 500,
      },
    ],
    queryFn: () =>
      getListAgentApi({
        page: 1,
        limit: 500,
      }),
    staleTime: 10000,
    retry: 1,

    onError: () => {
      message.error(t("messages:error.get_agent"));
    },
  });

  const agentsOptions = useMemo(() => {
    if (!dataAgents) return [];
    return dataAgents
      .filter((item) => item.isActive && item.emailConfirmed)
      .map((item) => ({
        label: item.lastName.includes("admin")
          ? `${item.firstName} - ${item.email}`
          : `${item.firstName} ${item.lastName} - ${item.email}`,
        value: `${item._id},${item.email}`,
        obj: item,
      }));
  }, [dataAgents]);

  const { data: dataTags } = useQuery({
    queryKey: [
      "getTagsTicket",
      {
        page: 1,
        limit: 500,
      },
    ],
    queryFn: () =>
      getTagsTicket({
        page: 1,
        limit: 500,
      }),
    staleTime: 10000,
    retry: 1,

    onError: () => {
      message.error(t("messages:error.get_tag"));
    },
  });

  const tagsOptions = useMemo(() => {
    if (!dataTags) return [];
    return dataTags.map((item) => ({
      label: item.name,
      value: item.name,
      obj: item,
    }));
  }, [dataTags]);

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
    // stateCreate.updateState(changedValue);
  }, []);
  const onFinish = (values: any) => {
    const tags: string[] = values.tags;

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
      toEmails: [{ email: values.to, name: values.to.split("@")[0] }],
      customerObjectId: toEmail.id,
      ccEmails: values?.CC,
      bccEmails: values?.BCC,
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
    const regex = /^.*?(?=<div class="signature">)/s;
    const html = form.getFieldValue("content");
    const result = html.match(regex) ? html.match(regex)[0] : html;

    form.setFieldValue(
      "content",
      ` <div class='signature'> <br/> <br/> <br/> ${options?.obj?.signature}</div>`
    );
    setFromEmail(options.obj);
    form.validateFields();
  };

  const onChangeEmail = (value: string, options: any) => {
    setToEmail({
      value,
      id: options?.obj ? options?.obj?._id : "",
    });
  };

  useEffect(() => {
    if (form) {
      form.setFieldsValue({ to: dataSaved?.email });
    }
  }, [dataSaved]);
  useEffect(() => {
    return () => {
      queryClient.removeQueries(["saveData"]);
    };
  }, []);
  return (
    <Form
      form={form}
      layout={"vertical"}
      enableReinitialize
      onFinish={onFinish}
      onValuesChange={handleChangeForm}
      {...props}
    >
      <div className="flex flex-col items-center mt-5">
        <Card className="w-full    ">
          <div className="flex items-start gap-2 ">
            <div className="flex-1">
              <Form.Item
                className="w-full"
                label="To"
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
                  placeholder="Email"
                  options={customersOptions}
                  onChange={onChangeEmail}
                />
              </Form.Item>
              <>
                {enableCC ? (
                  <Form.Item
                    label="CC"
                    name="CC"
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            validateCCEmail(
                              value,
                              emailIntegrationOptions.find(
                                (item) => item.value === getFieldValue("from")
                              )?.obj.supportEmail
                            )
                          ) {
                            return Promise.resolve();
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
                      placeholder="Type CC email..."
                      options={customersOptions}
                    />
                  </Form.Item>
                ) : (
                  <></>
                )}
                {enableCC ? (
                  <Form.Item
                    label="BCC"
                    name="BCC"
                    rules={[
                      () => ({
                        validator(_, value) {
                          if (validateCCEmail(value)) {
                            return Promise.resolve();
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
                      placeholder="Type BCC email..."
                      options={customersOptions}
                    />
                  </Form.Item>
                ) : (
                  <></>
                )}
              </>
            </div>
            <div className="mt-8 absolute right-10 top-[-10px] flex gap-2">
              <span
                className="link"
                onClick={() => {
                  setOpenModalCustomer(true);
                }}
              >
                Add new contact
              </span>
              <span>|</span>
              <span
                className="link"
                onClick={() => {
                  setEnableCC(!enableCC);
                }}
              >
                CC/BCC
              </span>
            </div>
          </div>
          <Form.Item
            label="From"
            name="from"
            rules={[{ required: true, message: "From is required" }]}
          >
            <SelectList
              onChange={onChangeEmailIntegration}
              options={emailIntegrationOptions}
            />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
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
          <div className="mt-4 ">
            <Form.Item
              label="Message"
              name="content"
              className="w-full"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <TextEditorTicket
                form={form}
                files={files}
                setFiles={setFiles}
                setLoadingButton={setLoadingButton}
                // setIsChanged={setIsChanged}
                init={{
                  menubar: false,
                  placeholder: "Please input your message here......",

                  width: "100%",
                }}
              />
            </Form.Item>
          </div>

          <Form.Item name="tags" label="Tags">
            <SelectTag placeholder="Add tags" options={tagsOptions} />
          </Form.Item>
          <Form.Item label="Assignee" name="assignee">
            <SelectList placeholder="Search agents" options={agentsOptions} />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select size="large" options={priorityOptions}></Select>
          </Form.Item>
          <div className="flex-1 flex justify-end items-center gap-2 mt-10 ">
            <MDButton
              onClick={() => {
                // createState
                // stateCreate.resetState();
                navigate(TicketRoutePaths.Index);
              }}
            >
              Cancel
            </MDButton>
            <MDButton loading={loadingButton} type="primary" htmlType="submit">
              Send
            </MDButton>
          </div>
        </Card>
      </div>
      <ModalCustomer open={openModalCustomer} setOpen={setOpenModalCustomer} />
    </Form>
  );
};

export default TicketForm;

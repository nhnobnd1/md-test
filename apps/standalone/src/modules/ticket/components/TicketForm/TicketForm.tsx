import {
  emailRegex,
  generatePath,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import useSaveDataGlobal from "@moose-desk/core/hooks/useSaveDataGlobal";
import {
  AgentRepository,
  CustomerRepository,
  EmailIntegration,
  EmailIntegrationRepository,
  TagRepository,
  TicketRepository,
  priorityOptions,
} from "@moose-desk/repo";
import { Button, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { catchError, map, of } from "rxjs";
import TextEditorTicket from "src/components/UI/Editor/TextEditorTicket";
import { Form } from "src/components/UI/Form";
import Select, { LoadMoreValue } from "src/components/UI/Select/Select";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
// import AutocompleteLoadMore from "src/modules/ticket/components/AutocompleteMore";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface TicketFormProps {
  primaryEmail?: EmailIntegration;
  initialValues?: any;
}

const validateCCEmail = (value: string[]): boolean => {
  if (!value) return true;
  let checked = true;
  for (const item of value) {
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
  const initialValues = props.initialValues;
  const [fromEmail, setFromEmail] = useState(primaryEmail);
  const [toEmail, setToEmail] = useState({ value: "", id: "" });
  const [form] = Form.useForm();
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const { dataSaved }: any = useSaveDataGlobal();
  const { t } = useTranslation();

  const fetchAgents = useCallback(
    (params: LoadMoreValue) => {
      const limit = 500;

      return AgentRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
        })
        .pipe(
          map(({ data }) => {
            return {
              options: data.data
                .filter((item) => item.isActive && item.emailConfirmed)
                .map((item) => ({
                  label: item.lastName.includes("admin")
                    ? `${item.firstName} - ${item.email}`
                    : `${item.firstName} ${item.lastName} - ${item.email}`,
                  value: `${item._id},${item.email}`,
                  obj: item,
                })),
              canLoadMore: params.page < data.metadata.totalPage,
            };
          })
        );
    },
    [AgentRepository]
  );

  const fetchTags = useCallback(
    (params: LoadMoreValue) => {
      const limit = 500;
      return TagRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
        })
        .pipe(
          map(({ data }) => {
            return {
              options: data.data.map((item) => ({
                label: item.name,
                value: item.name,
                obj: item,
              })),
              canLoadMore: params.page < data.metadata.totalPage,
            };
          })
        );
    },
    [TagRepository]
  );

  const fetchEmailIntegration = useCallback(
    (params: LoadMoreValue) => {
      const limit = env.DEFAULT_PAGE_SIZE;
      if (params.value && params.isFirst) {
        return EmailIntegrationRepository()
          .getOneEmail(params.value)
          .pipe(
            map(({ data }) => {
              const item = data.data;
              return {
                options: [
                  {
                    label: `${item.name} - ${item.supportEmail}`,
                    value: item._id,
                    obj: item,
                  },
                ],
                canLoadMore: true,
              };
            })
          );
      } else {
        return EmailIntegrationRepository()
          .getListEmail({
            page: params.page,
            limit: limit,
            query: params.searchText,
          })
          .pipe(
            map(({ data }) => {
              return {
                options: data.data.map((item) => ({
                  label: `${item.name} - ${item.supportEmail}`,
                  value: item._id,
                  obj: item,
                })),
                canLoadMore: params.page < data.metadata.totalPage,
              };
            })
          );
      }
    },
    [EmailIntegrationRepository]
  );

  const fetchCustomer = useCallback(
    (params: LoadMoreValue) => {
      const limit = 500;
      return CustomerRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
        })
        .pipe(
          map(({ data }) => {
            return {
              options: data.data.map((item) => ({
                label: `${item.firstName} ${item.lastName} - ${item.email}`,
                value: item.email,
                obj: item,
              })),
              canLoadMore: params.page < data.metadata.totalPage,
            };
          })
        );
    },
    [EmailIntegrationRepository]
  );

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

  const handleChangeForm = useCallback(() => {
    // console.log('asdasd',changedValue.);
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
      description: values.content,
      status: "OPEN",
      priority: values.priority,
      tags: tags,
      attachmentIds: files,
    };
    CreateTicket(dataCreate);
  };

  const onChangeEmailIntegration = (value: string, options: any) => {
    setFromEmail(options.obj);
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
      initialValues={initialValues}
      onFinish={onFinish}
      onValuesChange={handleChangeForm}
      {...props}
    >
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 gap-x-[7%] xl:w-[800px]  ">
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
                ]}
              >
                <Select.Auto
                  placeholder="Email"
                  virtual
                  loadMore={fetchCustomer}
                  onChange={onChangeEmail}
                />
              </Form.Item>
              <>
                {enableCC ? (
                  <Form.Item
                    label="CC"
                    name="CC"
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
                    <Select.Tags
                      loadMore={fetchCustomer}
                      mode="tags"
                      placeholder="Type CC email..."
                    ></Select.Tags>
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
                    <Select.Tags
                      loadMore={fetchCustomer}
                      mode="tags"
                      placeholder="Type BCC email..."
                    ></Select.Tags>
                  </Form.Item>
                ) : (
                  <></>
                )}
              </>
            </div>
            <div className="mt-8">
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
            <Select.Ajax
              placeholder="Search email integration"
              virtual
              loadMore={fetchEmailIntegration}
              onChange={onChangeEmailIntegration}
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
            <Input placeholder="Subject" />
          </Form.Item>
          <div className="mt-4 xl:w-[800px]">
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
                }}
              />
            </Form.Item>
          </div>
          <Form.Item label="Priority" name="priority">
            <Select options={priorityOptions}></Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select.Tags
              mode="tags"
              placeholder="Add tags"
              loadMore={fetchTags}
              // onChange={onChangeTag}
            ></Select.Tags>
          </Form.Item>
          <Form.Item label="Assignee" name="assignee">
            <Select.Ajax
              placeholder="Search agents"
              virtual
              loadMore={fetchAgents}
            />
          </Form.Item>

          <div></div>
          {/* <Form.Item name="macros" label="Macros">
            <Select></Select>
          </Form.Item> */}
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center gap-2 mt-5">
        <Button
          onClick={() => {
            navigate(TicketRoutePaths.Index);
          }}
        >
          Cancel
        </Button>
        <Button loading={loadingButton} type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default TicketForm;

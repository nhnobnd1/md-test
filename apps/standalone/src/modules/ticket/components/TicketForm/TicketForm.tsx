import {
  emailRegex,
  objectIdRegex,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import {
  AgentRepository,
  CustomerRepository,
  EmailIntegration,
  EmailIntegrationRepository,
  Tag,
  TagRepository,
  TicketRepository,
  priorityOptions,
} from "@moose-desk/repo";
import { Button, Input } from "antd";
import { useCallback, useState } from "react";
import { catchError, map, of } from "rxjs";
import TextEditorTicket from "src/components/UI/Editor/TextEditorTicket";
import { Form } from "src/components/UI/Form";
import Select, { LoadMoreValue } from "src/components/UI/Select/Select";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
// import AutocompleteLoadMore from "src/modules/ticket/components/AutocompleteMore";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import { useStore } from "src/providers/StoreProviders";

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

export const TicketForm = ({ ...props }: TicketFormProps) => {
  const [enableCC, setEnableCC] = useState(false);
  const { storeId } = useStore();
  const [tagsCreated, setTagsCreated] = useState<Tag[] | []>([]);
  const message = useMessage();
  const notification = useNotification();
  const navigate = useNavigate();
  const initialValues = props.initialValues;
  const [fromEmail, setFromEmail] = useState(props.primaryEmail);
  const [toEmail, setToEmail] = useState({ value: "", id: "" });
  const [form] = Form.useForm();
  const [files, setFiles] = useState<any>([]);

  const fetchAgents = useCallback(
    (params: LoadMoreValue) => {
      const limit = 50;

      return AgentRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
        })
        .pipe(
          map(({ data }) => {
            return {
              options: data.data.map((item) => ({
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
      const limit = env.DEFAULT_PAGE_SIZE;
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
                value: item._id,
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
                    label: item.name,
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
                  label: item.name,
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
      const limit = env.DEFAULT_PAGE_SIZE;
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
                label: item.email,
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

  const { run: createTag } = useJob(
    (dataSubmit: any) => {
      return TagRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setTagsCreated([...tagsCreated, data.data]);
            }
          }),
          catchError((err) => {
            return of(err);
          })
        );
    },
    { showLoading: false }
  );

  const { run: CreateTicket } = useJob(
    (dataSubmit: any) => {
      message.loading.show("Creating Customer!");
      return TicketRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              notification.success(
                "Customer Profile has been created succcesfully."
              );
            } else {
              if (data.statusCode === 409) {
                notification.error(
                  `Email is ${dataSubmit.email} already exists.`
                );
              }
            }
          }),
          catchError((err) => {
            message.loading.hide();
            const errorCode = err.response.status;
            if (errorCode === 409) {
              notification.error(
                `Email is ${dataSubmit.email} already exists.`
              );
            } else {
              notification.error("Customer Profile has been created failed.");
            }
            return of(err);
          })
        );
    },
    { showLoading: false }
  );
  const { run: postAttachmentApi } = useJob(
    (dataSubmit: any, dataPost: any) => {
      console.log({ dataSubmit });
      return TicketRepository()
        .postAttachment(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              console.log("upload successfully");
              CreateTicket({
                ...dataPost,
                attachmentIds: data.data.ids,
              });
            }
          }),
          catchError((err) => {
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const handleChangeForm = useCallback((changedValue) => {
    // console.log('asdasd',changedValue.);
  }, []);
  const onFinish = (values: any) => {
    const tags: string[] = values.tags;
    const result = [];

    if (tags?.length) {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        if (objectIdRegex.test(tag)) {
          result.push(tag);
        } else {
          const findItem = tagsCreated.find((item: Tag) => item.name === tag);
          result.push(findItem?._id);
        }
      }
    }
    const dataCreate: any = {
      fromEmail: {
        email: fromEmail?.supportEmail,
        name: fromEmail?.name,
      },
      senderConfigId: values.from,
      agentObjectId: values.assignee.split(",")[0],
      agentEmail: values.assignee.split(",")[1],
      toEmails: [{ email: values.to, name: values.to.split("@")[0] }],
      customerObjectId: toEmail.id,
      ccEmails: values?.CC,
      bccEmails: values?.BCC,
      subject: values.subject,
      description: values.content,
      status: "OPEN",
      priority: values.priority,
      tags: result,
    };
    if (files.length > 0) {
      postAttachmentApi(files, dataCreate);
    } else {
      CreateTicket(dataCreate);
    }
  };

  const onChangeTag = (value: string) => {
    const idsTagCreated = tagsCreated.map((item) => item.name);
    for (const item of value) {
      if (!objectIdRegex.test(item) && !idsTagCreated.includes(item)) {
        createTag({ name: item, storeId });
      }
    }
  };

  const onChangeEmailItegration = (value: string, options: any) => {
    setFromEmail(options.obj);
  };

  const onChangeEmail = (value: string, options: any) => {
    setToEmail({
      value,
      id: options?.obj ? options?.obj?._id : "",
    });
    // setFromEmail(options.obj);
  };
  const onChangeAssignee = (value: string, options: any) => {
    console.log({ value, options });
  };

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
      <div>
        <div className="grid grid-cols-2 gap-x-[7%]">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <Form.Item
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
                      ({ getFieldValue }) => ({
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
                    <Select
                      options={[]}
                      mode="tags"
                      placeholder="Type CC email..."
                    ></Select>
                  </Form.Item>
                ) : (
                  <></>
                )}
                {enableCC ? (
                  <Form.Item
                    label="BCC"
                    name="BCC"
                    rules={[
                      ({ getFieldValue }) => ({
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
                    <Select
                      options={[]}
                      mode="tags"
                      placeholder="Type BCC email..."
                    ></Select>
                  </Form.Item>
                ) : (
                  <></>
                )}
              </>
            </div>
            <span
              className="link"
              onClick={() => {
                setEnableCC(!enableCC);
              }}
            >
              CC/BCC
            </span>
          </div>

          <Form.Item label="Assignee" name="assignee">
            <Select.Assignee
              placeholder="Search agents"
              virtual
              loadMore={fetchAgents}
              // onChange={onChangeAssignee}
            />
          </Form.Item>
          <Form.Item
            label="From"
            name="from"
            rules={[{ required: true, message: "From is required" }]}
          >
            <Select.Ajax
              placeholder="Search email integration"
              virtual
              loadMore={fetchEmailIntegration}
              onChange={onChangeEmailItegration}
            />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select options={priorityOptions}></Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select.Ajax
              mode="tags"
              placeholder="Add tags"
              loadMore={fetchTags}
              onChange={onChangeTag}
            ></Select.Ajax>
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Subject is required" }]}
          >
            <Input placeholder="Subject" />
          </Form.Item>
          <div></div>
          {/* <Form.Item name="macros" label="Macros">
            <Select></Select>
          </Form.Item> */}
        </div>
        <div className="mt-4">
          <Form.Item
            name="content"
            className="w-full"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <TextEditorTicket
              form={form}
              setFiles={setFiles}
              // setIsChanged={setIsChanged}
              init={{
                height: 400,
                menubar: false,
                placeholder: "Please input your message here......",
              }}
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center gap-2">
        <Button
          onClick={() => {
            navigate(TicketRoutePaths.Index);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default TicketForm;

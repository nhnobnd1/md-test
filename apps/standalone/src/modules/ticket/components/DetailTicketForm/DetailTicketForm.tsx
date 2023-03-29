import { emailRegex, objectIdRegex, useJob, useParams } from "@moose-desk/core";
import {
  AgentRepository,
  AttachFile,
  Conversation,
  CreateReplyTicketRequest,
  EmailIntegration,
  EmailIntegrationRepository,
  GetListTagRequest,
  Priority,
  StatusTicket,
  Tag,
  TagRepository,
  Ticket,
  TicketRepository,
  UpdateTicket,
  priorityOptions,
  statusOptions,
} from "@moose-desk/repo";
import { Select as AntSelect, Button, Card, List } from "antd";
import moment from "moment";
import VirtualList from "rc-virtual-list";
import { useCallback, useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import TextEditorTicket from "src/components/UI/Editor/TextEditorTicket";
import { Form, FormProps } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import Select, { LoadMoreValue } from "src/components/UI/Select/Select";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { RowMessage } from "src/modules/ticket/components/DetailTicketForm/RowMessage";
import { useStore } from "src/providers/StoreProviders";
import FaMailReply from "~icons/fa/mail-reply";
import BackIcon from "~icons/mingcute/back-2-fill";
import "./BoxReply.scss";

interface DetailTicketFormProps extends FormProps {}
interface ValueForm {
  status: StatusTicket;
  assignee: string;
  priority: Priority;
  BCC?: string[];
  CC?: string[];
  content: string;
  tags?: string[];
}

export interface ChatItem {
  id: string;
  name: string;
  chat: string;
  time: string;
  email: string;
  attachments?: AttachFile[];
  typeChat?: "reported via widget" | "reported via email" | "agent created";
  toEmail?: string;
  incoming?: boolean;
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

const DetailTicketForm = (props: DetailTicketFormProps) => {
  const message = useMessage();
  const notification = useNotification();
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket>();
  const [form] = Form.useForm();
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [enableCC, setEnableCC] = useState(false);
  const [tagsCreated, setTagsCreated] = useState<Tag[] | []>([]);
  const { storeId } = useStore();
  const [isChanged, setIsChanged] = useState(false);
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();
  const [files, setFiles] = useState<any>([]);

  const listChat = useMemo<ChatItem[]>(() => {
    const conversationMapping: any = conversationList?.map(
      (item: Conversation) => {
        return {
          id: item._id,
          name: item.fromEmail?.name,
          time: `${moment
            .unix(item.createdTimestamp)
            .local()
            .fromNow()} (${moment
            .unix(item.createdTimestamp)
            .local()
            .format("HH:mm DD/MM/YYYY")})`,
          chat: item.description,
          email: item.fromEmail?.email,
          attachments: item.attachments,
          toEmail: item.toEmails[0].email,
          incoming: item?.incoming,
        };
      }
    );
    if (ticket) {
      let typeChat;
      if (ticket.incoming) {
        typeChat = "reported via email";
      } else if (ticket.createdViaWidget) {
        typeChat = "reported via widget";
      } else {
        typeChat = "agent created";
      }
      conversationMapping?.unshift({
        id: ticket._id,
        name: ticket?.fromEmail.name,
        time: `${moment
          .unix(ticket.createdTimestamp)
          .local()
          .fromNow()} (${moment
          .unix(ticket.createdTimestamp)
          .local()
          .format("HH:mm DD/MM/YYYY")})`,
        chat: ticket.description,
        email: ticket.fromEmail.email,
        attachments: ticket.attachments,
        typeChat,
        toEmail: ticket.toEmails ? ticket.toEmails[0].email : "",
        incoming: ticket?.incoming || ticket?.createdViaWidget,
      });
    }
    return conversationMapping;
  }, [ticket, conversationList]);
  const heightBoxComment = useMemo(() => {
    if (listChat.length === 1) {
      return 400;
    } else if (listChat.length === 2) {
      return 600;
    }
    return 900;
  }, [listChat.length]);
  const { run: createTag } = useJob(
    (dataSubmit: any) => {
      return TagRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setTagsCreated([...tagsCreated, data.data]);
              setTags([...tags, data.data]);
            }
          }),
          catchError((err) => {
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
              postReplyApi({
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
  useEffect(() => {
    const tags: string[] = form.getFieldValue("tags");
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
    form.setFieldValue("tags", result);
  }, [tagsCreated.length]);
  const onChangeTag = (value: string) => {
    const idsTagCreated = tagsCreated.map((item) => item.name);
    for (const item of value) {
      if (!objectIdRegex.test(item) && !idsTagCreated.includes(item)) {
        createTag({ name: item, storeId });
      }
    }
  };

  const initialValues = useMemo(() => {
    if (primaryEmail) {
      return {
        status: ticket?.status,
        assignee: ticket?.agentObjectId,
        priority: ticket?.priority,
        to: primaryEmail.supportEmail,
        tags: ticket?.tags,
        content: "",
      };
    }
    return (
      props.initialValues ?? {
        status: ticket?.status,
        assignee: ticket?.agentObjectId,
        priority: ticket?.priority,
        to: ticket?.toEmails ? ticket?.toEmails[0].email : "",
        tags: ticket?.tags,
        content: "",
      }
    );
  }, [props.initialValues, ticket, primaryEmail]);

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
              options: data.data
                .filter((item) => item.isActive && item.emailConfirmed)
                .map((item) => ({
                  label: item.lastName.includes("admin")
                    ? `${item.firstName} - ${item.email}`
                    : `${item.firstName} ${item.lastName} - ${item.email}`,
                  value: item._id,
                  obj: item,
                })),
              canLoadMore: params.page < data.metadata.totalPage,
            };
          })
        );
    },
    [AgentRepository]
  );

  const { run: getTicketApi, processing } = useJob(
    (id: string) => {
      return TicketRepository()
        .getOne(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              if (data.data.createdViaWidget || data.data.incoming) {
                getPrimaryEmail();
              }
              setTicket(data.data);
            } else {
              message.error("Get ticket failed");
            }
          })
        );
    },
    {
      showLoading: false,
    }
  );

  const { run: postReplyApi } = useJob((payload: CreateReplyTicketRequest) => {
    return TicketRepository()
      .postReply(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            // console.log("response create reply", data);
            message.success("Send mail successfully");
            // getTicketApi(payload.id);
            setConversationList([...conversationList, data.data]);
          }
        })
      );
  });

  const { run: getPrimaryEmail } = useJob(
    () => {
      return EmailIntegrationRepository()
        .getPrimaryEmail()
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setPrimaryEmail(data.data);
            }
          }),
          catchError((err) => {
            return of(err);
          })
        );
    },
    { showLoading: false }
  );
  const { run: fetchConversation } = useJob(
    (id: string) => {
      return TicketRepository()
        .getConversations(id)
        .pipe(
          map(({ data }) => {
            getListTagApi({
              page: 1,
              limit: 50,
            });
            setConversationList(data.data);
          }),
          catchError((err) => {
            return of(err);
          })
        );
    },
    { showLoading: false }
  );
  const { run: updateTicketApi } = useJob(
    (data: UpdateTicket) => {
      return TicketRepository()
        .update(data)
        .pipe(
          map(({ data }) => {
            // console.log("update ticket success", data);
          }),
          catchError((err) => {
            return of(err);
          })
        );
    },
    { showLoading: false }
  );
  const { run: getListTagApi, processing: loadingTags } = useJob(
    (payload: GetListTagRequest) => {
      return TagRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const tags = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setTags((prevTags) => {
                return [...prevTags, ...tags];
              });

              if (data.metadata.totalPage > (payload.page as number)) {
                getListTagApi({
                  page: (payload.page as number) + 1,
                  limit: payload.limit,
                });
              }
            } else {
              message.error("Get data ticket failed");
            }
          })
        );
    }
  );
  useEffect(() => {
    if (id) {
      getTicketApi(id);
      fetchConversation(id);
    }
  }, [id]);

  const onFinish = (values: ValueForm) => {
    const dataPost: any = {
      id: ticket?._id,
      attachmentIds: [],
      bccEmails: values.BCC,
      description: values.content,
      ccEmails: values.CC,
      fromEmail: primaryEmail
        ? { name: primaryEmail.name, email: primaryEmail.supportEmail }
        : ticket?.fromEmail,
      senderConfigId: primaryEmail ? primaryEmail._id : ticket?.senderConfigId,

      toEmails: [
        {
          name: primaryEmail
            ? ticket?.fromEmail.name
            : ticket?.toEmails[0].name,
          email: primaryEmail
            ? ticket?.fromEmail.email
            : ticket?.toEmails[0].email,
        },
      ],
    };
    if (files.length > 0) {
      postAttachmentApi(files, dataPost);
    } else {
      postReplyApi(dataPost);
    }

    updateTicketApi({
      priority: values.priority,
      status: values.status,
      tags: values.tags,
      agentObjectId: values.assignee.split(",")[0],
      agentEmail: values.assignee.split(",")[1],
      ids: [ticket?._id as string],
    });
  };
  const handleCloseTicket = () => {
    form.setFieldValue("status", "RESOLVED");
    onFinish(form.getFieldsValue());
  };
  const handleReopenTicket = () => {
    const values = form.getFieldsValue();
    form.setFieldValue("status", "OPEN");
    updateTicketApi({
      status: "OPEN",
      priority: values.priority,
      ids: [ticket?._id as string],
    });
  };

  return (
    <>
      {processing ? (
        <></>
      ) : (
        <>
          <Header
            title={`Ticket ${ticket?.ticketId}: ${ticket?.subject}`}
            back
          ></Header>
          <Form
            disabled={form.getFieldValue("status") === StatusTicket.RESOLVED}
            form={form}
            layout="inline"
            initialValues={initialValues}
            enableLoadForm
            enableReinitialize
            onFinish={onFinish}
          >
            <Card className="w-full">
              <div className="w-full flex items-center gap-4">
                <Form.Item label="Status" name="status">
                  <Select className="w-[150px]" options={statusOptions} />
                </Form.Item>
                <Form.Item label="Assignee" name="assignee">
                  <Select.Assignee
                    placeholder="Search agents"
                    virtual
                    loadMore={fetchAgents}
                    // onChange={onChangeAssignee}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-between items-center w-full mb-6">
                <Form.Item label="Priority" name="priority">
                  <Select
                    prefixCls=""
                    className="w-[150px]"
                    options={priorityOptions}
                  />
                </Form.Item>
              </div>
              {ticket ? (
                <div className="BoxReply w-full">
                  <div className="w-full h-full">
                    <div className="box-chat">
                      <List>
                        <VirtualList
                          data={listChat}
                          // height={heightBoxComment}
                          itemHeight={50}
                          itemKey="id"
                        >
                          {(item: ChatItem) => (
                            <List.Item key={item.id} style={{ paddingLeft: 0 }}>
                              <List.Item.Meta
                                description={<RowMessage item={item} />}
                              />
                            </List.Item>
                          )}
                        </VirtualList>
                      </List>
                    </div>
                    <div className="box-comment">
                      <div className="w-full flex items-start gap-4 flex-wrap">
                        <div className="flex flex-1">
                          <div className="w-full">
                            <Form.Item
                              label="To"
                              name="to"
                              labelCol={{ span: 3 }}
                              wrapperCol={{ offset: 0, span: 18 }}
                              labelAlign="left"
                            >
                              <Select
                                // className="w-[150px]"
                                placeholder="Customer Email"
                              />
                            </Form.Item>
                            {enableCC ? (
                              <Form.Item
                                label="CC"
                                name="CC"
                                labelCol={{ span: 3 }}
                                wrapperCol={{ offset: 0, span: 18 }}
                                labelAlign="left"
                                rules={[
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (validateCCEmail(value)) {
                                        return Promise.resolve();
                                      } else {
                                        return Promise.reject(
                                          new Error(
                                            "The email address is not valid"
                                          )
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
                                labelCol={{ span: 3 }}
                                labelAlign="left"
                                wrapperCol={{ offset: 0, span: 18 }}
                                rules={[
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      if (validateCCEmail(value)) {
                                        return Promise.resolve();
                                      } else {
                                        return Promise.reject(
                                          new Error(
                                            "The email address is not valid"
                                          )
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
                          </div>
                          <div>
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

                        <Form.Item name="tags" label="Tags" className="flex-1">
                          <AntSelect
                            placeholder="Add tags"
                            mode="tags"
                            options={tags.map((item: Tag) => ({
                              value: item._id,
                              label: item.name,
                            }))}
                            onChange={onChangeTag}
                          />
                        </Form.Item>
                      </div>
                      <Form.Item name="content">
                        <TextEditorTicket
                          form={form}
                          setFiles={setFiles}
                          setIsChanged={setIsChanged}
                          init={{
                            height: 400,
                            menubar: false,
                            placeholder: "Please input your message here......",
                          }}
                        />
                      </Form.Item>
                      <div className="flex justify-end">
                        {form.getFieldValue("status") ===
                        StatusTicket.RESOLVED ? (
                          <>
                            <Button
                              icon={
                                <span className="mr-2 translate-y-[3px]">
                                  <BackIcon fontSize={14} />
                                </span>
                              }
                              onClick={handleReopenTicket}
                              disabled={false}
                            >
                              Reopen
                            </Button>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              type="primary"
                              icon={
                                <span className="mr-2 translate-y-[3px]">
                                  <FaMailReply fontSize={14} />
                                </span>
                              }
                              htmlType="submit"
                              disabled={!isChanged}
                            >
                              Reply
                            </Button>
                            <Button
                              disabled={!isChanged}
                              onClick={handleCloseTicket}
                            >
                              Reply & Close Ticket
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </Card>
          </Form>
        </>
      )}
    </>
  );
};

export default DetailTicketForm;

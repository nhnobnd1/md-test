import { emailRegex, useJob, useNavigate, useParams } from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  AttachFile,
  Conversation,
  CreateReplyTicketRequest,
  CustomerRepository,
  EmailIntegration,
  EmailIntegrationRepository,
  GetListAgentRequest,
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
import { Select as AntSelect, Button, Card, Divider, List } from "antd";
import moment from "moment";
import VirtualList from "rc-virtual-list";
import { useCallback, useEffect, useMemo, useState } from "react";

import { catchError, map, of } from "rxjs";
import TextEditorTicket from "src/components/UI/Editor/TextEditorTicket";
import { Form, FormProps } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import Select, { LoadMoreValue } from "src/components/UI/Select/Select";
import useMessage from "src/hooks/useMessage";
import { RowMessage } from "src/modules/ticket/components/DetailTicketForm/RowMessage";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
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
  from?: string;
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket>();
  const [form] = Form.useForm();
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [enableCC, setEnableCC] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);

  const [agents, setAgents] = useState<Agent[]>([]);

  const [emailIntegrationOptions, setEmailIntegrationOptions] = useState<any>(
    []
  );

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
            .format("HH:mm MM/DD/YYYY")})`,
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
          .format("HH:mm MM/DD/YYYY")})`,
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

  const { run: fetchEmailIntegrationApi } = useJob(() => {
    return EmailIntegrationRepository()
      .getListEmail({
        page: 1,
        limit: 500,
      })
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setEmailIntegrationOptions(
              data.data.map((item: EmailIntegration) => ({
                label: `${item.name} - ${item.supportEmail}`,
                value: item._id,
                obj: item,
              }))
            );
          }
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });

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
  const initialValues = useMemo(() => {
    const condition = ticket?.incoming || ticket?.createdViaWidget;
    return {
      status: ticket?.status,
      assignee: ticket?.agentObjectId,
      priority: ticket?.priority,
      to: condition ? ticket.fromEmail.email : ticket?.toEmails[0].email,
      tags: ticket?.tags,
      content: "",
      from: ticket?.senderConfigId ? ticket.senderConfigId : primaryEmail?._id,
    };
  }, [ticket, primaryEmail]);

  const { run: getListAgentApi } = useJob((payload: GetListAgentRequest) => {
    return AgentRepository()
      .getList(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            const tags = data.data.map((item) => ({
              ...item,
              id: item._id,
            }));
            setAgents((prevTags) => {
              return [...prevTags, ...tags];
            });

            if (data.metadata.totalPage > (payload.page as number)) {
              getListAgentApi({
                page: (payload.page as number) + 1,
                limit: payload.limit,
              });
            }
          } else {
            message.error("Get data ticket failed");
          }
        })
      );
  });
  const agentsOptions = useMemo(() => {
    const mapping = agents.map((item: Agent) => {
      return {
        value: item._id,
        label: item.lastName.includes("admin")
          ? `${item.firstName} - ${item.email}`
          : `${item.firstName} ${item.lastName} - ${item.email}`,
      };
    });
    return mapping;
  }, [agents]);
  const { run: getTicketApi, processing } = useJob((id: string) => {
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
  });

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

  const { run: getPrimaryEmail } = useJob(() => {
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
  });
  const { run: fetchConversation } = useJob((id: string) => {
    return TicketRepository()
      .getConversations(id)
      .pipe(
        map(({ data }) => {
          getListTagApi({
            page: 1,
            limit: 500,
          });
          setConversationList(data.data);
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });
  const { run: updateTicketApi } = useJob((data: UpdateTicket) => {
    return TicketRepository()
      .update(data)
      .pipe(
        map(({ data }) => {
          // console.log("update ticket success", data);
          if (data.statusCode === 200) {
            message.success("Update ticket successfully");
          }
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });
  const { run: getListTagApi } = useJob((payload: GetListTagRequest) => {
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
  });
  useEffect(() => {
    if (id) {
      getTicketApi(id);
      fetchConversation(id);
      fetchEmailIntegrationApi();
      getListAgentApi({
        page: 1,
        limit: 500,
      });
    }
  }, [id]);

  const onFinish = (values: ValueForm, closeTicket = false) => {
    const findItemConfigEmail = emailIntegrationOptions.find(
      (item: any) => item.value === values.from
    );
    const dataPost: any = {
      closedTicket: closeTicket,
      id: ticket?._id,
      attachmentIds: files,
      bccEmails: values.BCC,
      description: values.content,
      ccEmails: values.CC,
      fromEmail: {
        name: findItemConfigEmail.obj.name,
        email: findItemConfigEmail.obj.supportEmail,
      },
      senderConfigId: values.from,

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
    postReplyApi(dataPost);

    updateTicketApi({
      priority: values.priority,
      status: values.status,
      tags: values.tags,
      agentObjectId: values.assignee
        ? values.assignee.split(",")[0]
        : undefined,
      agentEmail: values.assignee ? values.assignee.split(",")[1] : undefined,
      ids: [ticket?._id as string],
    });
    setFiles([]);
    form.setFieldValue("content", "");
  };
  const handleCloseTicket = () => {
    form.setFieldValue("status", "RESOLVED");
    onFinish(form.getFieldsValue(), true);
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

  const handleSaveTicket = () => {
    const values = form.getFieldsValue();
    updateTicketApi({
      priority: values.priority,
      status: values.status,
      tags: values.tags,
      agentObjectId: values.assignee
        ? values.assignee.split(",")[0]
        : undefined,
      agentEmail: values.assignee ? values.assignee.split(",")[1] : undefined,
      ids: [ticket?._id as string],
    });
  };

  return (
    <>
      {processing ? (
        <></>
      ) : (
        <div className="wrapContainer">
          {/* <div className="searchToggle">
            <LeftCircleOutlined />
          </div> */}
          <Header
            className="mr-10"
            title={`Ticket ${ticket?.ticketId}: ${ticket?.subject}`}
            back
            backAction={() => {
              navigate(TicketRoutePaths.Index);
            }}
          />
          <Form
            disabled={
              form.getFieldValue("status") === StatusTicket.RESOLVED ||
              loadingButton
            }
            form={form}
            layout="horizontal"
            initialValues={initialValues}
            enableLoadForm
            enableReinitialize
            onFinish={onFinish}
          >
            <Card className="w-full">
              <div className="w-full flex items-center gap-1 flex-wrap">
                <Form.Item
                  className="mr-4"
                  labelAlign="left"
                  label={<span style={{ width: 50 }}>Status</span>}
                  name="status"
                >
                  <Select className="w-[150px]" options={statusOptions} />
                </Form.Item>
                <Form.Item label="Assignee" name="assignee">
                  <AntSelect
                    placeholder="Search agents"
                    className="w-[300px]"
                    options={agentsOptions}
                    // onChange={onChangeAssignee}
                  ></AntSelect>
                </Form.Item>
              </div>
              <div className="flex gap-1 justify-between items-center w-full mb-1 flex-wrap">
                <Form.Item
                  className="mr-4"
                  labelAlign="left"
                  label={<span style={{ width: 50 }}>Priority</span>}
                  name="priority"
                >
                  <Select
                    prefixCls=""
                    className="w-[150px]"
                    options={priorityOptions}
                  />
                </Form.Item>
                <Form.Item
                  name="tags"
                  label={<span style={{ width: 60 }}>Tags</span>}
                  className="flex-1"
                  labelAlign="left"
                >
                  <AntSelect
                    className="w-[300px]"
                    placeholder="Add tags"
                    mode="tags"
                    options={tags.map((item: Tag) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-end">
                <Button type="primary" onClick={handleSaveTicket}>
                  Save
                </Button>
              </div>
              <Divider />
              {ticket ? (
                <div className="BoxReply w-full">
                  <div className="w-full h-full">
                    <div className="box-chat">
                      <List>
                        <VirtualList
                          data={listChat}
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
                    <Divider />
                    <div className="box-comment">
                      <div className="w-full flex justify-between gap-4 flex-wrap">
                        <div className="flex flex-1 flex-col">
                          <div className="w-[400px]">
                            <Form.Item
                              label={<div style={{ width: 35 }}>From</div>}
                              name="from"
                              labelAlign="left"
                            >
                              <Select
                                placeholder="Search email integration"
                                virtual
                                style={{ maxWidth: 334.99 }}
                                options={emailIntegrationOptions}
                              />
                            </Form.Item>
                          </div>
                          <div className="w-[400px]">
                            <Form.Item
                              label={<div style={{ width: 35 }}> To</div>}
                              name="to"
                              labelAlign="left"
                            >
                              <Select disabled placeholder="Customer Email" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col">
                          {enableCC ? (
                            <div className="min-w-[300px] max-w-[400px]">
                              <Form.Item
                                label={<div style={{ width: 35 }}> CC</div>}
                                name="CC"
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
                                <Select.Tags
                                  loadMore={fetchCustomer}
                                  mode="tags"
                                  placeholder="Type CC email..."
                                ></Select.Tags>
                              </Form.Item>
                            </div>
                          ) : (
                            <></>
                          )}
                          {enableCC ? (
                            <div className="min-w-[300px] max-w-[400px]">
                              <Form.Item
                                label={<div style={{ width: 35 }}> BCC</div>}
                                name="BCC"
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
                                <Select.Tags
                                  loadMore={fetchCustomer}
                                  mode="tags"
                                  placeholder="Type BCC email..."
                                ></Select.Tags>
                              </Form.Item>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div>
                        <span
                          className="link mb-5 inline-block"
                          onClick={() => {
                            setEnableCC(!enableCC);
                          }}
                        >
                          CC/BCC
                        </span>
                      </div>
                      <Form.Item
                        name="content"
                        rules={[
                          {
                            required: true,
                            message: "Please input your message!",
                          },
                        ]}
                      >
                        <TextEditorTicket
                          form={form}
                          files={files}
                          disabled={
                            form.getFieldValue("status") ===
                            StatusTicket.RESOLVED
                          }
                          setFiles={setFiles}
                          setIsChanged={setIsChanged}
                          setLoadingButton={setLoadingButton}
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
                              disabled={!isChanged || loadingButton}
                            >
                              Reply
                            </Button>
                            <Button
                              disabled={!isChanged || loadingButton}
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
        </div>
      )}
    </>
  );
};

export default DetailTicketForm;

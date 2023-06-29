import {
  MediaScreen,
  createdDatetimeFormat,
  emailRegex,
  useJob,
  useLoading,
  useNavigate,
  useParams,
  useToggle,
} from "@moose-desk/core";
import {
  Agent,
  AttachFile,
  Conversation,
  CreateReplyTicketRequest,
  EmailIntegration,
  EmailIntegrationRepository,
  Priority,
  StatusTicket,
  Tag,
  Ticket,
  TicketRepository,
  UpdateTicket,
  priorityOptions,
  statusOptions,
} from "@moose-desk/repo";
import { Select as AntSelect, Card, Divider, Skeleton } from "antd";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";

import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { catchError, map, of } from "rxjs";
import { MDModalUI } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";
import TextEditorTicket from "src/components/UI/Editor/TextEditorTicket";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import Icon from "src/components/UI/Icon";
import Select from "src/components/UI/Select/Select";
import useMessage from "src/hooks/useMessage";
import { useSubdomain } from "src/hooks/useSubdomain";
import useViewport from "src/hooks/useViewport";
import { CollapseMessage } from "src/modules/ticket/components/DetailTicketForm/CollapseMessage";
import { SelectTag } from "src/modules/ticket/components/TicketForm/SelectTag";
import {
  getListAgentApi,
  getListCustomerApi,
  getListEmailIntegration,
  getTagsTicket,
} from "src/modules/ticket/helper/api";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import FaMailReply from "~icons/fa/mail-reply";
import BackIcon from "~icons/mingcute/back-2-fill";
import "./BoxReply.scss";

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
  ccEmails?: [];
  bccEmails?: [];
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

const DetailTicketForm = () => {
  const message = useMessage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket>();
  const [form] = Form.useForm();

  const [conversationList, setConversationList] = useState<Conversation[]>([]);
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
  const tags = useMemo(() => {
    if (!dataTags) return [];
    return dataTags;
  }, [dataTags]);
  const { visible, setVisible } = useToggleGlobal();
  const { isMobile } = useViewport(MediaScreen.LG);
  const [enableCC, setEnableCC] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const { t } = useTranslation();
  const {
    state: statusModal,
    on: openStatusModal,
    off: closeStatusModal,
  } = useToggle();
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

  const agents = useMemo(() => {
    if (!dataAgents) return [];
    return dataAgents.filter((item) => item.isActive && item.emailConfirmed);
  }, [dataAgents]);

  const { state: loadingApi, startLoading, stopLoading } = useLoading();
  const endPageRef = useRef<any>(null);

  useEffect(() => {
    if (!loadingApi) {
      endPageRef?.current?.scrollIntoView();
    }
  }, [loadingApi]);
  const { data: dataEmailIntegration, isLoading: loadingList } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      //  message.error(t("messages:error.get_customer"));
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

  const { subDomain } = useSubdomain();

  const { timezone } = useGlobalData(false, subDomain || "");

  const listChat = useMemo<ChatItem[]>(() => {
    const conversationMapping: any = conversationList?.map(
      (item: Conversation) => {
        return {
          id: item._id,
          name: item.fromEmail?.name,
          time: `${moment
            .unix(item.createdTimestamp)
            .local()
            .fromNow()} (${createdDatetimeFormat(
            item.createdDatetime,
            timezone
          )})`,
          chat: item.description,
          email: item.fromEmail?.email,
          attachments: item.attachments,
          toEmail: item.toEmails[0].email,
          incoming: item?.incoming,
          ccEmails: item?.ccEmails,
          bccEmails: item?.bccEmails,
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
        time: `${moment(
          ticket.createdDatetime
        ).fromNow()} (${createdDatetimeFormat(
          ticket.createdDatetime,
          timezone
        )})`,
        chat: ticket.description,
        email: ticket.fromEmail.email,
        attachments: ticket.attachments,
        typeChat,
        toEmail: ticket.toEmails ? ticket.toEmails[0].email : "",
        incoming: ticket?.incoming || ticket?.createdViaWidget,
        ccEmails: ticket?.ccEmails,
        bccEmails: ticket?.bccEmails,
      });
    }
    return conversationMapping;
  }, [ticket, conversationList]);

  const { data: dataCustomers } = useQuery({
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

  const initialValues = useMemo(() => {
    const condition = ticket?.incoming || ticket?.createdViaWidget;
    if (conversationList.length === 0) {
      return {
        status: ticket?.status,
        assignee: ticket?.agentObjectId,
        priority: ticket?.priority,
        to: condition ? ticket.fromEmail.email : ticket?.toEmails[0].email,
        tags: ticket?.tags,
        content: "",
        from: ticket?.senderConfigId
          ? ticket.senderConfigId
          : primaryEmail?._id,
        ccEmails: ticket?.ccEmails,
        CC: ticket?.ccEmails?.map((item) => {
          return item.replace(/.*<([^>]*)>.*/, "$1") || item;
        }),
        BCC: ticket?.bccEmails?.map((item) => {
          return item.replace(/.*<([^>]*)>.*/, "$1") || item;
        }),
      };
    } else {
      return {
        status: ticket?.status,
        assignee: ticket?.agentObjectId,
        priority: ticket?.priority,
        to: condition ? ticket.fromEmail.email : ticket?.toEmails[0].email,
        tags: ticket?.tags,
        content: "",
        from: ticket?.senderConfigId
          ? ticket.senderConfigId
          : primaryEmail?._id,
        ccEmails: ticket?.ccEmails,
        CC: conversationList[conversationList.length - 1]?.ccEmails?.map(
          (item) => {
            return item.replace(/.*<([^>]*)>.*/, "$1") || item;
          }
        ),
        BCC: conversationList[conversationList.length - 1]?.bccEmails?.map(
          (item) => {
            return item.replace(/.*<([^>]*)>.*/, "$1") || item;
          }
        ),
      };
    }
  }, [ticket, primaryEmail, conversationList]);

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
            setEnableCC(data.data.ccEmails.length > 0);
          } else {
            message.error(t("messages:error.get_ticket"));
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
            message.success(t("messages:success.send_mail"));
            stopLoading();
            setConversationList([...conversationList, data.data]);
          }
        }),
        catchError((err) => {
          stopLoading();

          return of(err);
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
  const { run: fetchConversation, processing: isFetchConversation } = useJob(
    (id: string) => {
      return TicketRepository()
        .getConversations(id)
        .pipe(
          map(({ data }) => {
            stopLoading();
            setConversationList(data.data);
          }),
          catchError((err) => {
            stopLoading();

            return of(err);
          })
        );
    }
  );
  const { run: updateTicketApi } = useJob((data: UpdateTicket) => {
    return TicketRepository()
      .update(data)
      .pipe(
        map(({ data }) => {
          // console.log("update ticket success", data);
          if (data.statusCode === 200) {
            stopLoading();
            message.success(t("messages:success.update_ticket"));
          }
        }),
        catchError((err) => {
          stopLoading();

          return of(err);
        })
      );
  });

  useEffect(() => {
    if (id) {
      getTicketApi(id);
      fetchConversation(id);
    }
  }, [id]);

  const onFinish = (values: ValueForm, closeTicket = false) => {
    startLoading();
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
        name: findItemConfigEmail?.obj.name,
        email: findItemConfigEmail?.obj.supportEmail,
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
    startLoading();
    form.setFieldValue("status", "RESOLVED");
    setTicket((previous: any) => {
      return { ...previous, status: "RESOLVED" };
    });
    onFinish(form.getFieldsValue(), true);
  };
  const handleReopenTicket = () => {
    startLoading();
    const values = form.getFieldsValue();
    form.setFieldValue("status", "OPEN");
    setTicket((previous: any) => {
      return { ...previous, status: "OPEN" };
    });
    updateTicketApi({
      status: "OPEN",
      priority: values.priority,
      ids: [ticket?._id as string],
    });
  };

  const handleSaveTicket = () => {
    const values = form.getFieldsValue();
    startLoading();

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
        <>
          <Skeleton />
        </>
      ) : (
        <div className="wrapContainer">
          <Header
            // className="mr-10"
            // title={`  Ticket ${ticket?.ticketId}: ${ticket?.subject}`}
            back
            backAction={() => {
              navigate(TicketRoutePaths.Index);
            }}
          >
            <div className="flex justify-between w-full items-center">
              <h1 className="break-words overflow-hidden">{` Ticket ${ticket?.ticketId}: ${ticket?.subject}`}</h1>
              <div className="flex gap-2 ">
                <MDButton
                  className={isMobile ? "flex" : "hidden"}
                  onClick={() => {
                    endPageRef?.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  icon={<Icon name="replyTicket" />}
                />
                <MDButton
                  className={isMobile ? "flex" : "hidden"}
                  onClick={() => openStatusModal()}
                  icon={<Icon name="statusTicket" />}
                />
                <MDButton
                  onClick={() => setVisible(!visible)}
                  icon={<Icon name="findOrder" />}
                />
              </div>
            </div>
          </Header>
          <Form
            disabled={
              form.getFieldValue("status") === StatusTicket.RESOLVED ||
              loadingButton
            }
            form={form}
            layout="vertical"
            initialValues={initialValues}
            enableLoadForm
            enableReinitialize
            onFinish={onFinish}
            className="flex flex-wrap md:flex-row-reverse xs:flex-col justify-between gap-2"
          >
            <Card className=" mt-5 w-[300px] xs:hidden lg:block">
              <div>
                <Form.Item
                  labelAlign="left"
                  label={<span style={{ width: 50 }}>Status</span>}
                  name="status"
                >
                  <Select
                    size="large"
                    className="w-full"
                    options={statusOptions}
                  />
                </Form.Item>
                <Form.Item
                  labelAlign="left"
                  label={<span style={{ width: 50 }}>Priority</span>}
                  name="priority"
                >
                  <Select className="w-full" options={priorityOptions} />
                </Form.Item>
                <Form.Item label="Assignee" name="assignee">
                  <AntSelect
                    placeholder="Search agents"
                    className="w-full"
                    options={agentsOptions}
                    size="large"
                  ></AntSelect>
                </Form.Item>

                <Form.Item
                  name="tags"
                  label={<span style={{ width: 60 }}>Tags</span>}
                  labelAlign="left"
                >
                  <AntSelect
                    size="large"
                    className="w-full"
                    placeholder="Add tags"
                    mode="tags"
                    options={tags.map((item: Tag) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                  />
                </Form.Item>

                <div className="flex items-center justify-end">
                  <MDButton
                    className="w-full"
                    type="primary"
                    onClick={handleSaveTicket}
                  >
                    Save
                  </MDButton>
                </div>
              </div>
            </Card>
            <Card className=" mt-5 flex-1">
              {ticket ? (
                <div className="BoxReply w-full">
                  <div className="w-full h-full">
                    <div className="box-chat">
                      {!loadingApi && !isFetchConversation ? (
                        <CollapseMessage listChat={listChat} />
                      ) : (
                        <>
                          <Skeleton />
                        </>
                      )}
                    </div>
                    <Divider />
                    <div className="box-comment">
                      <div className="w-full flex justify-between gap-4 flex-wrap">
                        <div className="flex flex-1 flex-col">
                          <div className="xs:w-[300px] sm:w-[400px] ">
                            <Form.Item
                              label={<div style={{ width: 35 }}>From</div>}
                              name="from"
                              labelAlign="left"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your email!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Search email integration"
                                virtual
                                className=""
                                options={emailIntegrationOptions}
                              />
                            </Form.Item>
                          </div>
                          <div className="xs:w-[300px] sm:w-[400px]">
                            <Form.Item
                              label={
                                <div className="flex justify-between items-center xs:w-[300px] sm:w-[400px]">
                                  <div style={{ width: 35 }}> To</div>
                                  <div>
                                    <span
                                      className="link  inline-block"
                                      onClick={() => {
                                        setEnableCC(!enableCC);
                                      }}
                                    >
                                      CC/BCC
                                    </span>
                                  </div>
                                </div>
                              }
                              name="to"
                              labelAlign="left"
                            >
                              <Select disabled placeholder="Customer Email" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col">
                          {enableCC ? (
                            <div className="xs:w-[300px] sm:w-[400px] ">
                              <Form.Item
                                label={<div style={{ width: 35 }}> CC</div>}
                                name="CC"
                                labelAlign="left"
                                rules={[
                                  () => ({
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
                                <SelectTag
                                  mode="tags"
                                  placeholder="Type CC email..."
                                  options={customersOptions}
                                />
                              </Form.Item>
                            </div>
                          ) : (
                            <></>
                          )}
                          {enableCC ? (
                            <div className="xs:w-[300px] sm:w-[400px] ">
                              <Form.Item
                                label={<div style={{ width: 35 }}> BCC</div>}
                                name="BCC"
                                labelAlign="left"
                                rules={[
                                  () => ({
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
                                <SelectTag
                                  mode="tags"
                                  placeholder="Type BCC email..."
                                  options={customersOptions}
                                />
                              </Form.Item>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
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
                            menubar: false,
                            placeholder: "Please input your message here......",
                          }}
                        />
                      </Form.Item>
                      <div className="flex justify-end">
                        {form.getFieldValue("status") ===
                        StatusTicket.RESOLVED ? (
                          <>
                            <MDButton
                              icon={
                                <span className="mr-2 translate-y-[3px]">
                                  <BackIcon fontSize={14} />
                                </span>
                              }
                              onClick={handleReopenTicket}
                              disabled={false}
                            >
                              Reopen
                            </MDButton>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <MDButton
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
                            </MDButton>
                            <MDButton
                              disabled={!isChanged || loadingButton}
                              onClick={handleCloseTicket}
                            >
                              Reply & Close Ticket
                            </MDButton>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Skeleton />
                </>
              )}
            </Card>
            <MDModalUI
              title="Properties"
              open={statusModal}
              onCancel={() => {
                closeStatusModal();
              }}
              footer={[
                <MDButton
                  key="back"
                  onClick={() => {
                    closeStatusModal();
                  }}
                >
                  Cancel
                </MDButton>,
                <MDButton
                  key="submit"
                  type="primary"
                  // loading={loading}
                  onClick={() => {
                    handleSaveTicket();
                    closeStatusModal();
                  }}
                >
                  Save
                </MDButton>,
              ]}
            >
              <Form layout="vertical" form={form}>
                <Form.Item
                  labelAlign="left"
                  label={<span style={{ width: 50 }}>Status</span>}
                  name="status"
                >
                  <Select
                    size="large"
                    className="w-full"
                    options={statusOptions}
                  />
                </Form.Item>
                <Form.Item
                  labelAlign="left"
                  label={<span style={{ width: 50 }}>Priority</span>}
                  name="priority"
                >
                  <Select className="w-full" options={priorityOptions} />
                </Form.Item>
                <Form.Item label="Assignee" name="assignee">
                  <AntSelect
                    placeholder="Search agents"
                    className="w-full"
                    options={agentsOptions}
                    size="large"
                  ></AntSelect>
                </Form.Item>

                <Form.Item
                  name="tags"
                  label={<span style={{ width: 60 }}>Tags</span>}
                  labelAlign="left"
                >
                  <AntSelect
                    size="large"
                    className="w-full"
                    placeholder="Add tags"
                    mode="tags"
                    options={tags.map((item: Tag) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </Form>
            </MDModalUI>
          </Form>
        </div>
      )}
      <div ref={endPageRef}></div>
    </>
  );
};

export default DetailTicketForm;

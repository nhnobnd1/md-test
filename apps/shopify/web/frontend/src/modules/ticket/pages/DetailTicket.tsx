import { generatePath, useJob, useParams, useToggle } from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  AttachFile,
  Conversation,
  CreateReplyTicketRequest,
  Customer,
  CustomerRepository,
  EmailIntegration,
  EmailIntegrationRepository,
  GetListAgentRequest,
  GetListCustomerRequest,
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
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  Divider,
  FormLayout,
  Layout,
  LegacyCard,
  Page,
  Select,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { CircleLeftMajor, CircleRightMajor } from "@shopify/polaris-icons";
import classNames from "classnames";
import { FormikProps } from "formik";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import SelectAddEmail from "src/components/SelectAddEmail/SelectAddEmail";
import SelectAddTag from "src/components/SelectAddTag/SelectAddTag";
import { TextEditorTicket } from "src/components/TextEditorTicket";
import useToggleGlobal from "src/hooks/useToggleGlobal";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import { RowMessage } from "src/modules/ticket/components/RowMessage/RowMessage";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import * as Yup from "yup";
import FaMailReply from "~icons/fa/mail-reply";
import DownIcon from "~icons/material-symbols/arrow-downward";
import UpIcon from "~icons/material-symbols/arrow-upward";
import BackIcon from "~icons/mingcute/back-2-fill";
import styles from "./style.module.scss";

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
interface DetailTicketProps {}

const DetailTicket = (props: DetailTicketProps) => {
  const formRef = useRef<FormikProps<any>>(null);
  const { toggle: updateForm } = useToggle();
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket>();
  const { show } = useToast();
  const { t, i18n } = useTranslation();

  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [enableCC, setEnableCC] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [emailIntegrationOptions, setEmailIntegrationOptions] = useState<any>(
    []
  );
  const endPageRef = useRef<any>(null);
  const topPageRef = useRef<any>(null);
  const [isEndPage, setIsEndPage] = useState(false);

  // detail ticket
  const [agents, setAgents] = useState<Agent[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { visible, setVisible } = useToggleGlobal();
  const [ccDefault, setCCDefault] = useState<string[]>([]);
  const [bccDefault, setBCCDefault] = useState<string[]>([]);

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
        ccEmails: ticket?.ccEmails,
        bccEmails: ticket?.bccEmails,
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
  const { run: getListCustomerApi } = useJob(
    (payload: GetListCustomerRequest) => {
      return CustomerRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const tags = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setCustomers((prevTags) => {
                return [...prevTags, ...tags];
              });

              if (data.metadata.totalPage > (payload.page as number)) {
                getListCustomerApi({
                  page: (payload.page as number) + 1,
                  limit: payload.limit,
                });
              }
            } else {
              // message.error("Get data ticket failed");
            }
          })
        );
    }
  );
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
  const { run: postReplyApi } = useJob((payload: CreateReplyTicketRequest) => {
    return TicketRepository()
      .postReply(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show(t("messages:success.send_mail"));
            setConversationList([...conversationList, data.data]);
          }
        })
      );
  });
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
            // message.error("Get data ticket failed");
          }
        })
      );
  });

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
            setCCDefault(
              data.data?.ccEmails?.map((item) => {
                return item.replace(/.*<([^>]*)>.*/, "$1") || item;
              })
            );
            setBCCDefault(
              data.data?.bccEmails?.map((item) => {
                return item.replace(/.*<([^>]*)>.*/, "$1") || item;
              })
            );
          } else {
            // message.error("Get ticket failed");
            show(t("messages:error.get_ticket"), { isError: true });
          }
        })
      );
  });
  const { run: updateTicketApi } = useJob((data: UpdateTicket) => {
    return TicketRepository()
      .update(data)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show(t("messages:success.update_ticket"));
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
            // message.error("Get data ticket failed");
            show(t("messages:error.get_tag"), { isError: true });
          }
        })
      );
  });
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
  const DetailTicketFormSchema = Yup.object().shape({
    to: Yup.string()
      .required("Email address is required")
      .email("The email address is not valid"),
    from: Yup.string()
      .required("Email address is required")
      // .email("The email address is not valid")
      .nullable(),
  });

  // useMount(() => {
  //   updateForm();
  // });
  useEffect(() => {
    if (id) {
      getTicketApi(id);
      fetchConversation(id);
      getListAgentApi({
        page: 1,
        limit: 500,
      });
      getListCustomerApi({
        page: 1,
        limit: 500,
      });
      fetchEmailIntegrationApi();
    }
  }, [id]);
  const disabled = useMemo(() => {
    if (formRef.current?.values.status === StatusTicket.RESOLVED) return true;
    return false;
  }, [formRef.current?.values.status]);

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
  const tagsOptions = useMemo(() => {
    return tags.map((item) => ({ value: item.name, label: item.name }));
  }, [tags]);
  const customersOptions = useMemo(() => {
    return customers.map((item) => ({
      label: `${item.firstName} ${item.lastName} - ${item.email}`,
      value: item.email,
    }));
  }, [customers]);

  const handleReopenTicket = () => {
    const values = formRef.current?.values;
    formRef.current?.setFieldValue("status", "OPEN");
    updateTicketApi({
      status: "OPEN",
      priority: values.priority,
      ids: [ticket?._id as string],
    });
  };
  const handleCloseTicket = () => {
    formRef.current?.setFieldValue("status", "RESOLVED");
    onFinish(formRef.current?.values, true);
  };
  const handleSaveTicket = () => {
    const values = formRef.current?.values;
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
    formRef.current?.setFieldValue("content", "");
  };
  const handleOpenDrawerSearch = () => {
    setVisible(true);
  };
  const handleCloseDrawerSearch = () => {
    setVisible(false);
  };
  const _renderButtonToggle = () => {
    return !visible ? (
      <CircleLeftMajor
        className={classNames(styles.toggleButton, styles.toggleButtonOpen)}
        onClick={handleOpenDrawerSearch}
      />
    ) : (
      <CircleRightMajor
        className={classNames(styles.toggleButton, styles.toggleButtonClose)}
        onClick={handleCloseDrawerSearch}
      />
    );
  };
  return (
    <>
      {processing ? (
        <Page fullWidth>
          <SkeletonPage primaryAction />
          <Layout>
            <Layout.Section>
              <LegacyCard sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="extraLarge" />
                  <SkeletonBodyText />
                </TextContainer>
              </LegacyCard>
              <LegacyCard sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="extraLarge" />
                  <SkeletonBodyText />
                </TextContainer>
              </LegacyCard>
            </Layout.Section>
          </Layout>
        </Page>
      ) : (
        <Page
          breadcrumbs={[
            { content: "Ticket", url: generatePath(TicketRoutePaths.Index) },
          ]}
          title={`Ticket ${ticket?.ticketId}: ${ticket?.subject}`}
          fullWidth
        >
          <Layout>
            <Layout.Section>
              <LegacyCard sectioned>
                <div ref={topPageRef} className={visible ? "d-flex" : ""}>
                  <div className={visible ? styles.wrapContent : ""}>
                    <div className={styles.wrapSearchToggle}>
                      {_renderButtonToggle()}
                    </div>
                    <Form
                      innerRef={formRef}
                      initialValues={initialValues}
                      enableReinitialize
                      validationSchema={DetailTicketFormSchema}
                      onSubmit={() => {}}
                    >
                      <FormLayout.Group condensed>
                        <div className="flex flex-col gap-3">
                          <FormItem name="status">
                            <Select
                              disabled={disabled}
                              label="Status"
                              options={statusOptions}
                            />
                          </FormItem>

                          <FormItem name="priority">
                            <Select
                              disabled={disabled}
                              label="Priority"
                              options={priorityOptions}
                            />
                          </FormItem>
                        </div>

                        <div className="flex flex-col gap-3">
                          <FormItem name="assignee">
                            <BoxSelectFilter
                              disabled={disabled}
                              label="Assignee"
                              data={agentsOptions}
                              placeholder="Search agents"
                            />
                          </FormItem>
                          <div>
                            <FormItem name="tags">
                              <SelectAddTag
                                disabled={disabled}
                                label="Tags"
                                data={tagsOptions}
                                placeholder="Add Tags"
                              />
                            </FormItem>
                          </div>
                        </div>
                      </FormLayout.Group>

                      <div className="flex justify-end mb-3 mt-3">
                        <Button
                          disabled={disabled}
                          primary
                          onClick={handleSaveTicket}
                        >
                          Save
                        </Button>
                      </div>
                      <Divider />

                      <div className="mt-5 mb-5">
                        {listChat.map((item: ChatItem) => (
                          <div key={item.id}>
                            <RowMessage item={item} />
                          </div>
                        ))}
                      </div>
                      <div className="w-full flex justify-between gap-4 flex-wrap">
                        <div className="flex flex-1 flex-col">
                          <div className="w-[400px]">
                            <FormItem name="from">
                              <BoxSelectFilter
                                label="From"
                                data={emailIntegrationOptions}
                                disabled={disabled}
                              />
                            </FormItem>
                          </div>
                          <div className="w-[400px] mt-5">
                            <FormItem name="to">
                              <TextField
                                label="To"
                                disabled
                                autoComplete="off"
                              />
                            </FormItem>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col">
                          {enableCC ? (
                            <div className="min-w-[300px] max-w-[400px]">
                              <FormItem name="CC">
                                <SelectAddEmail
                                  defaultTag={ccDefault}
                                  disabled={disabled}
                                  label="CC"
                                  data={customersOptions}
                                />
                              </FormItem>
                            </div>
                          ) : (
                            <></>
                          )}
                          {enableCC ? (
                            <div className="min-w-[300px] max-w-[400px] mt-5">
                              <FormItem name="BCC">
                                <SelectAddEmail
                                  defaultTag={bccDefault}
                                  disabled={disabled}
                                  label="BCC"
                                  data={customersOptions}
                                />
                              </FormItem>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <span
                        className="link mt-5 mb-5 inline-block hover:underline hover:cursor-pointer hover:text-blue-500"
                        onClick={() => {
                          setEnableCC(!enableCC);
                        }}
                      >
                        CC/BCC
                      </span>
                      <div>
                        <FormItem name="content">
                          <TextEditorTicket
                            files={files}
                            setFiles={setFiles}
                            formRef={formRef}
                            disabled={
                              formRef.current?.values.status ===
                              StatusTicket.RESOLVED
                            }
                            setIsChanged={setIsChanged}
                            setLoadingButton={setLoadingButton}
                            labelProps={{
                              as: "span",
                              variant: "bodyMd",
                              children: "Content",
                            }}
                            init={{
                              height: 400,
                              placeholder:
                                "Please input your message here......",
                            }}
                          />
                        </FormItem>
                      </div>
                      <div ref={endPageRef} className="flex justify-end mt-5">
                        {formRef.current?.values.status ===
                        StatusTicket.RESOLVED ? (
                          <>
                            <Button
                              icon={
                                <div className="flex">
                                  <span className="mr-2 ">
                                    <BackIcon fontSize={14} />
                                  </span>
                                  <span>Reopen</span>
                                </div>
                              }
                              onClick={handleReopenTicket}
                              disabled={false}
                            ></Button>
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Button
                              primary
                              icon={
                                <div className="flex justify-center items-center">
                                  <span className="mr-2">
                                    <FaMailReply fontSize={14} />
                                  </span>
                                  <span>Reply</span>
                                </div>
                              }
                              onClick={() => {
                                onFinish(formRef.current?.values);
                              }}
                              disabled={!isChanged || loadingButton}
                            ></Button>
                            <Button
                              disabled={!isChanged || loadingButton}
                              onClick={handleCloseTicket}
                            >
                              Reply & Close Ticket
                            </Button>
                          </div>
                        )}
                      </div>
                    </Form>
                  </div>
                  <div className={visible ? styles.wrapSearch : "d-none"}>
                    <ContentShopifySearch />
                  </div>
                </div>
              </LegacyCard>
            </Layout.Section>
          </Layout>
          <div className="flex justify-end  sticky bottom-10 right-10  ">
            <Button
              primary
              icon={
                <div className="flex ">
                  <span className="">
                    {isEndPage ? (
                      <UpIcon fontSize={14} />
                    ) : (
                      <DownIcon fontSize={14} />
                    )}
                  </span>
                </div>
              }
              // onClick={handleReopenTicket}
              onClick={() => {
                if (!isEndPage) {
                  endPageRef.current.scrollIntoView({ behavior: "smooth" });
                  setIsEndPage(true);
                } else {
                  topPageRef.current.scrollIntoView({ behavior: "smooth" });
                  setIsEndPage(false);
                }
              }}
              disabled={false}
            ></Button>
          </div>
        </Page>
      )}
    </>
  );
};

export default DetailTicket;

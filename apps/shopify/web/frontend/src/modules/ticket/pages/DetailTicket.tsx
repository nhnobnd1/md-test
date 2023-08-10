import {
  createdDatetimeFormat,
  MediaScreen,
  useJob,
  useNavigate,
  useParams,
  useToggle,
  useUnMount,
} from "@moose-desk/core";
import {
  AttachFile,
  Conversation,
  CreateReplyTicketRequest,
  Priority,
  priorityOptions,
  ScreenType,
  statusOptions,
  StatusTicket,
  TicketRepository,
  UpdateTicket,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  FormLayout,
  Icon,
  Layout,
  LegacyCard,
  Link,
  Modal,
  Page,
  Select,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  TextContainer,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import { CancelMajor, PriceLookupMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import { FormikProps } from "formik";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import SelectAddEmail from "src/components/SelectAddEmail/SelectAddEmail";
import { TextEditorTicket } from "src/components/TextEditorTicket";
import useGlobalData from "src/hooks/useGlobalData";
import useScreenType from "src/hooks/useScreenType";
import { useSubdomain } from "src/hooks/useSubdomain";
import useToggleGlobal from "src/hooks/useToggleGlobal";
import { CollapseList } from "src/modules/ticket/components/CollapseList";
import ContentShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ContentShopifySearch";
import useSelectFrom from "src/modules/ticket/store/useSelectFrom";
import { trimHtmlCssJs, wrapImageWithAnchorTag } from "src/utils/localValue";
import * as Yup from "yup";
import FaMailReply from "~icons/fa/mail-reply";
import InfoIcon from "~icons/material-symbols/info";

import { Crisp } from "crisp-sdk-web";
import useDeepEffect from "src/hooks/useDeepEffect";
import useFormCreateTicket from "src/modules/ticket/store/useFormCreateTicket";
import ForwardIcon from "~icons/ion/forward";
import ReplyIcon from "~icons/ion/reply";
import BackIcon from "~icons/mingcute/back-2-fill";

import { uniqBy } from "lodash-es";
import BoxSelectAssignee from "src/components/Modal/ModalFilter/BoxSelectAssignee";
import BoxSelectCustomer from "src/modules/ticket/components/BoxSelectCustomer/BoxSelectCustomer";
import { TagSelect } from "src/modules/ticket/components/TicketForm/TagSelect";
import {
  emailIntegrationApi,
  getListConversation,
  getListCustomerApi,
  getListEmailIntegration,
  getOneTicket,
} from "src/modules/ticket/helper/api";
import { UploadForward } from "src/modules/ticket/pages/UploadForward";
import useForwardTicket from "src/modules/ticket/store/useForwardTicket";
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
  datetime?: string;
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
  to?: string;
}

const DetailTicket = () => {
  const formRef = useRef<FormikProps<any>>(null);
  const queryClient = useQueryClient();
  const { id } = useParams();
  const {
    data: dataTicket,
    isLoading: processing,
    refetch,
  } = useQuery({
    queryKey: ["getTicket", id],
    queryFn: () => getOneTicket(id as string),
    retry: 1,

    onError: () => {
      navigate("/dashboard");
      show(t("messages:error.get_ticket"), { isError: true });

      // message.error(t("messages:error.get_ticket"));
    },
  });
  // const [ticket, setTicket] = useState<Ticket>();
  const ticket = useMemo(() => {
    if (dataTicket)
      return {
        ...dataTicket,
      };
    return undefined;
  }, [dataTicket]);
  const { show } = useToast();
  const { t } = useTranslation();
  const endPageRef = useRef<any>(null);
  const navigate = useNavigate();
  const {
    data: dataConversations,
    isLoading: isLoadingConversation,
    isFetching: isFetchConversation,
    refetch: refetchConversation,
  } = useQuery({
    queryKey: ["getListConversation", id],
    queryFn: () => getListConversation(id as string),
    retry: 1,
    onSuccess: (data) => {
      setConversationList(data);
    },

    onError: () => {
      // message.error(t("messages:error.get_ticket"));
    },
  });

  const [conversationList, setConversationList] = useState<Conversation[]>(
    dataConversations || []
  );
  // const [conversationList, setConversationList] = useState<Conversation[]>([]);

  const [enableCC, setEnableCC] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const { data: dataPrimaryEmail } = useQuery({
    queryKey: ["emailIntegrationApi", id],
    queryFn: () => emailIntegrationApi(),
    retry: 3,
    staleTime: 10000,
    onError: () => {},
    enabled: !!(dataTicket?.createdViaWidget || dataTicket?.incoming),
  });
  const primaryEmail = useMemo(() => {
    if (dataPrimaryEmail?._id) {
      return dataPrimaryEmail;
    }
    if (!dataPrimaryEmail) {
      return undefined;
    }
  }, [dataPrimaryEmail]);
  // const [primaryEmail, setPrimaryEmail] = useState<EmailIntegration>();
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const { data: dataEmailIntegration } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500, isLive: 1 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {},
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

  const {
    state: statusModal,
    on: openStatusModal,
    off: closeStatusModal,
  } = useToggle();
  const [screenType, screenWidth] = useScreenType();
  const isMobileOrTablet = Boolean(screenWidth <= MediaScreen.LG);
  const selectedFrom = useSelectFrom((state) => state.selected);
  // detail ticket
  const contentCreate = useFormCreateTicket((state) => state.content);
  const updateContent = useFormCreateTicket((state) => state.updateState);

  const { data: dataCustomers } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: () => getListCustomerApi({ page: 1, limit: 500 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      show(t("messages:error.get_customer"), { isError: true });
    },
  });
  const { visible, setVisible } = useToggleGlobal();
  const { state: send, on: openSend, off: closeSend } = useToggle();
  const [isForward, setIsForward] = useState(false);

  const chatItemForward = useForwardTicket((state) => state.chatItem);
  const clickForward = useForwardTicket((state) => state.clickForward);
  const updateChatItem = useForwardTicket((state) => state.updateChatItem);
  const [fileForward, setFileForward] = useState<any>([]);

  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");
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
          datetime: createdDatetimeFormat(item.createdDatetime, timezone),
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
        datetime: createdDatetimeFormat(ticket.createdDatetime, timezone),
      });
    }
    return conversationMapping;
  }, [ticket, conversationList, timezone]);

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

  const { run: updateTicketApi } = useJob(
    (data: UpdateTicket, reload = false) => {
      return TicketRepository()
        .update(data)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show(t("messages:success.update_ticket"));
              queryClient.invalidateQueries("getStatisticTicket");

              // eslint-disable-next-line no-unused-expressions
              reload ? refetch() : "";
            }
          }),
          catchError((err) => {
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const initialValues = useMemo(() => {
    const condition = ticket?.incoming || ticket?.createdViaWidget;

    const from = ticket?.senderConfigId
      ? ticket.senderConfigId
      : primaryEmail?._id;

    const fromValidate = emailIntegrationOptions?.find(
      (item: any) => item.value === from
    );
    if (conversationList.length === 0) {
      return {
        status: ticket?.status,
        assignee: ticket?.agentObjectId
          ? `${ticket?.agentObjectId},${ticket?.agentEmail}`
          : null,

        priority: ticket?.priority,
        to: condition ? ticket.fromEmail.email : ticket?.toEmails[0].email,
        tags: ticket?.tags,
        content: "",
        from: from,
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
        assignee: ticket?.agentObjectId
          ? `${ticket?.agentObjectId},${ticket?.agentEmail}`
          : null,

        priority: ticket?.priority,
        to: condition ? ticket.fromEmail.email : ticket?.toEmails[0].email,
        tags: ticket?.tags,
        content: "",
        from: from,
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
  }, [ticket, primaryEmail, conversationList, emailIntegrationOptions]);
  const DetailTicketFormSchema = useMemo(() => {
    if (enableCC) {
      return Yup.object().shape({
        to: Yup.string()
          .required("Email address is required")
          .email("The email address is not valid")
          .test(
            "test",
            "The recipient's email must not be the same as the sender's email",
            (value, context) => {
              const findFromEmail = emailIntegrationOptions.find(
                (item: any) => item.value === context.parent.from
              )?.obj?.supportEmail;

              return value !== findFromEmail;
            }
          ),
        from: Yup.string().required("Email address is required").nullable(),
        CC: Yup.array()
          .test(
            "same from",
            "The recipient's email must not be the same as the sender's email",
            (value, context) => {
              const findFromEmail = emailIntegrationOptions.find(
                (item: any) => item.value === context.parent.from
              )?.obj?.supportEmail;
              if (value?.includes(findFromEmail)) {
                return false;
              }
              return true;
            }
          )
          .test(
            "same to",
            "The CC's email must not be the same as the to email",
            (value, context) => {
              if (value?.includes(context.parent.to)) {
                return false;
              }
              return true;
            }
          ),
        BCC: Yup.array()
          .test(
            "same from",
            "The recipient's email must not be the same as the sender's email",
            (value, context) => {
              const findFromEmail = emailIntegrationOptions.find(
                (item: any) => item.value === context.parent.from
              )?.obj?.supportEmail;
              if (value?.includes(findFromEmail)) {
                return false;
              }
              return true;
            }
          )
          .test(
            "same to",
            "The BCC's email must not be the same as the to email",
            (value, context) => {
              if (value?.includes(context.parent.to)) {
                return false;
              }
              return true;
            }
          ),
      });
    }
    return Yup.object().shape({
      to: Yup.string()
        .required("Email address is required")
        .email("The email address is not valid")
        .test(
          "test",
          "The recipient's email must not be the same as the sender's email",
          (value, context) => {
            const findFromEmail = emailIntegrationOptions.find(
              (item: any) => item.value === context.parent.from
            )?.obj?.supportEmail;

            return value !== findFromEmail;
          }
        ),
      from: Yup.string()
        .required("Email address is required")
        // .email("The email address is not valid")
        .nullable(),
    });
  }, [enableCC, emailIntegrationOptions]);

  useEffect(() => {
    if (id) {
      // getTicketApi(id);
      // fetchConversation(id);
    }
  }, [id]);
  const disabled = useMemo(() => {
    if (formRef.current?.values.status === StatusTicket.RESOLVED) return true;
    return false;
  }, [formRef.current?.values.status]);

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
  const handleSaveTicket = (reload = false) => {
    const values = formRef.current?.values;
    updateTicketApi(
      {
        priority: values.priority,
        status: values.status,
        tags: values.tags,
        agentObjectId: values.assignee
          ? values.assignee.split(",")[0]
          : undefined,
        agentEmail: values.assignee ? values.assignee.split(",")[1] : undefined,
        ids: [ticket?._id as string],
      },
      reload
    );
  };
  const onFinish = (values: ValueForm, closeTicket = false) => {
    if (isSampleEmail) {
      Crisp.chat.open();
      Crisp.message.send(
        "text",
        trimHtmlCssJs(formRef.current?.values?.content)
      );
    }
    closeSend();
    setIsForward(false);
    if (isForward) {
      updateContent({ content: undefined });
      formRef.current?.resetForm();
    }
    const findItemConfigEmail = emailIntegrationOptions.find(
      (item: any) => item.value === values.from
    );

    const dataPost: any = {
      closedTicket: closeTicket,
      id: ticket?._id,
      attachmentIds: [...files, ...fileForward],

      bccEmails: enableCC ? values.BCC : [],
      description: wrapImageWithAnchorTag(values.content),
      ccEmails: enableCC ? values.CC : [],
      fromEmail: {
        name: findItemConfigEmail?.obj.name,
        email: findItemConfigEmail?.obj.supportEmail,
      },
      senderConfigId: values.from,

      toEmails: isForward
        ? [
            {
              name: "",
              email: values.to,
            },
          ]
        : [
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

    updateTicketApi(
      {
        priority: values.priority,
        status: closeTicket ? StatusTicket.RESOLVED : values.status,
        tags: values.tags,
        agentObjectId: values.assignee
          ? values.assignee.split(",")[0]
          : undefined,
        agentEmail: values.assignee ? values.assignee.split(",")[1] : undefined,
        ids: [ticket?._id as string],
      },
      true
    );
    setFiles([]);
    setFileForward([]);

    formRef.current?.setFieldValue("content", "");
  };

  const handleToggleSearch = () => {
    setVisible(!visible);
  };
  const handleChangeForm = useCallback((changedValue) => {
    if (changedValue.content) {
      const contentSplit = changedValue.content.split('<div class="divide">');
      updateContent({ content: contentSplit[0] });
    } else {
      updateContent({ content: undefined });
    }
  }, []);

  const handleOpenReply = () => {
    setFiles([]);
    setFileForward([]);
    openSend();
    setIsForward(false);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  };

  const handleClickForwardAll = () => {
    setIsForward(true);
    updateChatItem(undefined);
    setFileForward([
      ...new Set(
        listChat
          .map((item) => item.attachments)
          .flat()
          .map((item) => item?._id)
      ),
    ]);
    formRef.current?.setFieldValue(
      "content",
      `
          <br/>
        <div class='md_forward'>
        <h3>Forwarded Conversation</h3>
        <h4>Subject: ${ticket?.subject}</h4>
        <span>--------------------</span>
        <br/>
        <br/>
        
        ${listChat
          .map(
            (item) =>
              `<div>
                <div class='md_attr' style='color:#888'>
                From: <strong>${item.name}</strong> (${item.email})
                <br/>
                Date: ${item.datetime}
                <br/>
                  To: ${item.toEmail}
                </div>
                <br/>
                <br/>
                <div>${item.chat}</div>
              </div>`
          )
          .join("<br/> --------------------")}
        
        </div>
        `
    );
    openSend();
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  };

  useUnMount(() => {
    setVisible(false);
    updateContent({ content: undefined });
    updateChatItem(undefined);
  });
  useDeepEffect(() => {
    if (chatItemForward) {
      setIsForward(true);
      setFileForward([
        ...new Set(chatItemForward?.attachments?.map((item) => item?._id)),
      ]);

      formRef.current?.setFieldValue(
        "content",
        `
      <br/>
      <br/>
      <div class='md_forward'>
         <h3>---- Forwarded message ----</h3>
         <div>
            <div class='md_attr' style='color:#888'>
            From: <strong>${chatItemForward.name}</strong> (${chatItemForward.email})
            <br/>
            Date: ${chatItemForward.time}
            <br/>
              To: ${chatItemForward.toEmail}
            </div>
            <br/>
            <br/>
            <div>${chatItemForward.chat}</div>
          </div>
        </div>
      `
      );

      openSend();
    }
  }, [chatItemForward, clickForward]);

  const isSampleEmail = useMemo(() => {
    if (ticket?.meta?.isSample && dataConversations?.length === 0) {
      return true;
    }
    return false;
  }, [ticket, dataConversations, processing, isLoadingConversation]);

  useDeepEffect(() => {
    if (isSampleEmail && !processing && !isLoadingConversation) {
      setTimeout(() => {
        openSend();
        formRef.current?.setFieldValue(
          "content",
          `
      Let's fill out the reply here! You might want to include those things:
          <br/> <br/>
- A great greeting <br/>
- An attached image <br/>
- Try bold, italic here and there 
           <br/> <br/>
Hit Send to see what your message will look like
      `
        );
      }, 1000);
    }
  }, [isSampleEmail, processing, isFetchConversation]);

  useDeepEffect(() => {
    if (isForward) return;
    const signature = emailIntegrationOptions.find(
      (item: any) => item.value === selectedFrom
    )?.obj.signature;
    formRef?.current?.setFieldValue(
      "content",
      signature
        ? `${
            contentCreate || "<br/>"
          }<div class='divide'> - - - - - - - </div><div class='signature'>${signature}</div>`
        : contentCreate
    );
  }, [selectedFrom, emailIntegrationOptions, isForward, send]);

  return (
    <div className="relative">
      {processing || isFetchConversation ? (
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
      ) : isMobileOrTablet && visible ? (
        <ContentShopifySearch />
      ) : (
        <Page
          title={
            (
              <span className="truncate w-full  inline-block header-detail-ticket">{`Ticket ${ticket?.ticketId}: ${ticket?.subject}`}</span>
            ) as unknown as string
          }
          fullWidth
        >
          <div className={styles.fixedICon}>
            <div className="xs:flex flex-col gap-4 md:hidden">
              <Button
                onClick={handleClickForwardAll}
                icon={<ForwardIcon style={{ fontSize: 18 }} />}
              ></Button>
              <Button
                onClick={handleOpenReply}
                icon={<FaMailReply style={{ fontSize: 16 }} />}
              ></Button>
              {disabled ? null : (
                <Button
                  onClick={openStatusModal}
                  icon={<InfoIcon style={{ fontSize: 16 }} />}
                ></Button>
              )}
              <Button
                onClick={handleToggleSearch}
                icon={PriceLookupMinor}
              ></Button>
            </div>
          </div>
          <Layout>
            <Layout.Section>
              <div className={visible ? "d-flex gap-5" : ""}>
                <LegacyCard sectioned>
                  <div className={""}>
                    <div
                      className={classNames(
                        styles.wrapSearchToggle,
                        `${screenType === ScreenType.SM && "hidden"} flex gap-2`
                      )}
                    >
                      <Tooltip content="Forward all" preferredPosition="above">
                        <Button
                          onClick={handleClickForwardAll}
                          icon={<ForwardIcon style={{ fontSize: 18 }} />}
                        ></Button>
                      </Tooltip>
                      <Tooltip content="Search shopify">
                        <Button
                          icon={PriceLookupMinor}
                          onClick={handleToggleSearch}
                        />
                      </Tooltip>
                    </div>
                    <Form
                      innerRef={formRef}
                      initialValues={initialValues}
                      enableReinitialize
                      validationSchema={DetailTicketFormSchema}
                      onSubmit={() => {}}
                      onValuesChange={handleChangeForm}
                    >
                      <div className="flex flex-wrap  md:flex-row-reverse xs:flex-col justify-between overflow-auto">
                        <div
                          className={classNames(
                            styles.borderLeft,
                            "xs:hidden md:block"
                          )}
                        >
                          <div className="flex flex-col gap-3 w-[280px] px-2">
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
                            <FormItem name="assignee">
                              <BoxSelectAssignee
                                disabled={disabled}
                                label="Assignee"
                                placeholder="Search agents"
                              />
                            </FormItem>
                            <FormItem name="tags">
                              <TagSelect disabled={disabled} />
                            </FormItem>
                          </div>

                          <div className="flex justify-end mb-3 mt-3">
                            <Button
                              disabled={disabled}
                              primary
                              onClick={handleSaveTicket}
                              // fullWidth
                            >
                              Save
                            </Button>
                          </div>
                        </div>

                        <div className="flex-1 px-4">
                          <CollapseList listChat={listChat} />

                          {formRef.current?.values?.status ===
                          StatusTicket.RESOLVED ? (
                            <Button
                              icon={<BackIcon fontSize={14} />}
                              onClick={handleReopenTicket}
                              disabled={false}
                            >
                              Reopen
                            </Button>
                          ) : (
                            <div
                              className={`flex gap-2 mb-4 ${
                                send ? "hidden" : ""
                              }`}
                            >
                              <Button
                                icon={<ReplyIcon fontSize={14} />}
                                onClick={handleOpenReply}
                              >
                                Reply
                              </Button>
                              {/* <Button
                                icon={<ForwardIcon fontSize={14} />}
                                onClick={handleClickForwardAll}
                              >
                                Forward all
                              </Button> */}
                            </div>
                          )}
                          <div className={send ? "" : "hidden"}>
                            <LegacyCard sectioned>
                              <div className="mb-5 flex justify-end">
                                <Tooltip
                                  content="Close"
                                  preferredPosition="above"
                                >
                                  <Button
                                    onClick={() => {
                                      closeSend();
                                      setIsForward(false);
                                      updateContent({ content: undefined });
                                      formRef.current?.setFieldValue(
                                        "content",
                                        ""
                                      );
                                    }}
                                    size="large"
                                    plain
                                    icon={
                                      <Icon source={CancelMajor} color="base" />
                                    }
                                  />
                                </Tooltip>
                              </div>
                              <div className="w-full flex justify-between gap-2 flex-wrap ">
                                <div className="flex  flex-col flex-1 ">
                                  <div className="md:w-[400px] xs:w-[300px]">
                                    <FormItem name="from">
                                      <BoxSelectFilter
                                        label="From"
                                        data={emailIntegrationOptions}
                                        disabled={disabled}
                                      />
                                    </FormItem>
                                  </div>
                                  <div className="md:w-[400px] xs:w-[300px] mt-5 mb-5">
                                    <FormItem name="to">
                                      {isForward ? (
                                        <BoxSelectCustomer
                                          form={formRef}
                                          label={
                                            <div className="flex justify-between md:w-[400px] xs:w-[300px] ">
                                              <span>To</span>
                                              <Link
                                                onClick={() => {
                                                  setEnableCC(!enableCC);
                                                }}
                                              >
                                                CC/BCC
                                              </Link>
                                            </div>
                                          }
                                          placeholder="Email"
                                          data={customersOptions}
                                        />
                                      ) : (
                                        <TextField
                                          label={
                                            <div className="flex justify-between md:w-[400px] xs:w-[300px] ">
                                              <span>To</span>
                                              <span
                                                className="link  inline-block hover:underline hover:cursor-pointer text-blue-500"
                                                onClick={() => {
                                                  setEnableCC(!enableCC);
                                                }}
                                              >
                                                CC/BCC
                                              </span>
                                            </div>
                                          }
                                          disabled
                                          autoComplete="off"
                                        />
                                      )}
                                    </FormItem>
                                  </div>
                                </div>
                                <div className="flex  flex-col flex-1">
                                  {enableCC ? (
                                    <div
                                      className={`min-w-[300px] max-w-[400px] md:w-[400px] xs:w-[300px] `}
                                    >
                                      <FormItem name="CC">
                                        <SelectAddEmail
                                          defaultTag={initialValues.CC}
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
                                    <div
                                      className={`min-w-[300px] max-w-[400px] md:w-[400px] xs:w-[300px] mt-5 mb-5 min-h-[60px]`}
                                    >
                                      <FormItem name="BCC">
                                        <SelectAddEmail
                                          defaultTag={initialValues.BCC}
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
                                  init={{
                                    menubar: false,
                                    placeholder:
                                      "Please input your message here......",
                                  }}
                                />
                              </FormItem>

                              {isForward ? (
                                <div
                                  key={
                                    chatItemForward ? chatItemForward.id : "all"
                                  }
                                  className="mt-5"
                                >
                                  <UploadForward
                                    defaultFileList={uniqBy(
                                      chatItemForward
                                        ? chatItemForward?.attachments?.map(
                                            (item) => ({
                                              uid: item?._id as string,
                                              name: item?.name as string,

                                              url: item?.attachmentUrl as string,
                                            })
                                          )
                                        : listChat
                                            .map((item) => item.attachments)
                                            .flat()
                                            .map((item) => ({
                                              uid: item?._id as string,
                                              name: item?.name as string,

                                              url: item?.attachmentUrl as string,
                                            })),
                                      "uid"
                                    )}
                                    setFileForward={setFileForward}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                              <div className="flex justify-end mt-5">
                                {formRef.current?.values.status ===
                                StatusTicket.RESOLVED ? (
                                  <>
                                    <Button
                                      icon={<BackIcon fontSize={14} />}
                                      onClick={handleReopenTicket}
                                      disabled={false}
                                    >
                                      Reopen
                                    </Button>
                                  </>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <Button
                                      disabled={!isChanged || loadingButton}
                                      onClick={() => {
                                        if (formRef.current?.isValid) {
                                          handleCloseTicket();
                                        }
                                      }}
                                    >
                                      Send & Close Ticket
                                    </Button>
                                    <Button
                                      primary
                                      onClick={() => {
                                        if (!formRef.current?.isValid) {
                                          return;
                                        }
                                        onFinish(formRef.current?.values);
                                      }}
                                      disabled={!isChanged || loadingButton}
                                    >
                                      Send
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </LegacyCard>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </div>
                </LegacyCard>
                <div className={visible ? styles.wrapSearch : "d-none"}>
                  <ContentShopifySearch />
                </div>
              </div>
              <Modal
                open={statusModal}
                onClose={closeStatusModal}
                title=""
                primaryAction={{
                  content: "Save",
                  onAction: () => {
                    handleSaveTicket(true);
                  },
                }}
                secondaryActions={[
                  {
                    content: "Cancel",
                    onAction: () => {
                      closeStatusModal();
                    },
                  },
                ]}
              >
                <Modal.Section>
                  <TextContainer>
                    <Form
                      initialValues={initialValues}
                      ref={formRef}
                      enableReinitialize
                      onSubmit={() => {}}
                    >
                      <FormLayout>
                        <FormItem name="status">
                          <Select label="Status" options={statusOptions} />
                        </FormItem>

                        <FormItem name="priority">
                          <Select label="Priority" options={priorityOptions} />
                        </FormItem>
                        <FormItem name="assignee">
                          <BoxSelectAssignee
                            label="Assignee"
                            placeholder="Search agents"
                          />
                        </FormItem>
                        <FormItem name="tags">
                          <TagSelect />
                        </FormItem>
                      </FormLayout>
                    </Form>
                  </TextContainer>
                </Modal.Section>
              </Modal>
            </Layout.Section>
          </Layout>
        </Page>
      )}
      <div ref={endPageRef}></div>
    </div>
  );
};

export default DetailTicket;

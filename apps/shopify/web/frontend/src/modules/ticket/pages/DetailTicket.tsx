import {
  createdDatetimeFormat,
  createdDatetimeFormatDefault,
  emailRegex,
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
  ScreenType,
  StatusTicket,
  TicketRepository,
  UpdateTicket,
  priorityOptions,
  statusOptions,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  FormLayout,
  Modal,
  Page,
  Select,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import classNames from "classnames";
import { FormikProps } from "formik";
import { useCallback, useMemo, useRef, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import DownIcon from "~icons/material-symbols/arrow-downward";

import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import SelectAddEmail from "src/components/SelectAddEmail/SelectAddEmail";
import { TextEditorTicket } from "src/components/TextEditorTicket";
import useGlobalData from "src/hooks/useGlobalData";
import useScreenType from "src/hooks/useScreenType";
import { useSubdomain } from "src/hooks/useSubdomain";
import { CollapseList } from "src/modules/ticket/components/CollapseList";
import useSelectFrom from "src/modules/ticket/store/useSelectFrom";
import { trimHtmlCssJs, wrapImageWithAnchorTag } from "src/utils/localValue";
import * as Yup from "yup";

import { Crisp } from "crisp-sdk-web";
import useDeepEffect from "src/hooks/useDeepEffect";
import useFormCreateTicket from "src/modules/ticket/store/useFormCreateTicket";
import ForwardIcon from "~icons/ion/forward";
import BackIcon from "~icons/mingcute/back-2-fill";

import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { uniqBy } from "lodash-es";
import BoxSelectAssignee from "src/components/Modal/ModalFilter/BoxSelectAssignee";
import BoxSelectCustomer from "src/modules/ticket/components/BoxSelectCustomer/BoxSelectCustomer";
import { TagSelect } from "src/modules/ticket/components/TicketForm/TagSelect";
import {
  emailIntegrationApi,
  getCustomerTicket,
  getListConversation,
  getListCustomerApi,
  getListEmailIntegration,
  getOneTicket,
} from "src/modules/ticket/helper/api";
import { UploadForward } from "src/modules/ticket/pages/UploadForward";
import useForwardTicket from "src/modules/ticket/store/useForwardTicket";
import useRating from "src/store/useRating";
import styles from "./style.module.scss";
import "./style.scss";
export interface ChatItem {
  id: string;
  name: string;
  chat: string;
  time: string;
  email: string;
  attachments?: AttachFile[];
  typeChat?: "email" | "widget";
  toEmail?: string;
  incoming?: boolean;
  nameTo?: string;
  ccEmails?: [];
  bccEmails?: [];
  datetime?: string;
  right?: boolean;
  avatar?: string;
  customerId?: string;
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
    },
  });
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
  const ratingState = useRating((state) => state);

  const {
    data: dataConversations,
    isLoading: isLoadingConversation,
    isFetching: isFetchConversation,
  } = useQuery({
    queryKey: ["getListConversation", id],
    queryFn: () => getListConversation(id as string),
    retry: 1,
    onSuccess: (data) => {
      setConversationList(data);
      setEndOfPage(true);
      setTimeout(() => {
        endOfPageRef?.current?.scrollIntoView({});
      }, 0);
    },

    onError: () => {},
  });

  const { data: customer } = useQuery({
    queryKey: ["getCustomer", { id: ticket?.customerObjectId }],
    queryFn: () => getCustomerTicket(ticket?.customerObjectId),
    retry: 3,
    staleTime: 10000,
    enabled: !!ticket?.customerObjectId,
    onError: () => {},
  });
  const [conversationList, setConversationList] = useState<Conversation[]>(
    dataConversations || []
  );
  const [endOfPage, setEndOfPage] = useState(false);
  const endOfPageRef = useRef<any>(null);

  const handleContainerOnBottom = useCallback(() => {
    setEndOfPage(true);
  }, []);
  const containerRef = useBottomScrollListener(handleContainerOnBottom, {});

  const [enableCC, setEnableCC] = useState(false);
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
  const selectedFrom = useSelectFrom((state) => state.selected);
  // detail ticket
  const contentCreate = useFormCreateTicket((state) => state.content);
  const updateContent = useFormCreateTicket((state) => state.updateState);
  const [searchCustomer, setSearchCustomer] = useState<string>("");
  const debounceCustomer: string = useDebounce(searchCustomer, 200);
  const { data: dataCustomers, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ["getCustomers", { page: 1, limit: 10, query: debounceCustomer }],
    queryFn: () =>
      getListCustomerApi({ page: 1, limit: 10, query: debounceCustomer }),
    retry: 3,
    // staleTime: 10000,
    onError: () => {
      show(t("messages:error.get_customer"), { isError: true });
    },
  });
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
          time: `${createdDatetimeFormat(item.createdDatetime, timezone)}`,

          chat: item.description,
          email: item.fromEmail?.email,
          attachments: item.attachments,
          toEmail: item.toEmails[0].email,
          nameTo: item.toEmails[0]?.name,
          incoming: item?.incoming,
          ccEmails: item?.ccEmails,
          bccEmails: item?.bccEmails,
          datetime: createdDatetimeFormatDefault(
            item.createdDatetime,
            timezone
          ),
          right: !!item?.senderConfigId,
          avatar: item?.senderConfigId ? "" : customer?.avatar,
          customerId: item?.senderConfigId ? "" : customer?._id,
        };
      }
    );
    if (ticket) {
      let typeChat;
      if (ticket?.createdViaWidget) {
        typeChat = "widget";
      } else {
        typeChat = "email";
      }
      conversationMapping?.unshift({
        id: ticket._id,
        name: ticket?.fromEmail.name,
        time: `${createdDatetimeFormat(ticket.createdDatetime, timezone)}`,

        chat: ticket.description,
        email: ticket.fromEmail.email,
        attachments: ticket.attachments,
        typeChat,
        toEmail: ticket.toEmails ? ticket.toEmails[0].email : "",
        nameTo: ticket.toEmails ? ticket.toEmails[0].name : "",
        incoming: ticket?.incoming || ticket?.createdViaWidget,
        ccEmails: ticket?.ccEmails,
        bccEmails: ticket?.bccEmails,
        datetime: createdDatetimeFormatDefault(
          ticket.createdDatetime,
          timezone
        ),
        right: !!ticket?.senderConfigId,
        avatar: ticket?.senderConfigId ? "" : customer?.avatar,
        customerId: ticket?.senderConfigId ? "" : customer?._id,
      });
    }
    return conversationMapping;
  }, [ticket, conversationList, timezone, customer]);

  const { run: postReplyApi } = useJob((payload: CreateReplyTicketRequest) => {
    return TicketRepository()
      .postReply(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show(t("messages:success.send_mail"));
            setConversationList([...conversationList, data.data]);
            queryClient.setQueryData(
              ["getListConversation", id],
              [...conversationList, data.data]
            );
          }
        }),
        catchError((err) => {
          show(t("messages:error.something_went_wrong"), { isError: true });
          return of(err);
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
              ratingState.changeFetchStatistic(false);
              queryClient.invalidateQueries("getStatisticTicket");
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
        from: fromValidate ? from : "",
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
        from: fromValidate ? from : "",
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
        assignee: Yup.string()
          .test("is-blank", "The assignee does not exist", (value: any) => {
            if (!value) {
              return true;
            }
            if (value?.includes(",") && emailRegex.test(value.split(",")[1])) {
              return true;
            }
            return false;
          })
          .nullable(),
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
      assignee: Yup.string()
        .test("is-blank", "The assignee does not exist", (value: any) => {
          if (!value) {
            return true;
          }
          if (value?.includes(",") && emailRegex.test(value.split(",")[1])) {
            return true;
          }
          return false;
        })
        .nullable(),
      from: Yup.string()
        .required("Email address is required")
        // .email("The email address is not valid")
        .nullable(),
    });
  }, [enableCC, emailIntegrationOptions]);

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
    if (!formRef.current?.isValid) {
      return;
    }
    const values = formRef.current?.values;
    updateTicketApi({
      priority: values.priority,
      status: values.status,
      tags: values.tags,
      agentObjectId: values.assignee ? values.assignee.split(",")[0] : "",
      agentEmail: values.assignee ? values.assignee.split(",")[1] : "",
      ids: [ticket?._id as string],
    });
  };
  const onFinish = (values: ValueForm, closeTicket = false) => {
    if (isSampleEmail) {
      Crisp.chat.open();
      Crisp.message.send(
        "text",
        trimHtmlCssJs(formRef.current?.values?.content)
      );
    }
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

  const handleChangeForm = useCallback((changedValue) => {
    if (changedValue.content) {
      const contentSplit = changedValue.content.split("- - - - - - -");
      updateContent({ content: contentSplit[0] });
    } else {
      updateContent({ content: undefined });
    }
  }, []);

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
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  };

  useUnMount(() => {
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
  }, [selectedFrom, emailIntegrationOptions, isForward]);

  return (
    <div className="relative h-full">
      <Page
        title={
          !processing
            ? ((
                <span className="truncate w-full  inline-block header-detail-ticket">{`Ticket ${ticket?.ticketId}: ${ticket?.subject}`}</span>
              ) as unknown as string)
            : ((<SkeletonDisplayText size="small" />) as unknown as string)
        }
        breadcrumbs={[
          {
            content: "Ticket",
            onAction: () => {
              navigate(-1);
            },
          },
        ]}
        fullWidth
      >
        <div className="form-ticket">
          <div className="flex h-full bg-white p-4 rounded-lg overflow-auto">
            <div
              className={classNames(
                styles.wrapSearchToggle,
                `${screenType === ScreenType.SM && "mt-[-5px]"} flex gap-2`
              )}
            >
              <Tooltip content="Forward all" preferredPosition="above">
                <Button
                  onClick={handleClickForwardAll}
                  icon={<ForwardIcon style={{ fontSize: 18 }} />}
                ></Button>
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
              <div className="flex flex-wrap  md:flex-row-reverse xs:flex-col justify-between  h-full">
                <div
                  className={classNames(
                    styles.borderLeft,
                    "xs:hidden md:block h-full w-[320px]"
                  )}
                >
                  {!isFetchConversation ? (
                    <div className="flex flex-col gap-3  px-2">
                      <FormItem name="status">
                        <BoxSelectFilter
                          disabled={disabled}
                          data={statusOptions}
                          label="Status"
                        />
                      </FormItem>

                      <FormItem name="priority">
                        <BoxSelectFilter
                          disabled={disabled}
                          data={priorityOptions}
                          label="Priority"
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
                  ) : (
                    <SkeletonBodyText lines={4} />
                  )}

                  <div className="flex justify-end mb-3 mt-3">
                    <Button
                      disabled={disabled}
                      primary
                      onClick={handleSaveTicket}
                      fullWidth
                    >
                      Save
                    </Button>
                  </div>
                </div>

                <div className="flex-1 px-4 overflow-auto h-full flex gap-2 flex-col justify-between py-1 ">
                  <div
                    onScroll={() => {
                      setEndOfPage(false);
                    }}
                    ref={containerRef as any}
                    className="overflow-y-auto  px-1"
                  >
                    {!isFetchConversation ? (
                      <>
                        <CollapseList listChat={listChat} />
                        <div
                          style={{ margin: "auto" }}
                          className="sticky  bottom-0 right-0 h-[40px]   w-[300px] flex justify-center items-center "
                        >
                          <div
                            className={`${
                              endOfPage ? "opacity-0 pointer-events-none" : ""
                            } w-[36px] h-[36px] rounded-3xl flex justify-center items-center  hover:cursor-pointer  overflow-hidden`}
                          >
                            <Button
                              disabled={false}
                              onClick={() => {
                                setEndOfPage(true);
                                endOfPageRef?.current?.scrollIntoView({
                                  behavior: "smooth",
                                });
                              }}
                              icon={<DownIcon />}
                              primary
                            ></Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <SkeletonBodyText lines={10} />
                    )}
                    <div ref={endOfPageRef}></div>
                  </div>
                  <div className="md-ticket-detail-editor relative">
                    <div className="w-full flex justify-between  flex-wrap flex-col">
                      <div className="flex  flex-col flex-1 ">
                        <div className="flex items-start px-2 gap-2 md-add-border">
                          <span className="w-[40px] mt-2">From</span>

                          <div className="flex-1 md-remove-border">
                            <FormItem name="from">
                              <BoxSelectFilter
                                data={emailIntegrationOptions}
                                disabled={disabled}
                              />
                            </FormItem>
                          </div>
                        </div>
                        <div className="flex items-start px-2 gap-2 md-add-border">
                          <span className="w-[40px] mt-2 ">To</span>
                          <div className="flex-1 md-remove-border">
                            <FormItem name="to">
                              {isForward ? (
                                <BoxSelectCustomer
                                  form={formRef}
                                  placeholder="Email"
                                  data={customersOptions}
                                  onSearch={(e) => {
                                    setSearchCustomer(e);
                                  }}
                                  loading={isLoadingCustomer}
                                />
                              ) : (
                                <TextField
                                  label=""
                                  disabled
                                  autoComplete="off"
                                />
                              )}
                            </FormItem>
                          </div>
                          <span
                            className="link mt-2"
                            onClick={() => {
                              setEnableCC(!enableCC);
                            }}
                          >
                            CC/BCC
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        {enableCC ? (
                          <div className="flex items-start px-2 gap-2 md-add-border min-h-[37px]">
                            <span className="w-[40px] mt-2 ">CC</span>
                            <div className={`flex-1 md-remove-border`}>
                              <FormItem name="CC">
                                <SelectAddEmail
                                  defaultTag={initialValues.CC}
                                  disabled={disabled}
                                  data={customersOptions}
                                  onSearch={(e) => {
                                    setSearchCustomer(e);
                                  }}
                                  loading={isLoadingCustomer}
                                />
                              </FormItem>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {enableCC ? (
                          <div className="flex items-start px-2 gap-2 md-add-border min-h-[37px]">
                            <span className="w-[40px] mt-2 ">BCC</span>
                            <div className={`flex-1 md-remove-border`}>
                              <FormItem name="BCC">
                                <SelectAddEmail
                                  defaultTag={initialValues.BCC}
                                  disabled={disabled}
                                  data={customersOptions}
                                  onSearch={(e) => {
                                    setSearchCustomer(e);
                                  }}
                                  loading={isLoadingCustomer}
                                />
                              </FormItem>
                            </div>
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
                          height: 100,

                          menubar: false,
                          placeholder: "Please input your message here......",
                          plugins: "autoresize",
                          max_height: 400,
                        }}
                        listFileAttach={
                          isForward ? (
                            <div
                              key={chatItemForward ? chatItemForward.id : "all"}
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
                          ) : null
                        }
                      />
                    </FormItem>

                    <div className="flex justify-end absolute right-2 bottom-[5px]">
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
                  </div>
                </div>
              </div>
            </Form>
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
      </Page>
      <div ref={endPageRef}></div>
    </div>
  );
};

export default DetailTicket;

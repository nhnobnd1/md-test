import {
  createdDatetimeFormat,
  createdDatetimeFormatDefault,
  emailRegex,
  useJob,
  useLoading,
  useNavigate,
  useParams,
  useToggle,
  useUnMount,
} from "@moose-desk/core";
import {
  Agent,
  AttachFile,
  Conversation,
  CreateReplyTicketRequest,
  Customer,
  Priority,
  StatusTicket,
  TicketRepository,
  UpdateTicket,
  priorityOptions,
  statusOptions,
} from "@moose-desk/repo";
import { Button, Card, Select, Tooltip, Upload } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Crisp } from "crisp-sdk-web";
import { uniqBy } from "lodash-es";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "react-query";
import { catchError, map, of } from "rxjs";
import { MDModalUI } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";
import TextEditorTicketBeta from "src/components/UI/Editor/TextEditorTicketBeta";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
// import Select from "src/components/UI/Select/Select";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useDeepEffect from "src/hooks/useDeepEffect";
import useMessage from "src/hooks/useMessage";
import { useSubdomain } from "src/hooks/useSubdomain";
import { CollapseMessageBeta } from "src/modules/ticket/components/DetailTicketForm/CollapseMessageBeta";
import ResultShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ResultShopifySearch";
import { AgentSelect } from "src/modules/ticket/components/TicketForm/AgentSelect";
import { AutoSelect } from "src/modules/ticket/components/TicketForm/AutoSelect";
import { SelectList } from "src/modules/ticket/components/TicketForm/SelectList";
import { SelectTag } from "src/modules/ticket/components/TicketForm/SelectTag";
import { TagSelect } from "src/modules/ticket/components/TicketForm/TagSelect";
import {
  emailIntegrationApi,
  getCustomerTicket,
  getListConversation,
  getListCustomerApi,
  getListEmailIntegration,
  getOneTicket,
} from "src/modules/ticket/helper/api";
import useFormCreateTicket from "src/modules/ticket/store/useFormCreateTicket";
import useForwardTicket from "src/modules/ticket/store/useForwardTicket";
import { trimHtmlCssJs, wrapImageWithAnchorTag } from "src/utils/localValue";
import ForwardIcon from "~icons/ion/forward";
import DownIcon from "~icons/material-symbols/arrow-downward";
import BackIcon from "~icons/mingcute/back-2-fill";

import "./BoxReplyBeta.scss";
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

export interface ChatItem {
  id: string;
  name: string;
  nameTo: string;
  chat: string;
  time: string;
  email: string;
  attachments?: AttachFile[];
  typeChat?: "email" | "widget";
  toEmail?: string;
  incoming?: boolean;
  ccEmails?: [];
  bccEmails?: [];
  datetime?: string;
  right?: boolean;
  avatar?: string;
  customerId?: string;
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

const DetailTicketFormBeta = () => {
  const message = useMessage();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const { state: send, on: openSend, off: closeSend } = useToggle(false);
  const [isForward, setIsForward] = useState(false);
  const [enableCC, setEnableCC] = useState(false);
  const [toEmail, setToEmail] = useState("");

  const { data: dataTicket, isLoading: processing } = useQuery({
    queryKey: ["getTicket", id],
    queryFn: () => getOneTicket(id as string),
    retry: 1,

    onError: () => {
      navigate("/dashboard");

      message.error(t("messages:error.get_ticket"));
    },
  });
  const ticket = useMemo(() => {
    if (dataTicket)
      return {
        ...dataTicket,
      };
    return undefined;
  }, [dataTicket]);
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

    onError: () => {
      message.error(t("messages:error.get_ticket"));
    },
  });
  const [form] = Form.useForm();
  const [conversationList, setConversationList] = useState<Conversation[]>(
    dataConversations || []
  );

  const [endOfPage, setEndOfPage] = useState(false);
  const endOfPageRef = useRef<any>(null);

  const handleContainerOnBottom = useCallback(() => {
    setEndOfPage(true);
  }, []);

  const containerRef = useBottomScrollListener(handleContainerOnBottom, {});
  const contentCreate = useFormCreateTicket((state) => state.content);
  const chatItemForward = useForwardTicket((state) => state.chatItem);
  const clickForward = useForwardTicket((state) => state.clickForward);
  const updateChatItem = useForwardTicket((state) => state.updateChatItem);
  const [agentSelected, setAgentSelected] = useState<Agent | undefined>();
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
  const [fileForward, setFileForward] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const { t } = useTranslation();
  const {
    state: statusModal,
    on: openStatusModal,
    off: closeStatusModal,
  } = useToggle();

  const { startLoading, stopLoading } = useLoading();

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

  const { subDomain } = useSubdomain();
  const updateContent = useFormCreateTicket((state) => state.updateState);

  const { timezone } = useGlobalData(false, subDomain || "");
  const { data: customer } = useQuery({
    queryKey: ["getCustomer", { id: ticket?.customerObjectId }],
    queryFn: () => getCustomerTicket(ticket?.customerObjectId),
    retry: 3,
    staleTime: 10000,
    enabled: !!ticket?.customerObjectId,
    onError: () => {
      message.error(t("messages:error.get_customer"));
    },
  });
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
  const [searchCustomer, setSearchCustomer] = useState<string>("");
  const debounceCustomer: string = useDebounce(searchCustomer, 200);

  const { data: dataCustomers, isFetching: isFetchingCustomer } = useQuery({
    queryKey: ["getCustomers", { page: 1, limit: 10, query: debounceCustomer }],
    queryFn: () =>
      getListCustomerApi({ page: 1, limit: 10, query: debounceCustomer }),
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

  const getCustomerId = useCallback(() => {
    const email = toEmail || form.getFieldValue("to");
    if (!email) return "";
    const customerSelected: Customer | undefined = dataCustomers?.find(
      (customer: Customer) => customer.email === email
    );
    return customerSelected?._id || "";
  }, [toEmail, form.getFieldValue("to"), dataCustomers]);

  const initialValues = useMemo(() => {
    const condition = ticket?.incoming || ticket?.createdViaWidget;

    const from = ticket?.senderConfigId
      ? ticket.senderConfigId
      : primaryEmail?._id;

    const fromValidate = dataEmailIntegration?.find(
      (item) => item._id === from
    );

    if (conversationList.length === 0) {
      return {
        status: ticket?.status,
        assignee: ticket?.agentObjectId ? `- ${ticket?.agentEmail}` : null,
        priority: ticket?.priority,
        to: condition ? ticket.fromEmail.email : ticket?.toEmails[0].email,
        tags: ticket?.tags,
        content: fromValidate?.signature
          ? `<br/> <div class='divide'> - - - - - - - </div><div class='signature'>${fromValidate?.signature}</div>`
          : "",
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
        assignee: ticket?.agentObjectId ? `- ${ticket?.agentEmail}` : null,
        priority: ticket?.priority,
        to: condition ? ticket.fromEmail.email : ticket?.toEmails[0].email,
        tags: ticket?.tags,
        content: fromValidate?.signature
          ? `<br/> <div class='divide'> - - - - - - - </div><div class='signature'>${fromValidate?.signature}</div>`
          : "",
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
  }, [ticket, primaryEmail, conversationList, dataEmailIntegration]);
  const { run: postReplyApi } = useJob((payload: CreateReplyTicketRequest) => {
    return TicketRepository()
      .postReply(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            message.success(t("messages:success.send_mail"));
            stopLoading();
            setConversationList([...conversationList, data.data]);
            queryClient.setQueryData(
              ["getListConversation", id],
              [...conversationList, data.data]
            );
          }
        }),
        catchError((err) => {
          message.error(t("messages:error.something_went_wrong"));

          stopLoading();

          return of(err);
        })
      );
  });

  const { run: updateTicketApi } = useJob((data: UpdateTicket) => {
    return TicketRepository()
      .update(data)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            stopLoading();
            message.success(t("messages:success.update_ticket"));
            queryClient.invalidateQueries("getStatisticTicket");
            queryClient.invalidateQueries(["getTicket", id]);
          }
        }),
        catchError((err) => {
          message.error(t("messages:error.something_went_wrong"));

          stopLoading();

          return of(err);
        })
      );
  });
  const handleChangeForm = useCallback((changedValue) => {
    if (changedValue.status) return;
    if (changedValue.to) {
      setToEmail(changedValue.to);
    }
    if (changedValue.content) {
      const contentSplit = changedValue.content.split("- - - - - - -");
      updateContent({ content: contentSplit[0] });
    } else {
      updateContent({ content: "" });
    }
  }, []);

  const onFinish = (values: ValueForm, closeTicket = false) => {
    if (isSampleEmail) {
      Crisp.chat.open();
      Crisp.message.send("text", trimHtmlCssJs(form.getFieldValue("content")));
    }
    startLoading();
    setIsForward(false);
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

    // updateTicketApi({
    //   priority: values.priority,
    //   status: values.status,
    //   tags: values.tags,
    //   agentObjectId: agentSelected ? agentSelected?._id : "",
    //   agentEmail: agentSelected ? agentSelected?.email : "",
    //   ids: [ticket?._id as string],
    // });
    setFiles([]);
    setFileForward([]);
    form.setFieldValue("content", "");
  };
  const handleCloseTicket = async () => {
    try {
      startLoading();
      const test = await form.validateFields();
      if (test) {
        form.setFieldValue("status", "RESOLVED");
        queryClient.setQueryData(["getTicket", id], (oldData: any) => ({
          ...oldData,
          status: "RESOLVED",
        }));

        onFinish(form.getFieldsValue(), true);
      }
    } catch (e) {
      message.error(t("messages:error.something_went_wrong"));
      stopLoading();
    }
  };
  const handleReopenTicket = () => {
    startLoading();

    const values = form.getFieldsValue();
    form.setFieldValue("status", "OPEN");

    queryClient.setQueryData(["getTicket", id], (oldData: any) => ({
      ...oldData,
      status: "OPEN",
    }));

    updateTicketApi({
      status: "OPEN",
      priority: values.priority,
      ids: [ticket?._id as string],
    });
  };

  const handleSaveTicket = async () => {
    try {
      const values = form.getFieldsValue();
      const validate = await form.validateFields();
      startLoading();
      updateTicketApi({
        priority: values.priority,
        status: values.status,
        tags: values.tags,
        agentObjectId: agentSelected ? agentSelected?._id : "",
        agentEmail: agentSelected ? agentSelected?.email : "",
        ids: [ticket?._id as string],
      });
    } catch (e) {
      console.log({ e });
    }
  };

  const onChangeEmailIntegration = (value: string, options: any) => {
    form.validateFields();
    if (isForward) return;
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
  };

  useDeepEffect(() => {
    if (!enableCC) {
      form.setFieldValue("CC", []);
      form.setFieldValue("BCC", []);
    }
  }, [enableCC]);
  useEffect(() => {
    if (chatItemForward) {
      setIsForward(true);
      setFileForward([
        ...new Set(chatItemForward?.attachments?.map((item) => item?._id)),
      ]);
      form.setFieldValue(
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
            Date: ${chatItemForward.datetime}
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

  const disabled = useMemo(() => {
    if (ticket?.status === StatusTicket.RESOLVED) return true;
    return false;
  }, [ticket?.status]);

  const isSampleEmail = useMemo(() => {
    if (ticket?.meta?.isSample && dataConversations?.length === 0) {
      return true;
    }
    return false;
  }, [ticket, dataConversations, processing, isLoadingConversation]);

  useDeepEffect(() => {
    if (isSampleEmail && !processing && !isLoadingConversation) {
      setTimeout(() => {
        form.setFieldValue(
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
  }, [isSampleEmail, processing, isLoadingConversation]);
  useUnMount(() => {
    updateChatItem(undefined);
  });
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
    form.setFieldValue(
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
  };

  return (
    <>
      <div className="wrapContainer">
        <Header back className="mb-2">
          <div className="flex justify-between w-full items-center gap-2">
            {processing ? (
              <div className="">
                <MDSkeleton lines={1} />
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full ">
                <h1 className="break-words overflow-hidden header-detail-ticket">
                  {` Ticket ${ticket?.ticketId}: ${ticket?.subject}`}
                </h1>
                <div className="flex justify-end items-center ">
                  <Tooltip title="Forward all">
                    <MDButton
                      onClick={handleClickForwardAll}
                      icon={<ForwardIcon style={{ fontSize: 18 }} />}
                      className="flex gap-2 items-center"
                    ></MDButton>
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </Header>
        <Form
          colon={false}
          disabled={disabled || loadingButton}
          form={form}
          layout="horizontal"
          initialValues={initialValues}
          enableLoadForm
          enableReinitialize
          onFinish={onFinish}
          onValuesChange={handleChangeForm}
          className="flex form-ticket-detail"
        >
          <div
            className="flex-1 h-full w-full  "
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0px",
            }}
          >
            <div
              ref={containerRef as any}
              onScroll={() => {
                setEndOfPage(false);
              }}
              className=" h-full  overflow-auto box-chat bg-white p-4"
            >
              <div className="relative ">
                {!isFetchConversation ? (
                  <>
                    <CollapseMessageBeta listChat={listChat} />
                    <div
                      style={{ margin: "auto" }}
                      className="sticky  bottom-0 right-0 h-[40px]   w-[300px] flex justify-center items-center "
                    >
                      <Button
                        disabled={false}
                        className={`${
                          endOfPage ? "opacity-0 pointer-events-none" : ""
                        }`}
                        onClick={() => {
                          setEndOfPage(true);
                          endOfPageRef?.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                        icon={<DownIcon />}
                        shape="circle"
                        type="primary"
                      ></Button>
                    </div>
                  </>
                ) : (
                  <>
                    <MDSkeleton lines={100} />
                  </>
                )}
                <div ref={endOfPageRef}></div>
              </div>
            </div>
            {ticket ? (
              <div
                className={`w-full flex flex-col justify-between relative mt-2`}
              >
                <div className={`box-comment`}>
                  <div className="md-from-detail w-full flex items-center gap-2 px-3 ">
                    <span className="w-[40px]">From</span>
                    <Form.Item
                      className="m-0 w-full"
                      name="from"
                      labelAlign="left"
                      rules={[
                        {
                          required: true,
                          message: "From address is required",
                        },
                      ]}
                    >
                      <SelectList
                        showSearch
                        bordered={false}
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
                    <span className="w-[40px]">To</span>
                    <Form.Item
                      className="m-0 w-full"
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
                        disabled={!isForward}
                        placeholder="Email"
                        options={customersOptions}
                        onSearch={(value) => {
                          setSearchCustomer(value);
                        }}
                      />
                    </Form.Item>
                    <span
                      className="link  inline-block"
                      onClick={() => {
                        setEnableCC(!enableCC);
                      }}
                    >
                      CC/BCC
                    </span>
                  </div>
                  {enableCC ? (
                    <div className="md-cc-detail w-full flex items-center gap-2 px-3">
                      <span className="w-[40px]">CC</span>
                      <Form.Item
                        className="m-0 w-full"
                        name="CC"
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                validateCCEmail(
                                  value,
                                  emailIntegrationOptions.find(
                                    (item) =>
                                      item.value === getFieldValue("from")
                                  )?.obj.supportEmail,
                                  getFieldValue("to")
                                ) === true
                              ) {
                                return Promise.resolve();
                              } else if (
                                validateCCEmail(
                                  value,
                                  emailIntegrationOptions.find(
                                    (item) =>
                                      item.value === getFieldValue("from")
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
                                    (item) =>
                                      item.value === getFieldValue("from")
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
                  {enableCC ? (
                    <div className="md-bcc-detail w-full flex items-center px-3 gap-2">
                      <span className="w-[40px]">BCC</span>
                      <Form.Item
                        name="BCC"
                        className="m-0 w-full"
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                validateCCEmail(
                                  value,
                                  emailIntegrationOptions.find(
                                    (item) =>
                                      item.value === getFieldValue("from")
                                  )?.obj.supportEmail,
                                  getFieldValue("to")
                                ) === true
                              ) {
                                return Promise.resolve();
                              } else if (
                                validateCCEmail(
                                  value,
                                  emailIntegrationOptions.find(
                                    (item) =>
                                      item.value === getFieldValue("from")
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
                                    (item) =>
                                      item.value === getFieldValue("from")
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
                  <Form.Item className="mb-0" name="content">
                    <TextEditorTicketBeta
                      form={form}
                      files={files}
                      disabled={disabled}
                      setFiles={setFiles}
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
                          <Upload
                            key={chatItemForward ? chatItemForward.id : "all"}
                            defaultFileList={uniqBy(
                              chatItemForward
                                ? chatItemForward?.attachments?.map((item) => ({
                                    uid: item?._id as string,
                                    name: item?.name as string,
                                    status: "done",
                                    url: item?.attachmentUrl as string,
                                  }))
                                : listChat
                                    .map((item) => item.attachments)
                                    .flat()
                                    .map((item) => ({
                                      uid: item?._id as string,
                                      name: item?.name as string,
                                      status: "done",
                                      url: item?.attachmentUrl as string,
                                    })),
                              "uid"
                            )}
                            onChange={({ file, fileList }) => {
                              setFileForward(fileList.map((item) => item?.uid));
                            }}
                          />
                        ) : (
                          <></>
                        )
                      }
                    />
                  </Form.Item>
                </div>
                <div className={`flex justify-end absolute right-5 bottom-2`}>
                  {disabled ? (
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
                    <div className="flex items-center gap-2 justify-end w-full">
                      <div className="flex items-center gap-2">
                        <MDButton
                          disabled={!isChanged || loadingButton}
                          onClick={handleCloseTicket}
                        >
                          Send & Close Ticket
                        </MDButton>
                        <MDButton
                          type="primary"
                          htmlType="submit"
                          disabled={!isChanged || loadingButton}
                        >
                          Send
                        </MDButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <Card
            className="max-w-[350px] xs:hidden lg:block h-full scroll-y"
            bodyStyle={{
              padding: 16,
            }}
            style={{
              flexBasis: 350,
              flexShrink: 0,
              borderColor: "#d9d9d9",
              borderLeftWidth: 0,
              borderRadius: 0,
            }}
            loading={processing}
          >
            <div className="">
              <Form.Item
                labelAlign="left"
                label={<span style={{ width: 60 }}>Status</span>}
                name="status"
              >
                <Select
                  size="middle"
                  className="w-full"
                  options={statusOptions}
                />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label={<span style={{ width: 60 }}>Assignee</span>}
                name="assignee"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.resolve();
                      }
                      if (
                        value?.includes("-") &&
                        emailRegex.test(value.split("-")[1]?.trim())
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The assignee does not exist")
                      );
                    },
                  }),
                ]}
              >
                <AgentSelect
                  size="middle"
                  placeholder="Search agents"
                  className="w-full"
                  setAgentSelected={setAgentSelected}
                />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label={<span style={{ width: 60 }}>Priority</span>}
                name="priority"
              >
                <Select className="w-full" options={priorityOptions} />
              </Form.Item>

              <Form.Item
                name="tags"
                label={<span style={{ width: 60 }}>Tags</span>}
                labelAlign="left"
              >
                <TagSelect size="middle" />
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
            <div>
              <ResultShopifySearch
                email={toEmail || form.getFieldValue("to")}
                id={getCustomerId()}
              />
            </div>
            {/* <Divider /> */}
          </Card>
          <MDModalUI
            // title="Properties"
            open={statusModal}
            onCancel={() => {
              closeStatusModal();
            }}
            centered
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
                label={<span style={{ width: 60 }}>Status</span>}
                name="status"
              >
                <Select className="w-full" options={statusOptions} />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label={<span style={{ width: 60 }}>Priority</span>}
                name="priority"
              >
                <Select className="w-full" options={priorityOptions} />
              </Form.Item>
              <Form.Item label="Assignee" name="assignee">
                <AgentSelect
                  size="middle"
                  placeholder="Search agents"
                  className="w-full"
                  setAgentSelected={setAgentSelected}
                />
              </Form.Item>

              <Form.Item
                name="tags"
                label={<span style={{ width: 60 }}>Tags</span>}
                labelAlign="left"
              >
                <TagSelect size="middle" />
              </Form.Item>
            </Form>
          </MDModalUI>
        </Form>
      </div>
    </>
  );
};

export default DetailTicketFormBeta;

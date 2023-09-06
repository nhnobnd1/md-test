import {
  emailRegex,
  generatePath,
  useJob,
  useNavigate,
  useToggle,
} from "@moose-desk/core";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import {
  AgentRepository,
  Customer,
  EmailIntegration,
  TicketRepository,
  priorityOptions,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, Divider, Select, TextField } from "@shopify/polaris";
import { uniqBy } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { catchError, map, of } from "rxjs";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectAssignee from "src/components/Modal/ModalFilter/BoxSelectAssignee";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import { LoadMoreValue } from "src/components/Select";
import SelectAddEmail from "src/components/SelectAddEmail/SelectAddEmail";
import { TextEditorTicket } from "src/components/TextEditorTicket";
import useDeepEffect from "src/hooks/useDeepEffect";
import { CustomModal } from "src/modules/customers/component/Modal";
import BoxSelectCustomer from "src/modules/ticket/components/BoxSelectCustomer/BoxSelectCustomer";
import { TagSelect } from "src/modules/ticket/components/TicketForm/TagSelect";
import {
  getListCustomerApi,
  getListEmailIntegration,
} from "src/modules/ticket/helper/api";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import useFormCreateTicket from "src/modules/ticket/store/useFormCreateTicket";
import useSelectFrom from "src/modules/ticket/store/useSelectFrom";
import { wrapImageWithAnchorTag } from "src/utils/localValue";
import * as Yup from "yup";
import "./style.scss";

interface TicketFormProps extends Partial<FormProps> {
  primaryEmail: EmailIntegration | undefined;
}

export const TicketForm = ({ ...props }: TicketFormProps) => {
  const [enableCC, setEnableCC] = useState(false);
  const navigate = useNavigate();
  const { show } = useToast();
  const { t } = useTranslation();
  const { state: visible, on: openPopup, off: closePopup } = useToggle();

  const [toEmail, setToEmail] = useState("");
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const selectedFrom = useSelectFrom((state) => state.selected);
  const contentCreate = useFormCreateTicket((state) => state.content);
  const updateContent = useFormCreateTicket((state) => state.updateState);
  const [dataCustomersFetch, setDataCustomerFetch] = useState<Customer[]>([]);
  const [searchCustomer, setSearchCustomer] = useState<string>("");
  const debounceCustomer: string = useDebounce(searchCustomer, 200);
  const { data: dataEmailIntegration } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500, isLive: 1 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      show(t("messages:error.get_customer"), { isError: true });
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
  const TicketFormSchema = useMemo(() => {
    if (enableCC)
      return Yup.object().shape({
        to: Yup.string()
          .required("Email address is required")
          .email("The email address is not valid")
          .test(
            "test",
            "The recipient's email must not be the same as the sender's email",
            (value, context) => {
              const findFromEmail = emailIntegrationOptions.find(
                (item) => item.value === context.parent.from
              )?.obj?.supportEmail;

              return value !== findFromEmail;
            }
          ),

        content: Yup.string()
          .required("Please input your message!")
          .test("is-blank", "Content is required", (value) => {
            if (value && value.trim().length === 0) {
              return false;
            }
            return true;
          }),
        subject: Yup.string()
          .required("Subject is required")
          .test("is-blank", "Subject is required", (value) => {
            if (value && value.trim().length === 0) {
              return false;
            }
            return true;
          }),
        assignee: Yup.string().test(
          "is-blank",
          "The assignee does not exist",
          (value: any) => {
            if (!value) {
              return true;
            }
            if (value?.includes(",") && emailRegex.test(value.split(",")[1])) {
              return true;
            }
            return false;
          }
        ),
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
    return Yup.object().shape({
      to: Yup.string()
        .required("Email address is required")
        .email("The email address is not valid")
        .test(
          "test",
          "The recipient's email must not be the same as the sender's email",
          (value, context) => {
            const findFromEmail = emailIntegrationOptions.find(
              (item) => item.value === context.parent.from
            )?.obj?.supportEmail;

            return value !== findFromEmail;
          }
        ),
      assignee: Yup.string().test(
        "is-blank",
        "The assignee does not exist",
        (value: any) => {
          if (!value) {
            return true;
          }
          if (value?.includes(",") && emailRegex.test(value.split(",")[1])) {
            return true;
          }
          return false;
        }
      ),

      content: Yup.string()
        .required("Please input your message!")
        .test("is-blank", "Content is required", (value) => {
          if (value && value.trim().length === 0) {
            return false;
          }
          return true;
        }),
      subject: Yup.string()
        .required("Subject is required")
        .test("is-blank", "Subject is required", (value) => {
          if (value && value.trim().length === 0) {
            return false;
          }
          return true;
        }),
    });
  }, [enableCC, emailIntegrationOptions]);

  const fetchAgents = useCallback(
    (params: LoadMoreValue) => {
      const limit = 10;

      return AgentRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
          isLive: 1,
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

  const { run: CreateTicket } = useJob((dataSubmit: any) => {
    return TicketRepository()
      .create(dataSubmit)
      .pipe(
        map(({ data }) => {
          // message.loading.hide();
          if (data.statusCode === 200) {
            // notification.success("Ticket has been created successfully.");
            // navigate()
            show(t("messages:success.create_ticket"));

            navigate(
              generatePath(TicketRoutePaths.Detail, { id: data.data._id })
            );
          } else {
            show(t("messages:error.create_ticket"), { isError: true });
          }
        }),
        catchError((err) => {
          show(t("messages:error.something_went_wrong"), { isError: true });
          return of(err);
        })
      );
  });

  const { data: dataCustomers, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ["getCustomers", { page: 1, limit: 10, query: debounceCustomer }],
    queryFn: () =>
      getListCustomerApi({ page: 1, limit: 10, query: debounceCustomer }),
    retry: 3,
    // staleTime: 10000,
    onSuccess: (data) => {
      setDataCustomerFetch(uniqBy([...data, ...dataCustomersFetch], "_id"));
    },
    onError: () => {
      show(t("messages:error.get_customer"), { isError: true });
    },
  });
  const customersOptions = useMemo(() => {
    if (!dataCustomers) return [];
    return dataCustomers.map((item) => {
      return {
        label: `${item?.firstName} ${item?.lastName} - ${item.email}`,
        value: item.email,
        obj: item,
      };
    });
  }, [dataCustomers]);

  const onFinish = () => {
    const values = (props.innerRef as any)?.current.values;
    const assigneeId = values.assignee
      ? values.assignee.split(",")[0]
      : undefined;
    const assigneeEmail = values.assignee
      ? values.assignee.split(",")[1]
      : undefined;
    console.log({ assigneeId, assigneeEmail });
    const findEmailIntegration = emailIntegrationOptions.find(
      (item) => item.value === values.from
    );
    const findCustomer = dataCustomersFetch.find(
      (item) => item.email === values.to
    );
    const dataCreate: any = {
      fromEmail: {
        email: findEmailIntegration?.obj.supportEmail,
        name: findEmailIntegration?.obj.name,
      },
      senderConfigId: values.from,
      agentObjectId: assigneeId,
      agentEmail: assigneeEmail,
      toEmails: [
        {
          email: values.to,
          name: findCustomer
            ? `${findCustomer.firstName} ${findCustomer.lastName}`
            : values.to.split("@")[0],
        },
      ],
      customerObjectId: findCustomer ? findCustomer._id : undefined,
      ccEmails: enableCC ? values?.CC : [],
      bccEmails: enableCC ? values?.BCC : [],
      subject: values.subject,
      description: wrapImageWithAnchorTag(values.content),
      status: "OPEN",
      priority: values.priority,
      tags: values.tags,
      attachmentIds: files,
    };
    CreateTicket(dataCreate);
  };
  const handleClosePopup = () => {
    closePopup();
  };

  const handleChangeForm = useCallback((changedValue) => {
    if (changedValue?.to) {
      setToEmail(changedValue?.to);
    }
    if (changedValue.content) {
      const contentSplit = changedValue.content.split("- - - - - - -");
      updateContent({ content: contentSplit[0] });
    } else {
      updateContent({ content: undefined });
    }
  }, []);
  const css = `
  .Polaris-Label{
    width: 100%;
  }
  `;

  useDeepEffect(() => {
    const signature = emailIntegrationOptions.find(
      (item) => item.value === selectedFrom
    )?.obj.signature;

    (props?.innerRef as any)?.current.setFieldValue(
      "content",
      signature
        ? `${
            contentCreate || "<br/>"
          }<div class='divide'> - - - - - - - </div><div class='signature'>${signature}</div>`
        : contentCreate
    );
  }, [selectedFrom, emailIntegrationOptions]);
  useEffect(() => {
    return () => {
      updateContent({ content: undefined });
    };
  }, []);
  const onKeyDown = useCallback((keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }, []);
  return (
    <Form
      {...props}
      initialValues={props.initialValues}
      validationSchema={TicketFormSchema}
      formDefaultProps={{
        onKeyDown: onKeyDown,
      }}
      onSubmit={(e) => {
        onFinish();
      }}
      onValuesChange={handleChangeForm}
    >
      <style scoped>{css}</style>
      <div className="flex h-full">
        <div className="w-full flex-1 pr-4 pl-1 flex flex-col h-full min-w-[350px] justify-between py-1 overflow-y-auto">

          <div className="mb-3 mt-1">
            <FormItem name="subject">
              <TextField label="" autoComplete="off" placeholder="Subject" />
            </FormItem>
          </div>
          <div className=" flex justify-end flex-col">
            <div className="flex items-start px-2 gap-2 md-add-border">
              <span className="w-[40px] mt-2">From</span>
              <div className="flex-1 md-remove-border">
                <FormItem name="from">
                  <BoxSelectFilter
                    // disabled={disabled}
                    data={emailIntegrationOptions}
                    placeholder="Defined Email address"
                  />
                </FormItem>
              </div>
            </div>
            <div className="flex items-start px-2 gap-2 md-add-border">
              <span className="w-[40px] mt-2 ">To</span>
              <div className="flex-1 md-remove-border">
                <FormItem name="to">
                  <BoxSelectCustomer
                    openPopup={openPopup}
                    form={props.innerRef}
                    data={customersOptions}
                    placeholder="Email"
                    onSearch={(e) => {
                      setSearchCustomer(e);
                    }}
                    loading={isLoadingCustomer}
                  />
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
            {enableCC ? (
              <div className="flex items-start px-2 gap-2 md-add-border min-h-[37px]">
                <span className="w-[40px] mt-2 ">CC</span>
                <div className="flex-1 md-remove-border">
                  <FormItem name="CC">
                    <SelectAddEmail
                      placeholder="Email"
                      data={customersOptions}
                      defaultTag={[]}
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
                <div className="flex-1 md-remove-border">
                  <FormItem name="BCC">
                    <SelectAddEmail
                      placeholder="Email"
                      data={customersOptions}
                      defaultTag={[]}
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
            <div className="w-full ">
              <FormItem name="content">
                <TextEditorTicket
                  files={files}
                  setFiles={setFiles}
                  formRef={props.innerRef}
                  setLoadingButton={setLoadingButton}
                  labelProps={{
                    as: "span",
                    variant: "bodyMd",
                    children: "Content",
                  }}
                  init={{
                    placeholder: "Please input your message here......",
                  }}
                />
              </FormItem>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <Button
                onClick={() => {
                  navigate(TicketRoutePaths.Index);
                }}
              >
                Cancel
              </Button>
              <Button primary loading={loadingButton} submit>
                Send
              </Button>
            </div>
          </div>
        </div>
        <div className="w-[350px] overflow-auto pl-4 h-full md-border-left">
          <div className="">
            <FormItem name="tags">
              <TagSelect />
            </FormItem>
          </div>
          <div className="mt-4">
            <FormItem name="assignee">
              <BoxSelectAssignee label="Assignee" placeholder="Search agents" />
            </FormItem>
          </div>

          <div className="mt-4">
            <FormItem name="priority">
              <Select label="Priority" options={priorityOptions} />
            </FormItem>
          </div>
          <div className="my-4">
            <Divider />
          </div>
        </div>
      </div>
      <CustomModal
        title={"New Customer"}
        visible={visible}
        onClose={handleClosePopup}
        customerData={{ email: toEmail }}
        primaryButtonLabel="Save"
        secondaryButtonAction={handleClosePopup}
        secondaryButtonLabel="Discard"
        querySearchCustomer={null}
      />
    </Form>
  );
};

export default TicketForm;

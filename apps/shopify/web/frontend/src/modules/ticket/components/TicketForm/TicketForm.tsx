import { generatePath, useJob, useNavigate, useToggle } from "@moose-desk/core";
import {
  AgentRepository,
  EmailIntegration,
  Priority,
  TicketRepository,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, FormLayout, Link, Select, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { catchError, map, of } from "rxjs";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import { Select as ComboSelect, LoadMoreValue } from "src/components/Select";
import SelectAddEmail from "src/components/SelectAddEmail/SelectAddEmail";
import SelectAddTag from "src/components/SelectAddTag/SelectAddTag";
import { TextEditorTicket } from "src/components/TextEditorTicket";
import useDeepEffect from "src/hooks/useDeepEffect";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
import { CustomModal } from "src/modules/customers/component/Modal";
import BoxSelectCustomer from "src/modules/ticket/components/BoxSelectCustomer/BoxSelectCustomer";
import {
  getListCustomerApi,
  getListEmailIntegration,
  getTagsTicket,
} from "src/modules/ticket/helper/api";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import useFormCreateTicket from "src/modules/ticket/store/useFormCreateTicket";
import useSelectFrom from "src/modules/ticket/store/useSelectFrom";
import { wrapImageWithAnchorTag } from "src/utils/localValue";
import * as Yup from "yup";

interface TicketFormProps extends Partial<FormProps> {
  primaryEmail: EmailIntegration | undefined;
}

export const priorityOptions = [
  {
    label: "Urgent",
    value: Priority.URGENT,
  },
  {
    label: "High",
    value: Priority.HIGH,
  },
  {
    label: "Medium",
    value: Priority.MEDIUM,
  },
  {
    label: "Low",
    value: Priority.LOW,
  },
];

export const TicketForm = ({ ...props }: TicketFormProps) => {
  const [enableCC, setEnableCC] = useState(false);
  const navigate = useNavigate();
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const { state: visible, on: openPopup, off: closePopup } = useToggle();

  const { dataSaved }: any = useSaveDataGlobal();
  const [fromEmail, setFromEmail] = useState(props.primaryEmail);
  const [toEmail, setToEmail] = useState("");
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const selectedFrom = useSelectFrom((state) => state.selected);
  const contentCreate = useFormCreateTicket((state) => state.content);
  const updateContent = useFormCreateTicket((state) => state.updateState);

  const { data: dataEmailIntegration } = useQuery({
    queryKey: ["getListEmailIntegration"],
    queryFn: () => getListEmailIntegration({ page: 1, limit: 500 }),
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
      show(t("messages:error.get_tag"), { isError: true });
    },
  });

  const tagsOptions = useMemo(() => {
    if (!dataTags) return [];
    return dataTags.map((item) => ({
      label: item.name,
      value: item.name,
      obj: item,
    }));
  }, [dataTags]);

  const { data: dataCustomers } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: () => getListCustomerApi({ page: 1, limit: 500 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      show(t("messages:error.get_customer"), { isError: true });
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

  const onFinish = () => {
    const values = (props.innerRef as any)?.current.values;
    const findEmailIntegration = emailIntegrationOptions.find(
      (item) => item.value === values.from
    );
    const findCustomer = customersOptions.find(
      (item) => item.value === values.to
    );
    const dataCreate: any = {
      fromEmail: {
        email: findEmailIntegration?.obj.supportEmail,
        name: findEmailIntegration?.obj.name,
      },
      senderConfigId: values.from,
      agentObjectId: values.assignee ? values.assignee.value._id : undefined,
      agentEmail: values.assignee ? values.assignee.value.email : undefined,
      toEmails: [
        {
          email: values.to,
          name: findCustomer
            ? `${findCustomer?.obj.firstName} ${findCustomer?.obj.lastName}`
            : values.to.split("@")[0],
        },
      ],
      customerObjectId: findCustomer ? findCustomer?.obj._id : undefined,
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
      const contentSplit = changedValue.content.split('<div class="divide">');
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

  return (
    <Form
      {...props}
      initialValues={props.initialValues}
      validationSchema={TicketFormSchema}
      onSubmit={() => {
        onFinish();
      }}
      onValuesChange={handleChangeForm}
    >
      <style scoped>{css}</style>
      <FormLayout>
        <div className="grid xs:grid-cols-1 gap-x-[7%]">
          <div className="flex items-center gap-2 justify-start">
            <div className="flex-1">
              <div className="flex-1 xs:mt-4 0">
                <FormItem name="from">
                  <BoxSelectFilter
                    // disabled={disabled}
                    label="From"
                    data={emailIntegrationOptions}
                    placeholder="Defined Email address"
                  />
                </FormItem>
              </div>
            </div>
          </div>
          <div className="xs:order-first ">
            <FormItem name="to">
              <FormItem name="to">
                <BoxSelectCustomer
                  openPopup={openPopup}
                  form={props.innerRef}
                  label={
                    <div className="flex justify-between w-full">
                      <div>
                        <span className="mr-1 text-red-500">*</span>
                        <span>To</span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          onClick={() => {
                            setEnableCC(!enableCC);
                          }}
                        >
                          CC/BCC
                        </Link>
                      </div>
                    </div>
                  }
                  data={customersOptions}
                  placeholder="Email"
                />
              </FormItem>
            </FormItem>
          </div>
          {enableCC ? (
            <div className="flex-1 mt-3 xs:-order-2 ">
              <FormItem name="CC">
                <SelectAddEmail
                  label="CC"
                  data={customersOptions}
                  defaultTag={[]}
                />
              </FormItem>
            </div>
          ) : (
            <></>
          )}
          {enableCC ? (
            <div className="flex-1 mt-3 xs:-order-1 ">
              <FormItem name="BCC">
                <SelectAddEmail
                  label="BCC"
                  data={customersOptions}
                  defaultTag={[]}
                />
              </FormItem>
            </div>
          ) : (
            <></>
          )}
          <div className="mt-4">
            <FormItem name="subject">
              <TextField
                label={
                  <div>
                    <span className="mr-1 text-red-500">*</span>
                    <span>Subject</span>
                  </div>
                }
                autoComplete="off"
                placeholder="Enter subject"
              />
            </FormItem>
          </div>
          <div className="w-full mt-4">
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

          <div className="mt-4">
            <FormItem name="tags">
              <SelectAddTag
                label="Tags"
                data={tagsOptions}
                placeholder="+ Add Tags"
              />
            </FormItem>
          </div>
        </div>
        <div className="mt-4">
          <FormItem name="assignee">
            <ComboSelect.Ajax
              label="Assignee"
              placeholder="Search agents"
              height=""
              loadMore={fetchAgents}
            />
          </FormItem>
        </div>
        <div className="mt-4">
          <FormItem name="priority">
            <Select label="Priority" options={priorityOptions} />
          </FormItem>
        </div>

        <div className="flex justify-end gap-2">
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
      </FormLayout>
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

import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import {
  AgentRepository,
  Customer,
  CustomerRepository,
  EmailIntegration,
  EmailIntegrationRepository,
  GetListCustomerRequest,
  GetListTagRequest,
  Priority,
  Tag,
  TagRepository,
  TicketRepository,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, FormLayout, Link, Select, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { map } from "rxjs";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import { Select as ComboSelect, LoadMoreValue } from "src/components/Select";
import SelectAddEmail from "src/components/SelectAddEmail/SelectAddEmail";
import SelectAddTag from "src/components/SelectAddTag/SelectAddTag";
import { TextEditorTicket } from "src/components/TextEditorTicket";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
import BoxSelectCustomer from "src/modules/ticket/components/BoxSelectCustomer/BoxSelectCustomer";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
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

  const { dataSaved }: any = useSaveDataGlobal();
  const [fromEmail, setFromEmail] = useState(props.primaryEmail);
  const [toEmail, setToEmail] = useState({ value: "", id: "" });
  const [files, setFiles] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [emailIntegrations, setEmailIntegration] = useState<EmailIntegration[]>(
    []
  );

  const TicketFormSchema = Yup.object().shape({
    to: Yup.string()
      .required("Email address is required")
      .email("The email address is not valid"),
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
          }
        })
      );
  });
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
        })
      );
  });
  const { run: getListEmailIntegration } = useJob(
    (payload: GetListTagRequest) => {
      return EmailIntegrationRepository()
        .getListEmail(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const tags = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setEmailIntegration((prevTags) => {
                return [...prevTags, ...tags];
              });

              if (data.metadata.totalPage > (payload.page as number)) {
                getListEmailIntegration({
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
  const tagsOptions = useMemo(() => {
    return tags.map((item) => ({ value: item.name, label: item.name }));
  }, [tags]);
  const emailIntegrationsOptions = useMemo(() => {
    return emailIntegrations.map((item) => ({
      value: item._id,
      label: `${item.name} - ${item.supportEmail}`,
    }));
  }, [emailIntegrations]);
  const customersOptions = useMemo(() => {
    return customers.map((item) => ({
      label: `${item.firstName} ${item.lastName} - ${item.email}`,
      value: item.email,
    }));
  }, [customers]);
  useEffect(() => {
    getListTagApi({
      page: 1,
      limit: 500,
    });
    getListEmailIntegration({
      page: 1,
      limit: 500,
    });
    getListCustomerApi({
      page: 1,
      limit: 500,
    });
  }, []);
  // const handleValueChange = (value: any) => {
  //   console.log({ value });
  // };
  const onFinish = () => {
    const values = (props.innerRef as any)?.current.values;
    console.log({ emailIntegrations });
    console.log("??", values.from);
    const findEmailIntegration = emailIntegrations.find(
      (item) => item._id === values.from
    );
    console.log({ findEmailIntegration });
    const findCustomer = customers.find((item) => item.email === values.to);
    const dataCreate: any = {
      fromEmail: {
        email: findEmailIntegration?.supportEmail,
        name: findEmailIntegration?.name,
      },
      senderConfigId: values.from,
      agentObjectId: values.assignee ? values.assignee.value._id : undefined,
      agentEmail: values.assignee ? values.assignee.value.email : undefined,
      toEmails: [
        {
          email: values.to,
          name: findCustomer
            ? `${findCustomer.firstName} ${findCustomer.lastName}`
            : values.to.split("@")[0],
        },
      ],
      customerObjectId: findCustomer ? findCustomer._id : undefined,
      ccEmails: values?.CC,
      bccEmails: values?.BCC,
      subject: values.subject,
      description: values.content,
      status: "OPEN",
      priority: values.priority,
      tags: values.tags,
      attachmentIds: files,
    };
    CreateTicket(dataCreate);
  };
  const css = `
  .Polaris-Label{
    width: 100%;
  }
  `;

  return (
    <Form
      {...props}
      // onValuesChange={handleValueChange}
      initialValues={props.initialValues}
      validationSchema={TicketFormSchema}
      onSubmit={() => {
        onFinish();
      }}
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
                    data={emailIntegrationsOptions}
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
                  form={props.innerRef}
                  label={
                    <div className="flex justify-between w-full">
                      <div>
                        <span className="mr-1 text-red-500">*</span>
                        <span>To</span>
                      </div>
                      <div className="">
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
          <div className="w-full mt-6">
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
    </Form>
  );
};

export default TicketForm;

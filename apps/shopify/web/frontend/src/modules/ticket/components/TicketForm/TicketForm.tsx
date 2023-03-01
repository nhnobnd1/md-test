import { AgentRepository, Priority, TagRepository } from "@moose-desk/repo";
import { FormLayout, Link, Select, TextField } from "@shopify/polaris";
import { useCallback } from "react";
import { map } from "rxjs";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { RichText } from "src/components/RichText";
import { LoadMoreValue, Select as ComboSelect } from "src/components/Select";
import env from "src/core/env";
import * as Yup from "yup";

interface TicketFormProps extends Partial<FormProps> {}

export const priorityOptions = [
  {
    label: "Highest",
    value: Priority.Highest,
  },
  {
    label: "High",
    value: Priority.High,
  },
  {
    label: "Medium",
    value: Priority.Medium,
  },
  {
    label: "Low",
    value: Priority.Low,
  },
  {
    label: "Lowest",
    value: Priority.Lowest,
  },
];

export const TicketForm = ({ ...props }: TicketFormProps) => {
  const TicketFormSchema = Yup.object().shape({
    to: Yup.string()
      .required("Email address is required")
      .email("The email address is not valid"),
  });

  const fetchAgents = useCallback(
    (params: LoadMoreValue) => {
      const limit = env.DEFAULT_PAGE_SIZE;

      return AgentRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
        })
        .pipe(
          map(({ data }) => {
            return {
              options: data.data.map((item) => ({
                label: item.lastName.includes("admin")
                  ? item.firstName
                  : item.firstName + " " + item.lastName,
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

  const fetchTags = useCallback(
    (params: LoadMoreValue) => {
      const limit = env.DEFAULT_PAGE_SIZE;

      return TagRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
        })
        .pipe(
          map(({ data }) => {
            return {
              options: data.data.map((item) => ({
                label: item.name,
                value: item._id,
                obj: item,
              })),
              canLoadMore: params.page < data.metadata.totalPage,
            };
          })
        );
    },
    [TagRepository]
  );

  return (
    <Form
      {...props}
      initialValues={props.initialValues}
      validationSchema={TicketFormSchema}
      onSubmit={() => {}}
    >
      <FormLayout>
        <div className="grid grid-cols-2 gap-x-[7%]">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <FormItem name="to">
                <TextField
                  label="To"
                  type="email"
                  autoComplete="off"
                  placeholder="Enter name"
                />
              </FormItem>
            </div>
            <Link>CC/BCC</Link>
          </div>
          <div>
            <FormItem name="assignee">
              <ComboSelect.Ajax
                label="Assignee"
                placeholder="Search agents"
                height="250px"
                loadMore={fetchAgents}
              />
            </FormItem>
          </div>
          <div className="mt-4">
            <FormItem name="from">
              <Select label="From" placeholder="Defined Email address" />
            </FormItem>
          </div>
          <div className="mt-4">
            <FormItem name="priority">
              <Select label="Priority" options={priorityOptions} />
            </FormItem>
          </div>
          <div className="mt-4">
            <FormItem name="tags">
              <ComboSelect.Ajax
                label="Tags"
                height="250px"
                showTag
                placeholder="Add tags"
                allowMultiple
                loadMore={fetchTags}
              />
            </FormItem>
          </div>
          <div className="mt-4"></div>
          <div className="mt-4">
            <FormItem name="macros">
              <Select label="Macros" />
            </FormItem>
          </div>
        </div>
        <div className="w-full mt-6">
          <FormItem name="message">
            <RichText
              labelProps={{
                as: "span",
                variant: "bodyMd",
                children: "Content",
              }}
              init={{
                height: 250,
                placeholder: "Please input your message here......",
              }}
            />
          </FormItem>
        </div>
      </FormLayout>
    </Form>
  );
};

export default TicketForm;

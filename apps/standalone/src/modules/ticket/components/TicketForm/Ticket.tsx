import { AgentRepository } from "@moose-desk/repo";
import { Input } from "antd";
import { useCallback, useMemo } from "react";
import { map } from "rxjs";
import TextEditor from "src/components/UI/Editor/TextEditor";
import { Form, FormProps } from "src/components/UI/Form";
import Select, {
  LoadMoreValue,
  OptionType,
} from "src/components/UI/Select/Select";
import env from "src/core/env";

interface TicketFormProps extends FormProps {}

export enum Priority {
  Highest = "Highest",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Lowest = "Lowest",
}
export const TicketForm = ({ ...props }: TicketFormProps) => {
  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        to: "",
        assignee: "3a08cb83-d4ea-69c4-f1be-a4d5970f7ebb",
        priority: Priority.Medium,
        macros: "",
        message: "Please input your message here.....",
      }
    );
  }, [props.initialValues]);

  const priorityOptions = useMemo<OptionType[]>(() => {
    return [
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
  }, [Priority]);

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
  return (
    <Form
      layout={"vertical"}
      enableReinitialize
      initialValues={initialValues}
      {...props}
    >
      <div>
        <div className="grid grid-cols-2 gap-x-6">
          <Form.Item
            label="To"
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
            ]}
          >
            <Input placeholder="Type Customer email..."></Input>
          </Form.Item>
          <Form.Item label="Assignee" name="assignee">
            <Select.Ajax
              placeholder="Search agents"
              // suffixIcon={<PhUserPlusFill></PhUserPlusFill>}
              value={null}
              virtual
              loadMore={fetchAgents}
            />
          </Form.Item>
          <Form.Item
            label="From"
            name="from"
            rules={[{ required: true, message: "From is required" }]}
          >
            <Select placeholder="Defined Email address"></Select>
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select
              options={priorityOptions}
              placeholder="Defined Email address"
            ></Select>
          </Form.Item>
          <Form.Item name="macros" label="Macros">
            <Select></Select>
          </Form.Item>
        </div>
        <div className="mt-4">
          <Form.Item name="message" className="w-full">
            <TextEditor />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default TicketForm;

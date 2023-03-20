import {
  AgentRepository,
  Priority,
  priorityOptions,
  TagRepository,
} from "@moose-desk/repo";
import { Input } from "antd";
import { useCallback, useMemo } from "react";
import { map } from "rxjs";
import TextEditor from "src/components/UI/Editor/TextEditor";
import { Form, FormProps } from "src/components/UI/Form";
import Select, { LoadMoreValue } from "src/components/UI/Select/Select";
import env from "src/core/env";

interface TicketFormProps extends FormProps {}

export const TicketForm = ({ ...props }: TicketFormProps) => {
  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        to: "",
        assignee: "3a08b18a-e690-f9ca-ff56-e7145104fb8d",
        priority: Priority.Medium,
        macros: "",
        message: "Please input your message here.....",
      }
    );
  }, [props.initialValues]);

  const fetchAgents = useCallback(
    (params: LoadMoreValue) => {
      const limit = env.DEFAULT_PAGE_SIZE;
      if (params.value && params.isFirst) {
        return AgentRepository()
          .getOne(params.value)
          .pipe(
            map(({ data }) => {
              const item = data.data;
              return {
                options: [
                  {
                    label: item.lastName.includes("admin")
                      ? `${item.firstName} - ${item.email}`
                      : `${item.firstName} ${item.lastName} - ${item.email}`,
                    value: item._id,
                    obj: item,
                  },
                ],
                canLoadMore: true,
              };
            })
          );
      } else {
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
      }
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

  const handleChangeForm = useCallback((changedValue) => {
    // console.log(changedValue, "changed value");
  }, []);
  return (
    <Form
      layout={"vertical"}
      enableReinitialize
      initialValues={initialValues}
      onValuesChange={handleChangeForm}
      {...props}
    >
      <div>
        <div className="grid grid-cols-2 gap-x-[7%]">
          <div className="flex items-center gap-2">
            <div className="flex-1">
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
            </div>
            <span className="link">CC/BCC</span>
          </div>

          <Form.Item label="Assignee" name="assignee">
            <Select.Ajax
              placeholder="Search agents"
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
            <Select options={priorityOptions}></Select>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select.Ajax
              mode="multiple"
              placeholder="Add tags"
              loadMore={fetchTags}
            ></Select.Ajax>
          </Form.Item>
          <div></div>
          <Form.Item name="macros" label="Macros">
            <Select></Select>
          </Form.Item>
        </div>
        <div className="mt-4">
          <Form.Item name="message" className="w-full">
            <TextEditor
              init={{
                height: 250,
                placeholder: "Please input your message here......",
              }}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default TicketForm;

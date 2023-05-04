import { emailRegex, objectIdRegex, useJob } from "@moose-desk/core";
import { Conversation, Tag, TagRepository, Ticket } from "@moose-desk/repo";
import { Select as AntSelect, Card, List } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import moment from "moment";
import VirtualList from "rc-virtual-list";
import { memo, useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import TextEditor from "src/components/UI/Editor/TextEditor";
import { Form } from "src/components/UI/Form";
import Select from "src/components/UI/Select/Select";
import { RowMessage } from "src/modules/ticket/components/DetailTicketForm/RowMessage";
import { useStore } from "src/providers/StoreProviders";
import "./BoxReply.scss";

interface BoxReplyProps {
  id: string | undefined;
  ticket: Ticket;
  form: FormInstance<any>;
  conversationList: Conversation[];
  tags: Tag[];
  setTags: any;
}

export interface ChatItem {
  id: string;
  name: string;
  chat: string;
  time: string;
  email: string;
}

const heightBoxComment = 400;

const validateCCEmail = (value: string[]): boolean => {
  if (!value) return true;
  let checked = true;
  for (const item of value) {
    if (!emailRegex.test(item)) {
      checked = false;
      break;
    }
  }
  return checked;
};

const BoxReply = ({
  id,
  ticket,
  form,
  conversationList,
  tags,
  setTags,
}: BoxReplyProps) => {
  const [enableCC, setEnableCC] = useState(false);
  const [tagsCreated, setTagsCreated] = useState<Tag[] | []>([]);
  const { storeId } = useStore();

  const listChat = useMemo<ChatItem[]>(() => {
    const conversationMapping: any = conversationList?.map(
      (item: Conversation) => {
        return {
          id: item._id,
          name: item.fromEmail?.name,
          time: moment
            .unix(item.createdTimestamp)
            .local()
            .format("HH:mm MM/DD/YYYY"),
          chat: item.description,
          email: item.fromEmail?.email,
        };
      }
    );
    conversationMapping?.unshift({
      id: ticket._id,
      name: ticket?.fromEmail.name,
      time: moment
        .unix(ticket.createdTimestamp)
        .local()
        .format("HH:mm MM/DD/YYYY"),
      chat: ticket.description,
      email: ticket.fromEmail.email,
    });
    return conversationMapping;
  }, [ticket, conversationList]);

  const { run: createTag } = useJob(
    (dataSubmit: any) => {
      return TagRepository()
        .create(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setTagsCreated([...tagsCreated, data.data]);
              setTags([...tags, data.data]);
            }
          }),
          catchError((err) => {
            return of(err);
          })
        );
    },
    { showLoading: false }
  );
  useEffect(() => {
    const tags: string[] = form.getFieldValue("tags");
    const result = [];
    if (tags?.length) {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        if (objectIdRegex.test(tag)) {
          result.push(tag);
        } else {
          const findItem = tagsCreated.find((item: Tag) => item.name === tag);
          result.push(findItem?._id);
        }
      }
    }
    form.setFieldValue("tags", result);
  }, [tagsCreated.length]);

  const onChangeTag = (value: string) => {
    const idsTagCreated = tagsCreated.map((item) => item.name);
    for (const item of value) {
      if (!objectIdRegex.test(item) && !idsTagCreated.includes(item)) {
        createTag({ name: item, storeId });
      }
    }
  };

  const initialValues = useMemo(() => {
    return {
      to: ticket.toEmails[0].email,
      tags: ticket.tags,
    };
  }, [id, ticket]);
  const onFinish = (values: any) => {
    console.log({ values });
  };

  return (
    <div className="BoxReply w-full">
      <Card className="card-reply">
        <div className="w-full h-full">
          <div className="box-chat">
            <List>
              <VirtualList
                data={listChat}
                height={heightBoxComment}
                itemHeight={50}
                itemKey="id"
              >
                {(item: ChatItem) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      // avatar={<Avatar size={"large"} />}
                      // title={<span>{item.name}</span>}
                      description={<RowMessage item={item} />}
                    />
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </div>
          <div className="box-comment">
            <Form
              form={form}
              enableReinitialize
              initialValues={initialValues}
              onFinish={onFinish}
            >
              <div className="w-full flex items-start gap-4 flex-wrap">
                <div className="flex flex-1">
                  <div className="w-full">
                    <Form.Item label="To" name="to" labelCol={{ span: 4 }}>
                      <Select
                        className="w-[150px]"
                        placeholder="Customer Email"
                      />
                    </Form.Item>
                    {enableCC ? (
                      <Form.Item
                        label="CC"
                        name="CC"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ offset: 0, span: 18 }}
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (validateCCEmail(value)) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(
                                  new Error("The email address is not valid")
                                );
                              }
                            },
                          }),
                        ]}
                      >
                        <Select
                          options={[]}
                          mode="tags"
                          placeholder="Type CC email..."
                        ></Select>
                      </Form.Item>
                    ) : (
                      <></>
                    )}
                    {enableCC ? (
                      <Form.Item
                        label="BCC"
                        name="BCC"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ offset: 0, span: 18 }}
                        rules={[
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (validateCCEmail(value)) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(
                                  new Error("The email address is not valid")
                                );
                              }
                            },
                          }),
                        ]}
                      >
                        <Select
                          options={[]}
                          mode="tags"
                          placeholder="Type BCC email..."
                        ></Select>
                      </Form.Item>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <span
                      className="link"
                      onClick={() => {
                        setEnableCC(!enableCC);
                      }}
                    >
                      CC/BCC
                    </span>
                  </div>
                </div>

                <Form.Item name="tags" label="Tags" className="flex-1">
                  <AntSelect
                    placeholder="Add tags"
                    mode="tags"
                    options={tags.map((item: Tag) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                    onChange={onChangeTag}
                  />
                </Form.Item>
              </div>
              <Form.Item name="message">
                <TextEditor
                  init={{
                    height: 250,
                    menubar: false,
                    placeholder: "Please input your message here......",
                  }}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default memo(BoxReply);

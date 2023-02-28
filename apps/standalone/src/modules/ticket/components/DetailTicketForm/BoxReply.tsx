import { TagRepository } from "@moose-desk/repo";
import { Avatar, Card, Form, List } from "antd";
import VirtualList from "rc-virtual-list";
import { useCallback, useMemo } from "react";
import { map } from "rxjs";
import TextEditor from "src/components/UI/Editor/TextEditor";
import Select, { LoadMoreValue } from "src/components/UI/Select/Select";
import env from "src/core/env";
import "./BoxReply.scss";

interface BoxReplyProps {}

interface ChatItem {
  id: string;
  name: string;
  avatar: string;
  chat: string;
  time: string;
}

const heightBoxComment = 400;

const BoxReply = (props: BoxReplyProps) => {
  const listChat = useMemo<ChatItem[]>(() => {
    return [
      {
        id: "1",
        name: "Customer",
        avatar: "https://joesch.moe/api/v1/random",
        time: "19:02:18",
        chat: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      },
      {
        id: "2",
        name: "Agent",
        avatar: "https://joesch.moe/api/v1/random",
        time: "19:02:18",
        chat: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      },
      {
        id: "3",
        name: "Agent 2",
        avatar: "https://joesch.moe/api/v1/random",
        time: "19:02:18",
        chat: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      },
      {
        id: "4",
        name: "Agent 4",
        avatar: "https://joesch.moe/api/v1/random",
        time: "19:02:18",
        chat: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      },
    ];
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      heightBoxComment
    ) {
      console.log("scroll");
    }
  };

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
                onScroll={onScroll}
              >
                {(item: ChatItem) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar size={"large"} src={item.avatar} />}
                      title={<span>{item.name}</span>}
                      description={
                        <div>
                          <div className="text-black mb-2">{item.chat}</div>
                          <div className="text-black flex justify-end font-bold">
                            {item.time}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </div>
          <div className="box-comment">
            <div className="w-full flex items-center gap-4">
              <Form.Item label="To" name="to">
                <Select className="w-[150px]" placeholder="Customer Email" />
              </Form.Item>
              <Form.Item label="Macros" name="macros">
                <Select className="w-[150px]" />
              </Form.Item>
              <Form.Item name="tags" label="Tags">
                <Select.Ajax
                  mode="tags"
                  className="w-[250px]"
                  placeholder="Add tags"
                  loadMore={fetchTags}
                ></Select.Ajax>
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BoxReply;

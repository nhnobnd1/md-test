import { TagRepository } from "@moose-desk/repo";
import {
  Avatar,
  Card,
  FormLayout,
  LegacyCard,
  Scrollable,
  Select,
  Text,
} from "@shopify/polaris";
import { useCallback, useMemo } from "react";
import { map } from "rxjs";
import FormItem from "src/components/Form/Item";
import { RichText } from "src/components/RichText";
import { LoadMoreValue, Select as ComboSelect } from "src/components/Select";
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

export const BoxReply = (props: BoxReplyProps) => {
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
        name: "Agent 3",
        avatar: "https://joesch.moe/api/v1/random",
        time: "19:02:18",
        chat: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      },
      {
        id: "5",
        name: "Agent 4",
        avatar: "https://joesch.moe/api/v1/random",
        time: "19:02:18",
        chat: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      },
    ];
  }, []);

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
      <LegacyCard sectioned>
        <div className="w-full h-full">
          <div className="box-chat mb-6">
            <Card>
              <Scrollable style={{ height: "400px" }}>
                {listChat.map((item) => (
                  <div className="box-chat__item" key={item.id}>
                    <div className="flex items-center gap-4">
                      <div className="avatar mb-1">
                        <Avatar source={item.avatar} name={item.name} />
                      </div>
                      <div className="content mb-1">
                        <Text as="p" variant="bodyMd" fontWeight="semibold">
                          {item.name}
                        </Text>
                        <Text as="p" variant="bodyMd">
                          {item.chat}
                        </Text>
                      </div>
                    </div>
                    <div className="text-right">
                      <Text as="span" variant="bodySm" fontWeight="bold">
                        {item.time}
                      </Text>
                    </div>
                  </div>
                ))}
              </Scrollable>
            </Card>
          </div>
          <div className="box-comment">
            <FormLayout.Group condensed>
              <FormItem name="to">
                <Select label="To" placeholder="Customer Email" />
              </FormItem>
              <FormItem name="macros">
                <Select label="Macros" />
              </FormItem>
              <FormItem name="tag">
                <ComboSelect.Ajax
                  label="Tags"
                  height="250px"
                  showTag
                  placeholder="Add tags"
                  allowMultiple
                  loadMore={fetchTags}
                />
              </FormItem>
            </FormLayout.Group>
            <div className="mt-4">
              <FormItem name="message">
                <RichText
                  init={{
                    height: 250,
                    menubar: false,
                    placeholder: "Please input your message here......",
                  }}
                />
              </FormItem>
            </div>
          </div>
        </div>
      </LegacyCard>
    </div>
  );
};

export default BoxReply;

import { Button, Collapse, Divider } from "antd";
import { FC, useState } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import { RowMessage } from "src/modules/ticket/components/DetailTicketForm/RowMessage";
import AttachIcon from "~icons/mingcute/attachment-2-line";

interface CollapseMessageProps {
  listChat: any;
}

export const CollapseMessage: FC<CollapseMessageProps> = ({ listChat }) => {
  const [showMiddleItems, setShowMiddleItems] = useState(false);

  const handleShowMiddleItems = () => {
    setShowMiddleItems(!showMiddleItems);
  };
  return listChat.length > 4 ? (
    <Collapse
      defaultActiveKey={listChat.slice(-2).map((item: ChatItem) => item.id)}
      bordered={false}
      className="bg-white w-full"
    >
      {listChat.slice(0, 2).map((item: ChatItem, index: number) => (
        <Collapse.Panel
          header={
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <span className="font-bold">{item.name}</span>
                <span className="text-gray-500 text-xs">({item.email})</span>
              </div>
              <div className="flex items-center gap-2">
                {item?.attachments?.length ? (
                  <AttachIcon style={{ fontSize: 20 }} />
                ) : (
                  <></>
                )}

                <span>{item.time}</span>
              </div>
            </div>
          }
          key={item.id}
        >
          <RowMessage item={item} />
        </Collapse.Panel>
      ))}
      {!showMiddleItems && (
        <div className=" mt-2 flex  items-center w-full ">
          <Button
            shape="circle"
            onClick={handleShowMiddleItems}
            className="min-w-[40px] min-h-[40px] "
          >
            {listChat.length - 4}
          </Button>
          <div className="w-full overflow-hidden">
            <Divider className="m-4" />
            <Divider className="m-4" />
          </div>
        </div>
      )}

      {showMiddleItems &&
        listChat.slice(2, listChat.length - 2).map((item: ChatItem) => (
          <Collapse.Panel
            header={
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-gray-500 text-xs">({item.email})</span>
                </div>
                <div className="flex items-center gap-2">
                  {item?.attachments?.length ? (
                    <AttachIcon style={{ fontSize: 20 }} />
                  ) : (
                    <></>
                  )}

                  <span>{item.time}</span>
                </div>
              </div>
            }
            key={item.id}
          >
            <RowMessage item={item} />
          </Collapse.Panel>
        ))}
      {listChat
        .slice(listChat.length - 2, listChat.length)
        .map((item: ChatItem) => (
          <Collapse.Panel
            header={
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-gray-500 text-xs">({item.email})</span>
                </div>
                <div className="flex items-center gap-2">
                  {item?.attachments?.length ? (
                    <AttachIcon style={{ fontSize: 20 }} />
                  ) : (
                    <></>
                  )}

                  <span>{item.time}</span>
                </div>
              </div>
            }
            key={item.id}
          >
            <RowMessage item={item} />
          </Collapse.Panel>
        ))}
    </Collapse>
  ) : (
    <Collapse
      defaultActiveKey={listChat.slice(-2).map((item: ChatItem) => item.id)}
      bordered={false}
      className="bg-white w-full"
    >
      {listChat.map((item: ChatItem) => (
        <Collapse.Panel
          header={
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <span className="font-bold">{item.name}</span>
                <span className="text-gray-500 text-xs">({item.email})</span>
              </div>
              <div className="flex items-center gap-2">
                {item?.attachments?.length ? (
                  <AttachIcon style={{ fontSize: 20 }} />
                ) : (
                  <></>
                )}

                <span>{item.time}</span>
              </div>
            </div>
          }
          key={item.id}
        >
          <RowMessage item={item} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

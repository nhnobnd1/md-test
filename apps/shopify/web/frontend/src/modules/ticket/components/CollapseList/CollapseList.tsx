import { Button, Divider } from "@shopify/polaris";
import { FC, useState } from "react";
import { CollapseItem } from "src/modules/ticket/components/CollapseList/CollapseItem";
import { ChatItem } from "src/modules/ticket/pages/DetailTicket";

interface CollapseListProps {
  listChat: any;
}

export const CollapseList: FC<CollapseListProps> = ({ listChat }) => {
  const [showMiddleItems, setShowMiddleItems] = useState(false);
  const handleShowMiddleItems = () => {
    setShowMiddleItems(!showMiddleItems);
  };

  return listChat.length > 4 ? (
    <>
      {listChat.slice(0, 2).map((item: ChatItem) => (
        <CollapseItem key={item.id} item={item} />
      ))}
      {!showMiddleItems && (
        <div className=" m-2 flex  items-center w-full ">
          <div
            onClick={handleShowMiddleItems}
            className="w-[40px] h-[36px] rounded-3xl flex justify-center items-center  hover:cursor-pointer text-white overflow-hidden"
          >
            <Button primary>{listChat.length - 4 + ""}</Button>
          </div>
          <div className="w-full overflow-hidden">
            <div className="m-2">
              <Divider />
            </div>
            <div className="m-2">
              <Divider />
            </div>
          </div>
        </div>
      )}
      {showMiddleItems &&
        listChat
          .slice(2, listChat.length - 2)
          .map((item: ChatItem) => <CollapseItem key={item.id} item={item} />)}
      {listChat
        .slice(listChat.length - 2, listChat.length)
        .map((item: ChatItem) => (
          <CollapseItem key={item.id} item={item} status={true} />
        ))}
    </>
  ) : (
    listChat.map((item: ChatItem, index: number, array: ChatItem[]) => {
      return (
        <CollapseItem
          key={item.id}
          item={item}
          status={array.length - 3 < index}
        />
      );
    })
  );
};

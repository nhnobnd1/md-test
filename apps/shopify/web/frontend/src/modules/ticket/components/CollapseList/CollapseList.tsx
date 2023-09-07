import { MediaScreen } from "@moose-desk/core";
import { FC } from "react";
import useScreenType from "src/hooks/useScreenType";
import { RowMessage } from "src/modules/ticket/components/RowMessage";
import { ChatItem } from "src/modules/ticket/pages/DetailTicket";

interface CollapseListProps {
  listChat: any;
}

export const CollapseList: FC<CollapseListProps> = ({ listChat }) => {
  const [screenType, screenWidth] = useScreenType();

  const isTablet = Boolean(screenWidth <= MediaScreen.XXL);

  return listChat.map((item: ChatItem, index: number) => (
    <div
      key={item.id}
      className={`flex justify-${
        item.right ? (isTablet ? "start" : "end") : "start"
      }`}
    >
      <RowMessage key={item.id} item={item} type={listChat[0]?.typeChat} />
    </div>
  ));
};

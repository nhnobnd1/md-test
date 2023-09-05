import { FC } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";

import { MediaScreen } from "@moose-desk/core";
import useViewport from "src/hooks/useViewport";
import { RowMessageBeta } from "src/modules/ticket/components/DetailTicketForm/RowMessageBeta";
import "./BoxReplyBeta.scss";
interface CollapseMessageProps {
  listChat: any;
}

export const CollapseMessageBeta: FC<CollapseMessageProps> = ({ listChat }) => {
  const { isMobile: isTablet } = useViewport(MediaScreen.LG);

  return listChat.map((item: ChatItem, index: number) => (
    <div
      key={item.id}
      className={`flex justify-${
        item.right ? (isTablet ? "start" : "end") : "start"
      }`}
    >
      <RowMessageBeta key={item.id} item={item} type={listChat[0]?.typeChat} />
    </div>
  ));
};

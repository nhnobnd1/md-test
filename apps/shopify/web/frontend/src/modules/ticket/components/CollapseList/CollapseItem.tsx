import { Button, Collapsible } from "@shopify/polaris";
import { FC, useCallback, useState } from "react";
import { RowMessage } from "src/modules/ticket/components/RowMessage";
import { ChatItem } from "src/modules/ticket/pages/DetailTicket";
import useForwardTicket from "src/modules/ticket/store/useForwardTicket";
import ForwardIcon from "~icons/ion/forward";
import CollapseIcon from "~icons/material-symbols/keyboard-arrow-down-rounded";
import AttachIcon from "~icons/mingcute/attachment-2-line";

interface CollapseItemProps {
  item: ChatItem;
  status?: boolean;
}

export const CollapseItem: FC<CollapseItemProps> = ({
  item,
  status = false,
}) => {
  const [open, setOpen] = useState(status);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  const updateChatItem = useForwardTicket((state) => state.updateChatItem);
  const handleForward = (e: any, item: ChatItem) => {
    e.stopPropagation();
    updateChatItem(item);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  };
  return (
    <div>
      <div
        className="flex min-h-[54px] mb-3 hover:cursor-pointer "
        onClick={handleToggle}
      >
        <Button
          plain
          monochrome
          ariaExpanded={open}
          ariaControls="basic-collapsible"
          textAlign="left"
          icon={
            <div
              className={!open ? `-rotate-90 duration-200` : ` duration-200`}
            >
              <CollapseIcon fontSize={20} />
            </div>
          }
          size="large"
        ></Button>
        <div className="flex justify-between items-center w-full flex-wrap overflow-auto">
          <div className="flex gap-2 items-center flex-wrap">
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
            <span
              onClick={(e) => {
                handleForward(e, item);
              }}
            >
              <ForwardIcon fontSize={20} />
            </span>
          </div>
        </div>
      </div>

      <div className="px-2">
        <Collapsible
          open={open}
          id="basic-collapsible"
          transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
          expandOnPrint
        >
          <RowMessage item={item} />
        </Collapsible>
      </div>
    </div>
  );
};

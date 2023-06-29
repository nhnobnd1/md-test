import { Button, Card, Collapsible } from "@shopify/polaris";
import { FC, useCallback, useState } from "react";
import { RowMessage } from "src/modules/ticket/components/RowMessage";
import { ChatItem } from "src/modules/ticket/pages/DetailTicket";
import CollapseIcon from "~icons/material-symbols/arrow-right";
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

  return (
    <div>
      <Card>
        <div
          className="flex min-h-[54px] mb-3 hover:cursor-pointer px-2"
          onClick={handleToggle}
        >
          <Button
            plain
            ariaExpanded={open}
            ariaControls="basic-collapsible"
            textAlign="left"
            icon={<CollapseIcon />}
            size="medium"
          ></Button>
          <div className="flex justify-between items-center w-full flex-wrap overflow-scroll">
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
            </div>
          </div>
        </div>
      </Card>
      <Collapsible
        open={open}
        id="basic-collapsible"
        transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        <RowMessage item={item} />
      </Collapsible>
    </div>
  );
};
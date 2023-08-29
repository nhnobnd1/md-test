import { FC, useState } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";

import { MediaScreen } from "@moose-desk/core";
import useViewport from "src/hooks/useViewport";
import { RowMessageBeta } from "src/modules/ticket/components/DetailTicketForm/RowMessageBeta";
import useForwardTicket from "src/modules/ticket/store/useForwardTicket";
import "./BoxReplyBeta.scss";
interface CollapseMessageProps {
  listChat: any;
}

export const CollapseMessageBeta: FC<CollapseMessageProps> = ({ listChat }) => {
  const [showMiddleItems, setShowMiddleItems] = useState(false);
  const { isMobile: isTablet } = useViewport(MediaScreen.LG);
  const handleShowMiddleItems = () => {
    setShowMiddleItems(!showMiddleItems);
  };
  const updateChatItem = useForwardTicket((state) => state.updateChatItem);
  const handleForward = (e: any, item: ChatItem) => {
    e.stopPropagation();
    updateChatItem(item);
  };
  return listChat.map((item: ChatItem, index: number) => (
    <div
      key={item.id}
      className={`flex justify-${
        item.right ? (isTablet ? "start" : "end") : "start"
      }`}
    >
      <RowMessageBeta key={item.id} item={item} />
    </div>
  ));

  //     bordered={false}
  //     className="bg-white w-full"
  //   >
  //     {listChat.slice(0, 2).map((item: ChatItem, index: number) => (
  //       <Collapse.Panel
  //         className="collapse-header"
  //         header={
  //           <div className="flex justify-between items-center flex-wrap">
  //             <div className="flex gap-2 items-center flex-wrap">
  //               <span className="font-bold">{item.name}</span>
  //               <span className="text-gray-500 text-xs">({item.email})</span>
  //             </div>
  //             <div className="flex items-center gap-2">
  //               {item?.attachments?.length ? (
  //                 <AttachIcon style={{ fontSize: 20 }} />
  //               ) : (
  //                 <></>
  //               )}

  //               <span>{item.time}</span>
  //               <MDButton
  //                 onClick={(e) => {
  //                   handleForward(e, item);
  //                 }}
  //                 type="text"
  //                 icon={
  //                   <Tooltip title="Forward">
  //                     <span className="translate-y-[3px]">
  //                       <ForwardIcon fontSize={14} />
  //                     </span>
  //                   </Tooltip>
  //                 }
  //               ></MDButton>
  //             </div>
  //           </div>
  //         }
  //         key={item.id}
  //       >
  //         <RowMessage item={item} />
  //       </Collapse.Panel>
  //     ))}
  //     {!showMiddleItems && (
  //       <div className=" mt-2 flex  items-center w-full ">
  //         <Button
  //           type="primary"
  //           shape="circle"
  //           onClick={handleShowMiddleItems}
  //           className="min-w-[40px] min-h-[40px] "
  //         >
  //           {listChat.length - 4}
  //         </Button>
  //         <div className="w-full overflow-hidden">
  //           <Divider className="m-4" />
  //           <Divider className="m-4" />
  //         </div>
  //       </div>
  //     )}

  //     {showMiddleItems &&
  //       listChat.slice(2, listChat.length - 2).map((item: ChatItem) => (
  //         <Collapse.Panel
  //           className="collapse-header"
  //           header={
  //             <div className="flex justify-between items-center flex-wrap">
  //               <div className="flex gap-2 items-center flex-wrap">
  //                 <span className="font-bold">{item.name}</span>
  //                 <span className="text-gray-500 text-xs">({item.email})</span>
  //               </div>
  //               <div className="flex items-center gap-2">
  //                 {item?.attachments?.length ? (
  //                   <AttachIcon style={{ fontSize: 20 }} />
  //                 ) : (
  //                   <></>
  //                 )}

  //                 <span>{item.time}</span>
  //                 <MDButton
  //                   onClick={(e) => {
  //                     handleForward(e, item);
  //                   }}
  //                   type="text"
  //                   icon={
  //                     <Tooltip title="Forward">
  //                       <span className="translate-y-[3px]">
  //                         <ForwardIcon fontSize={14} />
  //                       </span>
  //                     </Tooltip>
  //                   }
  //                 ></MDButton>
  //               </div>
  //             </div>
  //           }
  //           key={item.id}
  //         >
  //           <RowMessage item={item} />
  //         </Collapse.Panel>
  //       ))}
  //     {listChat
  //       .slice(listChat.length - 2, listChat.length)
  //       .map((item: ChatItem) => (
  //         <Collapse.Panel
  //           className="collapse-header"
  //           header={
  //             <div className="flex justify-between items-center flex-wrap">
  //               <div className="flex gap-2 items-center flex-wrap">
  //                 <span className="font-bold">{item.name}</span>
  //                 <span className="text-gray-500 text-xs">({item.email})</span>
  //               </div>
  //               <div className="flex items-center gap-2">
  //                 {item?.attachments?.length ? (
  //                   <AttachIcon style={{ fontSize: 20 }} />
  //                 ) : (
  //                   <></>
  //                 )}

  //                 <span>{item.time}</span>
  //                 <MDButton
  //                   onClick={(e) => {
  //                     handleForward(e, item);
  //                   }}
  //                   type="text"
  //                   icon={
  //                     <Tooltip title="Forward">
  //                       <span className="translate-y-[3px]">
  //                         <ForwardIcon fontSize={14} />
  //                       </span>
  //                     </Tooltip>
  //                   }
  //                 ></MDButton>
  //               </div>
  //             </div>
  //           }
  //           key={item.id}
  //         >
  //           <RowMessage item={item} />
  //         </Collapse.Panel>
  //       ))}
  //   </Collapse>
  // ) : (
  //   <Collapse
  //     defaultActiveKey={listChat.slice(-2).map((item: ChatItem) => item.id)}
  //     bordered={false}
  //     className="bg-white w-full"
  //   >
  //     {listChat.map((item: ChatItem) => (
  //       <Collapse.Panel
  //         className="collapse-header"
  //         header={
  //           <div className="flex justify-between items-center flex-wrap">
  //             <div className="flex gap-2 items-center flex-wrap">
  //               <span className="font-bold">{item.name}</span>
  //               <span className="text-gray-500 text-xs">({item.email})</span>
  //             </div>
  //             <div className="flex items-center gap-2">
  //               {item?.attachments?.length ? (
  //                 <AttachIcon style={{ fontSize: 20 }} />
  //               ) : (
  //                 <></>
  //               )}

  //               <span>{item.time}</span>
  //               <MDButton
  //                 onClick={(e) => {
  //                   handleForward(e, item);
  //                 }}
  //                 type="text"
  //                 icon={
  //                   <Tooltip title="Forward">
  //                     <span className="translate-y-[3px]">
  //                       <ForwardIcon fontSize={14} />
  //                     </span>
  //                   </Tooltip>
  //                 }
  //               ></MDButton>
  //             </div>
  //           </div>
  //         }
  //         key={item.id}
  //       >
  //         <RowMessage item={item} />
  //       </Collapse.Panel>
  //     ))}
  //   </Collapse>
  // );
};

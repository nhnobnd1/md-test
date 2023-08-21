import { Button, Collapse, Divider, Popover, Tooltip } from "antd";
import { filesize } from "filesize";
import { FC, useMemo, useState } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import ForwardIcon from "~icons/ion/forward";
import UserIcon from "~icons/material-symbols/person";
import AgentIcon from "~icons/material-symbols/support-agent-sharp";
import QuoteIcon from "~icons/octicon/ellipsis-16";

import axios from "axios";
import fileDownload from "js-file-download";
import useForwardTicket from "src/modules/ticket/store/useForwardTicket";
import "./BoxReply.scss";
interface RowMessageProps {
  item: ChatItem;
}

function splitText(fileName: string, maxLength: number) {
  if (fileName.length <= maxLength) {
    return fileName;
  }
  const extension = fileName.substr(fileName.lastIndexOf("."));
  const shortName =
    fileName.substr(0, maxLength - extension.length) + "..." + extension;
  return shortName;
}

const regexContent = /^.*(?=<div class="md_quote">)/s;

export const RowMessageBeta: FC<RowMessageProps> = ({ item }) => {
  const [toggleQuote, setToggleQuote] = useState(true);
  const updateChatItem = useForwardTicket((state) => state.updateChatItem);

  const sortChat = useMemo(() => {
    if (item.chat.match(regexContent)) {
      return item.chat.match(regexContent)?.[0] as string;
    }
    return item.chat;
  }, [item.chat]);

  const quote = useMemo(() => {
    const startIndex = item.chat.indexOf('<div class="md_quote">');
    if (startIndex !== -1) {
      const remainingHTML = item.chat.slice(startIndex);
      return remainingHTML;
    }
    return "";
  }, [item.chat]);

  const disableQuote = useMemo(() => {
    if (quote === "") {
      return true;
    }
    return false;
  }, [quote]);

  const handleForward = (e: any, item: ChatItem) => {
    e.stopPropagation();
    updateChatItem(item);
  };

  return (
    <div>
      <div className=" items-center gap-3 ">
        <div className="flex items-end gap-3 justify-between items-center">
          <div className="flex gap-2 items-center">
            {item?.incoming ? (
              <UserIcon fontSize={24} />
            ) : (
              <AgentIcon fontSize={24} />
            )}
            <span className="text-bold">{item.name}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span>{item.time}</span>
            <Button
              onClick={(e) => {
                handleForward(e, item);
              }}
              type="text"
              icon={
                <Tooltip title="Forward">
                  <span className="translate-y-[3px]">
                    <ForwardIcon fontSize={14} />
                  </span>
                </Tooltip>
              }
            ></Button>
          </div>
        </div>

        <div className="flex gap-3  mt-2 flex-wrap">
          <span style={{ color: "black", fontSize: 12 }}>
            <span style={{ fontWeight: "bold" }}>To </span>: {item.toEmail}
          </span>
          {item?.ccEmails?.length ? (
            <>
              <span
                style={{ color: "black", fontSize: 12 }}
                className="truncate"
              >
                <span style={{ fontWeight: "bold" }}>CC</span>:{" "}
                {item.ccEmails.map((i, index) =>
                  index === (item?.ccEmails?.length as number) - 1 ? (
                    <span key={i}>{i}</span>
                  ) : (
                    <span key={i}>{i}, </span>
                  )
                )}
              </span>
            </>
          ) : (
            <></>
          )}
          {item?.bccEmails?.length ? (
            <>
              <span
                className="truncate"
                style={{ color: "black", fontSize: 12 }}
              >
                <span style={{ fontWeight: "bold" }}>BCC</span>:{" "}
                {item.bccEmails.map((i, index) =>
                  index === (item?.bccEmails?.length as number) - 1 ? (
                    <span key={i}>{i}</span>
                  ) : (
                    <span key={i}>{i}, </span>
                  )
                )}
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className="text-black text-scroll mt-5 "
        dangerouslySetInnerHTML={{
          __html: `<div style="font-family:Helvetica;font-size:14px"><style>img{max-width:100%}</style>${sortChat}</div>`,
        }}
      />

      {disableQuote ? (
        <></>
      ) : (
        <div className="">
          <Popover content={<>Quote</>} className="mt-2 mb-5">
            <Button
              type="text"
              onClick={() => {
                setToggleQuote(!toggleQuote);
              }}
              style={{ padding: 5, height: 20 }}
              className="flex items-center justify-center bg-slate-600"
            >
              <QuoteIcon color="white" />
            </Button>
          </Popover>
        </div>
      )}

      {toggleQuote ? (
        <></>
      ) : (
        <div>
          <div
            className="text-black mb-2 text-scroll mt-3"
            dangerouslySetInnerHTML={{
              __html: `<div style="font-family:Helvetica;font-size:14px">${quote}</div>`,
            }}
          />
        </div>
      )}

      {item.attachments?.length ? (
        <Collapse>
          <Collapse.Panel
            header={`${item.attachments?.length} file${
              item.attachments?.length > 1 ? "s" : ""
            } attached`}
            key={1}
          >
            <div className="flex flex-wrap gap-5  box-file mt-2 ">
              {item.attachments?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-center mt-1 mb-2 box-img rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: `url(${item.thumbUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: 150,
                    width: 150,
                    backgroundSize: "cover",
                  }}
                >
                  <div className="flex justify-center items-start gap-2 ">
                    <Popover title={item.name}>
                      <div
                        onClick={async () => {
                          const response = await axios.get(item.attachmentUrl, {
                            responseType: "blob",
                          });
                          fileDownload(response.data, item.name);
                        }}
                        className="flex flex-col h-[150px] file-item relative justify-between"
                      >
                        <div
                          className={`${
                            item.thumbUrl ? "hidden" : "block"
                          } px-3 pt-3`}
                        >
                          <span> {splitText(item.name, 25)}</span>
                          <p className="mt-2">
                            {" "}
                            {filesize(item.size, {
                              base: 2,
                              standard: "jedec",
                            })}
                          </p>
                        </div>
                        <div className="fake absolute h-[150px] w-[150px]"></div>
                        <span
                          className={`file-name ${
                            item.thumbUrl ? "block" : "hidden"
                          }`}
                        >
                          {splitText(item.name, 25)}
                        </span>

                        <span
                          className={` text-xs text-left inline-block file-size  ${
                            item.thumbUrl ? "block" : "opacity-0"
                          }`}
                        >
                          {filesize(item.size, { base: 2, standard: "jedec" })}
                        </span>
                      </div>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          </Collapse.Panel>
        </Collapse>
      ) : (
        <></>
      )}
      <Divider />
    </div>
  );
};

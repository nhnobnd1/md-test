import { Avatar, Button, Popover } from "antd";
import axios from "axios";
import { filesize } from "filesize";
import fileDownload from "js-file-download";
import { FC, useMemo, useState } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import DownLoadIcon from "~icons/ic/round-file-download";
import UserIcon from "~icons/material-symbols/person";
import AgentIcon from "~icons/material-symbols/support-agent-sharp";
import QuoteIcon from "~icons/octicon/ellipsis-16";

import "./BoxReply.scss";
interface RowMessageProps {
  item: ChatItem;
}
const regexLtr = /<div dir="ltr".*?<\/div><br>/s;
const regexQuote = /<div class="gmail_quote">[\s\S]*?<\/blockquote>/;
export const RowMessage: FC<RowMessageProps> = ({ item }) => {
  const [toggleQuote, setToggleQuote] = useState(true);
  const sortChat = useMemo(() => {
    if (item.chat.match(regexLtr)) {
      return item.chat.match(regexLtr)?.[0] as string;
    }
    return item.chat;
  }, [item.chat]);
  const quote = useMemo(() => {
    if (item.chat.match(regexQuote)) {
      return item.chat.match(regexQuote)?.[0] as string;
    }
    return "";
  }, [item.chat]);
  const disableQuote = useMemo(() => {
    if (
      (item.attachments?.length === 0 || item.attachments === undefined) &&
      quote === ""
    ) {
      return true;
    }
    return false;
  }, [item.attachments?.length, quote]);
  return (
    <div className="">
      <div className=" items-center gap-3">
        <div className="flex items-end gap-3 mb-1">
          <h2 style={{ color: "black", margin: 0 }}>{item.name}</h2>
          {item?.incoming ? (
            <UserIcon fontSize={24} />
          ) : (
            <AgentIcon fontSize={24} />
          )}
          <span style={{ color: "black" }}>
            {item.typeChat ? item.typeChat : "replied"}
          </span>
        </div>
        <div className="flex gap-3 justify-between">
          <span className="text-xs">{item.time}</span>
        </div>
        <div className="flex gap-3 justify-between mt-2">
          <span style={{ color: "black", fontSize: 12 }}>
            To: {item.toEmail}
          </span>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: sortChat,
        }}
        className="text-black mb-2 text-scroll mt-5"
      ></div>
      {disableQuote ? (
        <></>
      ) : (
        <Popover content={<>Quote</>}>
          <Button
            onClick={() => {
              setToggleQuote(!toggleQuote);
            }}
            style={{ padding: 5, height: 20 }}
            className="flex items-center justify-center bg-slate-600"
          >
            <QuoteIcon color="white" />
          </Button>
        </Popover>
      )}
      {toggleQuote ? (
        <></>
      ) : (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: quote,
            }}
            className="text-black mb-2 text-scroll mt-3"
          ></div>
          <div className="flex gap-5 overflow-scroll box-file">
            {item.attachments?.map((item) => (
              <div
                onClick={async () => {
                  const response = await axios.get(item.attachmentUrl, {
                    responseType: "blob",
                  });
                  fileDownload(response.data, item.name);
                }}
                key={item._id}
                className="flex items-center justify-center mt-1 box-img"
              >
                <div className="download-button flex flex-col justify-center items-center">
                  <DownLoadIcon fontSize={40} />
                  <span>
                    {filesize(item.size, { base: 2, standard: "jedec" })}
                  </span>
                </div>
                {item.thumbUrl ? (
                  <img
                    style={{
                      // width: "100%",
                      borderRadius: 20,
                      objectFit: "contain",
                      height: 100,
                      width: 100,
                    }}
                    src={item.thumbUrl}
                    alt={`file-${item.name}`}
                    className="img-file"
                  />
                ) : (
                  <Avatar
                    className="img-file"
                    style={{
                      // width: "100%",
                      borderRadius: 20,
                      objectFit: "contain",
                      height: 100,
                      width: 100,
                    }}
                  ></Avatar>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

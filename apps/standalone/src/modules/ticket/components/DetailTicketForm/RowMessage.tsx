import { Avatar, Button, Popover } from "antd";
import axios from "axios";
import { filesize } from "filesize";
import fileDownload from "js-file-download";
import { FC, useMemo, useState } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import DownLoadIcon from "~icons/ic/round-file-download";
import QuoteIcon from "~icons/octicon/ellipsis-16";

import "./BoxReply.scss";
interface RowMessageProps {
  item: ChatItem;
}
const regexQuote = /<div dir="ltr".*?<\/div><br>/s;
export const RowMessage: FC<RowMessageProps> = ({ item }) => {
  const [toggleQuote, setToggleQuote] = useState(true);
  const qoute = useMemo(() => {
    if (item.chat.match(regexQuote)) {
      return item.chat.match(regexQuote)?.[0] as string;
    }
    return item.chat;
  }, [item.chat]);
  return (
    <div>
      <div className=" items-center gap-3">
        <div className="flex justify-between">
          <h2 style={{ color: "black" }}>{item.name}</h2>
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
        </div>
        <div className="flex gap-3 justify-between">
          <span className="text-xs">{item.email}</span>
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: toggleQuote ? qoute : item.chat,
        }}
        className="text-black mb-2 text-scroll mt-3"
      ></div>
      <div className="text-black flex justify-end font-bold items-center">
        {item.time}
      </div>
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
            className="flex items-center justify-center mt-10 box-img"
          >
            <div className="download-button flex flex-col justify-center items-center">
              <DownLoadIcon fontSize={40} />
              <span>{filesize(item.size, { base: 2, standard: "jedec" })}</span>
            </div>
            {item.thumbUrl ? (
              <img
                style={{
                  // width: "100%",
                  borderRadius: 20,
                  objectFit: "contain",
                  height: 150,
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
                  height: 150,
                  width: 150,
                }}
              ></Avatar>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

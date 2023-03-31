import { Button, Popover } from "antd";
import axios from "axios";
import { filesize } from "filesize";
import parse, { Element } from "html-react-parser";
import fileDownload from "js-file-download";
import { FC, useMemo, useState } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import ImageZoom from "src/modules/ticket/components/DetailTicketForm/ImageZoom";
import DownLoadIcon from "~icons/ic/round-file-download";
import UserIcon from "~icons/material-symbols/person";
import AgentIcon from "~icons/material-symbols/support-agent-sharp";
import QuoteIcon from "~icons/octicon/ellipsis-16";
import "./BoxReply.scss";
interface RowMessageProps {
  item: ChatItem;
}
// regex gmail
// const regexLtr = /<div dir="ltr".*?<\/div><br>/s;
const regexQuote = /<div class="md_quote">[\s\S]*?<\/blockquote>/;
// regex apple mail
// const regexLtr2 =
//   /line-break: after-white-space;">(.*?)<blockquote type="cite">/;
const regexContent = /^.*(?=<div class="md_quote">)/s;

const parseHtml = (html: string): React.ReactNode => {
  const options: any = {
    replace: (domNode: Element): React.ReactNode => {
      if (domNode.name === "img") {
        return (
          <ImageZoom
            key={domNode.attribs.src}
            src={domNode.attribs.src}
            alt={domNode.attribs.alt}
          />
        );
      }
      return undefined; // Return undefined if we don't want to replace the node
    },
  };
  return parse(html, options);
};

export const RowMessage: FC<RowMessageProps> = ({ item }) => {
  const [toggleQuote, setToggleQuote] = useState(true);
  const sortChat = useMemo(() => {
    // if (item.chat.match(regexLtr2)) {
    //   return parseHtml(item.chat.match(regexLtr2)?.[1] as string);
    // }
    if (item.chat.match(regexContent)) {
      return parseHtml(item.chat.match(regexContent)?.[0] as string);
    }
    return parseHtml(item.chat);
  }, [item.chat]);
  const quote = useMemo(() => {
    if (item.chat.match(regexQuote)) {
      return parseHtml(item.chat.match(regexQuote)?.[0] as string);
    }

    return "";
  }, [item.chat]);
  const disableQuote = useMemo(() => {
    if (quote === "") {
      return true;
    }
    return false;
  }, [quote]);
  return (
    <div className="">
      <div className=" items-center gap-3">
        <div className="flex items-end gap-3 ">
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
        <div className="flex gap-3 justify-between mt-2">
          <span style={{ color: "black", fontSize: 12 }}>
            From: {item.email}
          </span>
        </div>
        <div className="flex gap-3 justify-between mt-2">
          <span className="text-xs">{item.time}</span>
        </div>
        <div className="flex gap-3 justify-between mt-2">
          <span style={{ color: "black", fontSize: 12 }}>
            To: {item.toEmail}
          </span>
        </div>
      </div>
      <div className="text-black mb-2 text-scroll mt-5">{sortChat}</div>
      <div className="flex gap-5 overflow-scroll box-file mt-2">
        {item.attachments?.map((item) => (
          <div
            onClick={async () => {
              const response = await axios.get(item.attachmentUrl, {
                responseType: "blob",
              });
              fileDownload(response.data, item.name);
            }}
            key={item._id}
            className="flex items-center justify-center mt-1 mb-2 box-img"
          >
            <div className="flex justify-center items-start ">
              <Popover title={item.name}>
                <div className="flex flex-col">
                  <span className="file-name">{item.name}</span>

                  <span className=" text-xs text-left inline-block">
                    {filesize(item.size, { base: 2, standard: "jedec" })}
                  </span>
                </div>
              </Popover>
              <DownLoadIcon fontSize={32} />
            </div>
          </div>
        ))}
      </div>
      {disableQuote ? (
        <></>
      ) : (
        <Popover content={<>Quote</>}>
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
      )}

      {toggleQuote ? (
        <></>
      ) : (
        <div>
          <div className="text-black mb-2 text-scroll mt-3">{quote}</div>
        </div>
      )}
    </div>
  );
};

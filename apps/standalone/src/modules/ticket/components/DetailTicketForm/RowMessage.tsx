import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button, Collapse, Popover } from "antd";
import { filesize } from "filesize";
import parse, { Element } from "html-react-parser";
import { FC, useMemo, useState } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import ImageZoom from "src/modules/ticket/components/DetailTicketForm/ImageZoom";
import UserIcon from "~icons/material-symbols/person";
import AgentIcon from "~icons/material-symbols/support-agent-sharp";
import QuoteIcon from "~icons/octicon/ellipsis-16";

import axios from "axios";
import fileDownload from "js-file-download";
import "./BoxReply.scss";
interface RowMessageProps {
  item: ChatItem;
}

const regexQuote = /<div class="md_quote">[\s\S]*?<\/blockquote>/;

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
      <div className="text-black text-scroll mt-5">{sortChat}</div>
      {disableQuote ? (
        <></>
      ) : (
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
      )}

      {toggleQuote ? (
        <></>
      ) : (
        <div>
          <div className="text-black mb-2 text-scroll mt-3">{quote}</div>
        </div>
      )}

      {item.attachments?.length ? (
        <Collapse>
          <Collapse.Panel
            header={`${item.attachments?.length} files attached`}
            key={1}
          >
            <div className="flex gap-5 overflow-scroll box-file mt-2 ">
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
                      <div className="flex flex-col h-[150px] file-item relative justify-between">
                        <div className="fake absolute h-[150px] w-[150px]"></div>
                        <span className="file-name">{item.name}</span>

                        <span className=" text-xs text-left inline-block file-size">
                          {filesize(item.size, { base: 2, standard: "jedec" })}
                        </span>
                        <div className="justify-center items-center file-download mb-2">
                          <Button
                            onClick={async () => {
                              const response = await axios.get(
                                item.attachmentUrl,
                                {
                                  responseType: "blob",
                                }
                              );
                              fileDownload(response.data, item.name);
                            }}
                            icon={<CloudDownloadOutlined />}
                          ></Button>
                        </div>
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
    </div>
  );
};

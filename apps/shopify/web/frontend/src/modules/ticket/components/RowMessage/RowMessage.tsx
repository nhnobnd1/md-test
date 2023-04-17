import {
  Button,
  Collapsible,
  Divider,
  Text,
  TextContainer,
  Tooltip,
} from "@shopify/polaris";
import axios from "axios";
import { filesize } from "filesize";
import parse, { Element } from "html-react-parser";
import fileDownload from "js-file-download";
import { FC, useCallback, useMemo, useState } from "react";
import ImageZoom from "src/components/TextEditorTicket/ImageZoom";
import { ChatItem } from "src/modules/ticket/pages/DetailTicket";
import CollapseIcon from "~icons/material-symbols/arrow-right";
import DownloadIcon from "~icons/material-symbols/cloud-download-outline-rounded";
import UserIcon from "~icons/material-symbols/person";
import AgentIcon from "~icons/material-symbols/support-agent-sharp";
import QuoteIcon from "~icons/octicon/ellipsis-16";
import "./RowMessage.scss";
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

  const [open, setOpen] = useState(false);

  function shortenFilename(text: string, length: number) {
    if (text.length <= length) {
      return text;
    } else {
      const [filename, extension] = text.split(".");
      return `${filename.slice(0, length)}...${extension}`;
    }
  }

  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  return (
    <div className="">
      <div className=" items-center gap-3">
        <div className="flex items-end gap-3 ">
          <Text variant="headingXl" as="h4">
            {item.name}
          </Text>
          {item?.incoming ? (
            <UserIcon fontSize={20} />
          ) : (
            <AgentIcon fontSize={20} />
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
          <span className="text-xs text-stone-500">{item.time}</span>
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
        <Tooltip content="Quote" preferredPosition="above">
          <Button
            plain
            onClick={() => {
              setToggleQuote(!toggleQuote);
            }}
            icon={<QuoteIcon style={{ color: "black", fontSize: 20 }} />}
          ></Button>
        </Tooltip>
      )}

      {toggleQuote ? (
        <></>
      ) : (
        <div>
          <div className="text-black mb-2 text-scroll mt-3">{quote}</div>
        </div>
      )}

      {item.attachments?.length ? (
        <div>
          <Button
            onClick={handleToggle}
            ariaExpanded={open}
            ariaControls="basic-collapsible"
            fullWidth
            textAlign="left"
            icon={<CollapseIcon />}
            size="medium"
          >
            {`${item.attachments?.length} files attached`}
          </Button>
          <Collapsible
            open={open}
            id="basic-collapsible"
            transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
            expandOnPrint
          >
            <TextContainer>
              {item.attachments?.length ? (
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
                        <div className="flex flex-col h-[150px] file-item relative justify-between">
                          <div className="fake absolute h-[150px] w-[150px]"></div>
                          <span className="file-name break-words">
                            {shortenFilename(item.name, 20)}
                          </span>

                          <span className=" text-xs text-left inline-block file-size ">
                            {filesize(item.size, {
                              base: 2,
                              standard: "jedec",
                            })}
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
                              icon={<DownloadIcon style={{ fontSize: 16 }} />}
                            ></Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </TextContainer>
          </Collapsible>
        </div>
      ) : (
        <></>
      )}
      <div className="mb-3 mt-3">
        <Divider />
      </div>
    </div>
  );
};

import {
  Button,
  Collapsible,
  Divider,
  TextContainer,
  Tooltip,
} from "@shopify/polaris";
import axios from "axios";
import { filesize } from "filesize";
import parse, { Element } from "html-react-parser";
import fileDownload from "js-file-download";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import ImageZoom from "src/components/TextEditorTicket/ImageZoom";
import useHtmlStringHeight from "src/hooks/useHtmlStringHeight";
import { ChatItem } from "src/modules/ticket/pages/DetailTicket";
import CollapseIcon from "~icons/material-symbols/arrow-right";
import UserIcon from "~icons/material-symbols/person";
import AgentIcon from "~icons/material-symbols/support-agent-sharp";
import QuoteIcon from "~icons/octicon/ellipsis-16";
import "./RowMessage.scss";
interface RowMessageProps {
  item: ChatItem;
}
const regexQuote = /<div class="md_quote">[\s\S]*?<\/blockquote>/;

const regexContent = /^.*(?=<div class="md_quote">)/s;
// const isMobile = true;
function splitText(fileName: string, maxLength: number) {
  if (fileName.length <= maxLength) {
    return fileName;
  }
  const extension = fileName.substr(fileName.lastIndexOf("."));
  const shortName =
    fileName.substr(0, maxLength - extension.length) + "..." + extension;
  return shortName;
}

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
  const iframeRef = useRef<any>(null);
  const iframeRefQuote = useRef<any>(null);

  const sortChat = useMemo(() => {
    if (item.chat.match(regexContent)) {
      return item.chat.match(regexContent)?.[0] as string;
    }
    return item.chat;
  }, [item.chat]);
  const heightSortChat = useHtmlStringHeight(sortChat);
  const quote = useMemo(() => {
    if (item.chat.match(regexQuote)) {
      return item.chat.match(regexQuote)?.[0] as string;
    }

    return "";
  }, [item.chat]);
  const heightQuote = useHtmlStringHeight(quote);

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

  useEffect(() => {
    if (isMobile) return;

    const objectElement = iframeRef.current;
    objectElement.style.height = `${heightSortChat}px`;
  }, [sortChat, heightSortChat, isMobile]);
  useEffect(() => {
    if (isMobile) return;
    if (!toggleQuote) {
      const objectElement = iframeRefQuote.current;

      objectElement.style.height = `${heightQuote}px`;
    }
  }, [quote, heightQuote, toggleQuote, isMobile]);
  return (
    <div className="">
      <div className=" items-center gap-3 mx-2">
        <div className="flex items-end gap-3 ">
          {/* <Text variant="headingXl" as="h4">
            {item.name}
          </Text> */}
          {item?.incoming ? (
            <UserIcon fontSize={20} />
          ) : (
            <AgentIcon fontSize={20} />
          )}
          <span style={{ color: "black" }}>
            {item.typeChat ? item.typeChat : "replied"}
          </span>
        </div>
        {/* <div className="flex gap-3 justify-between mt-2">
          <span style={{ color: "black", fontSize: 12 }}>
            From: {item.email}
          </span>
        </div> */}
        {/* <div className="flex gap-3 justify-between mt-2">
          <span className="text-xs text-stone-500">{item.time}</span>
        </div> */}
        <div className="flex gap-3 flex-wrap mt-2">
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
      {isMobile ? (
        <div
          className="text-black text-scroll mt-5"
          dangerouslySetInnerHTML={{ __html: sortChat }}
        />
      ) : (
        <div ref={iframeRef}>
          <object
            className="w-full h-full border-none mt-5"
            data={`data:text/html;charset=utf-8,${encodeURIComponent(
              `<div style="font-family:Helvetica;font-size:14px"><style>
            ::-webkit-scrollbar {
  width: 16px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #FA7D00;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color:#FF9326;
}

            </style>${sortChat}</div>`
            )}`}
            type="text/html"
          ></object>
        </div>
      )}

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
          {isMobile ? (
            <div
              className="text-black mb-2 text-scroll mt-3"
              dangerouslySetInnerHTML={{ __html: quote }}
            />
          ) : (
            <div ref={iframeRefQuote}>
              <object
                className="w-full h-full border-none mt-5"
                data={`data:text/html;charset=utf-8,${encodeURIComponent(
                  `<div style="font-family:Helvetica;font-size:14px">${quote}</div>`
                )}`}
                type="text/html"
              ></object>
            </div>
          )}
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
            {`${item.attachments?.length} file${
              item.attachments?.length > 1 ? "s" : ""
            } attached`}
          </Button>
          <Collapsible
            open={open}
            id="basic-collapsible"
            transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
            expandOnPrint
          >
            <TextContainer>
              {item.attachments?.length ? (
                <div className="flex flex-wrap gap-5 overflow-scroll box-file mt-2 ">
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
                        <div
                          className="flex flex-col h-[150px] file-item relative justify-between"
                          onClick={async () => {
                            const response = await axios.get(
                              item.attachmentUrl,
                              {
                                responseType: "blob",
                              }
                            );
                            fileDownload(response.data, item.name);
                          }}
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
                            className={`file-name break-words ${
                              item.thumbUrl ? "block" : "hidden"
                            }`}
                          >
                            {splitText(item.name, 25)}
                          </span>

                          <span
                            className={` text-xs text-left inline-block file-size  ${
                              item.thumbUrl ? "block" : "opacity-0"
                            } `}
                          >
                            {filesize(item.size, {
                              base: 2,
                              standard: "jedec",
                            })}
                          </span>
                          {/* <div className="justify-center items-center file-download mb-2">
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
                          </div> */}
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

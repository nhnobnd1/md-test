import {
  Button,
  Collapsible,
  Divider,
  TextContainer,
  Tooltip,
} from "@shopify/polaris";
import axios from "axios";
import { filesize } from "filesize";
import fileDownload from "js-file-download";
import { FC, useCallback, useMemo, useState } from "react";
import { ChatItem } from "src/modules/ticket/pages/DetailTicket";
import CollapseIcon from "~icons/material-symbols/keyboard-arrow-down-rounded";
import UserIcon from "~icons/material-symbols/person";
import AgentIcon from "~icons/material-symbols/support-agent-sharp";
import QuoteIcon from "~icons/octicon/ellipsis-16";

import "./RowMessage.scss";
interface RowMessageProps {
  item: ChatItem;
}

const regexContent = /^.*(?=<div class="md_quote">)/s;
function splitText(fileName: string, maxLength: number) {
  if (fileName.length <= maxLength) {
    return fileName;
  }
  const extension = fileName.substr(fileName.lastIndexOf("."));
  const shortName =
    fileName.substr(0, maxLength - extension.length) + "..." + extension;
  return shortName;
}

export const RowMessage: FC<RowMessageProps> = ({ item }) => {
  const [toggleQuote, setToggleQuote] = useState(true);

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

  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <div className="">
      <div className=" items-center gap-3 ">
        <div className="flex items-end gap-3 ">
          {item?.incoming ? (
            <UserIcon fontSize={20} />
          ) : (
            <AgentIcon fontSize={20} />
          )}
          <span style={{ color: "black" }}>
            {item.typeChat ? item.typeChat : "replied"}
          </span>
        </div>

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
      <div
        className="text-black text-scroll mt-5 w-full"
        dangerouslySetInnerHTML={{ __html: sortChat }}
      />

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
          <div
            className="text-black mb-2 text-scroll mt-3"
            dangerouslySetInnerHTML={{ __html: quote }}
          />
        </div>
      )}

      {item.attachments?.length ? (
        <div className="mt-5">
          <Button
            onClick={handleToggle}
            ariaExpanded={open}
            ariaControls="basic-collapsible"
            fullWidth
            textAlign="left"
            icon={
              <div
                className={!open ? `-rotate-90 duration-200` : ` duration-200`}
              >
                <CollapseIcon fontSize={20} />
              </div>
            }
            size="large"
          >
            {`${item.attachments?.length} file${
              item.attachments?.length > 1 ? "s" : ""
            } attached`}
          </Button>
          <Collapsible
            open={open}
            id="basic-collapsible"
            transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
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

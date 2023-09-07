import {
  Button,
  Collapsible,
  LegacyCard,
  TextContainer,
  Tooltip,
} from "@shopify/polaris";
import axios from "axios";
import { filesize } from "filesize";
import fileDownload from "js-file-download";
import { FC, useCallback, useMemo, useState } from "react";
import { ChatItem } from "src/modules/ticket/pages/DetailTicket";
import ForwardIcon from "~icons/ion/forward";
import CollapseIcon from "~icons/material-symbols/keyboard-arrow-down-rounded";
import MailIcon from "~icons/material-symbols/mail-outline";
import QuoteIcon from "~icons/octicon/ellipsis-16";

import { useNavigate } from "@moose-desk/core";
import MDAvatar from "src/components/MDAvatar/MDAvatar";
import useForwardTicket from "src/modules/ticket/store/useForwardTicket";
import "./RowMessage.scss";
interface RowMessageProps {
  item: ChatItem;
  type?: any;
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

export const RowMessage: FC<RowMessageProps> = ({ item, type }) => {
  const [toggleQuote, setToggleQuote] = useState(true);
  const navigate = useNavigate();

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
  const updateChatItem = useForwardTicket((state) => state.updateChatItem);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  const handleForward = (item: ChatItem) => {
    updateChatItem(item);
  };

  return (
    <div className="mt-1 mb-2 px-2 row-message min-w-[700px] w-11/12">
      <LegacyCard sectioned>
        <div className=" items-center gap-3 flex justify-between">
          <div
            className={` ${
              item?.customerId ? "hover:cursor-pointer" : ""
            } flex items-center gap-2`}
            onClick={() => {
              item?.customerId &&
                navigate(`/customers/detail?customer=${item?.customerId}`);
            }}
          >
            <MDAvatar source={item.avatar} lastName={item.name} />
            <div className="flex flex-col ">
              <div
                className={`flex gap-2 items-center ${
                  item?.customerId ? "hover:cursor-pointer hover:underline" : ""
                }`}
                onClick={() => {
                  item?.customerId &&
                    navigate(`/customers/detail?customer=${item?.customerId}`);
                }}
              >
                <span className="font-bold truncate max-w-[300px]">
                  {item.name}
                </span>

                <Tooltip
                  width="wide"
                  content={
                    <div className="flex flex-col px-2 ">
                      <div className="flex flex-col">
                        <span style={{ fontSize: 12 }}>
                          <span
                            style={{ color: "#A0A0A0", fontWeight: "bold" }}
                          >
                            From:{" "}
                          </span>
                          {item.name}
                        </span>
                        <span style={{ fontSize: 12 }} className="text-xs">
                          ({item.email})
                        </span>
                      </div>
                      <div>
                        {item.toEmail && (
                          <span style={{ fontSize: 12 }}>
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "#A0A0A0",
                              }}
                            >
                              To
                            </span>
                            : {item.nameTo}
                          </span>
                        )}
                        <div>
                          {" "}
                          <span style={{ fontSize: 12 }} className="text-xs">
                            ({item.toEmail})
                          </span>
                        </div>
                      </div>
                      {item?.ccEmails?.length ? (
                        <>
                          <Tooltip
                            content={item.ccEmails.map((i, index) =>
                              index ===
                              (item?.ccEmails?.length as number) - 1 ? (
                                <span key={i}>{i}</span>
                              ) : (
                                <span key={i}>{i}, </span>
                              )
                            )}
                          >
                            <span
                              style={{
                                fontWeight: "bold",
                                fontSize: 12,
                                color: "#A0A0A0",
                              }}
                            >
                              Cc
                            </span>
                            :{" "}
                            {item.ccEmails.map((i, index) =>
                              index ===
                              (item?.ccEmails?.length as number) - 1 ? (
                                <span key={i}>{i}</span>
                              ) : (
                                <span key={i}>{i}, </span>
                              )
                            )}
                          </Tooltip>
                        </>
                      ) : (
                        <></>
                      )}
                      {item?.bccEmails?.length ? (
                        <>
                          <Tooltip
                            content={item.bccEmails.map((i, index) =>
                              index ===
                              (item?.bccEmails?.length as number) - 1 ? (
                                <span key={i}>{i}</span>
                              ) : (
                                <span key={i}>{i}, </span>
                              )
                            )}
                          >
                            <span
                              style={{
                                fontWeight: "bold",
                                fontSize: 12,
                                color: "#A0A0A0",
                              }}
                            >
                              Bcc
                            </span>
                            :{" "}
                            {item.bccEmails.map((i, index) =>
                              index ===
                              (item?.bccEmails?.length as number) - 1 ? (
                                <span key={i}>{i}</span>
                              ) : (
                                <span key={i}>{i}, </span>
                              )
                            )}
                          </Tooltip>
                        </>
                      ) : (
                        <></>
                      )}
                      <div>
                        {" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: 12,
                            color: "#A0A0A0",
                          }}
                        >
                          Date
                        </span>
                        : <span className="text-xs">{item.datetime}</span>
                      </div>
                      <div>
                        {" "}
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: 12,
                            color: "#A0A0A0",
                          }}
                        >
                          Sent via:
                        </span>
                        : <span className="text-xs">{type}</span>
                      </div>
                    </div>
                  }
                >
                  <div>
                    <MailIcon />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs">{item.time}</span>
            <Button
              plain
              monochrome
              onClick={() => {
                handleForward(item);
              }}
              icon={
                <Tooltip content="Forward">
                  <span className="translate-y-[3px]">
                    <ForwardIcon fontSize={14} />
                  </span>
                </Tooltip>
              }
            ></Button>
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
                  className={
                    !open ? `-rotate-90 duration-200` : ` duration-200`
                  }
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
              transition={{
                duration: "200ms",
                timingFunction: "ease-in-out",
              }}
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
      </LegacyCard>
    </div>
  );
};

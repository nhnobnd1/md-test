import { useNavigate } from "@moose-desk/core";
import { Button, Card, Collapse, Divider, Popover, Tooltip } from "antd";
import { filesize } from "filesize";
import { FC, useMemo, useState } from "react";
import { ChatItem } from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";
import ForwardIcon from "~icons/ion/forward";
import QuoteIcon from "~icons/octicon/ellipsis-16";

import axios from "axios";
import fileDownload from "js-file-download";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import useForwardTicket from "src/modules/ticket/store/useForwardTicket";
import "./BoxReplyBeta.scss";
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

  const handleForward = (e: any, item: ChatItem) => {
    e.stopPropagation();
    updateChatItem(item);
  };

  return (
    <Card className="w-[800px] mb-3">
      <div className=" items-center gap-3 ">
        <div className="flex items-end gap-3 justify-between items-center  ">
          <div
            onClick={() => {
              item?.customerId &&
                navigate(`/customers/detail?customer=${item?.customerId}`);
            }}
            className={`flex gap-2 items-center flex-wrap max-w-[500] ${
              item?.customerId ? "hover:cursor-pointer" : ""
            }`}
          >
            <MDAvatar source={item.avatar} lastName={item.name} />
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <span className="text-bold truncate max-w-[300px]">
                  {item.name}
                </span>
                <span className="text-xs truncate max-w-[300px]">
                  ({item.email})
                </span>
              </div>
              {item.toEmail && (
                <span style={{ color: "black", fontSize: 12 }}>
                  <span style={{ fontWeight: "bold" }}>To </span>:{" "}
                  {item.toEmail}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs">{item.time}</span>
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

        <div className="flex  ml-12 flex-wrap flex-col">
          {item?.ccEmails?.length ? (
            <>
              <Tooltip
                title={item.ccEmails.map((i, index) =>
                  index === (item?.ccEmails?.length as number) - 1 ? (
                    <span key={i}>{i}</span>
                  ) : (
                    <span key={i}>{i}, </span>
                  )
                )}
                style={{ color: "black", fontSize: 12 }}
                className="truncate w-full"
              >
                <span style={{ fontWeight: "bold", fontSize: 12 }}>Cc</span>:{" "}
                {item.ccEmails.map((i, index) =>
                  index === (item?.ccEmails?.length as number) - 1 ? (
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
                title={item.bccEmails.map((i, index) =>
                  index === (item?.bccEmails?.length as number) - 1 ? (
                    <span key={i}>{i}</span>
                  ) : (
                    <span key={i}>{i}, </span>
                  )
                )}
                className="truncate w-full"
                style={{ color: "black", fontSize: 12 }}
              >
                <span style={{ fontWeight: "bold", fontSize: 12 }}>Bcc</span>:{" "}
                {item.bccEmails.map((i, index) =>
                  index === (item?.bccEmails?.length as number) - 1 ? (
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
        </div>
      </div>
      <Divider className="m-0 my-2" />
      <div
        className="text-black text-scroll "
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
    </Card>
  );
};

import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useJob, useLoading, useLocation, useToggle } from "@moose-desk/core";
import { TicketRepository, UploadFileResponse } from "@moose-desk/repo";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { Button, FormInstance, Modal, Popover } from "antd";
import { filesize } from "filesize";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { catchError, map, of } from "rxjs";
import { postImageApi } from "src/components/UI/Editor/api";
import useMessage from "src/hooks/useMessage";
import ImageZoom from "src/modules/ticket/components/DetailTicketForm/ImageZoom";
import "./editor.scss";

interface TextEditorProps extends Omit<IAllProps, "onChange" | "value"> {
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  form?: FormInstance<any>;
  setIsChanged?: any;
  setFiles?: any;
  setLoadingButton?: any;
  files?: any;
}

const TextEditorTicket = ({
  value,
  onChange,
  form,
  files,
  setIsChanged,
  setFiles,
  setLoadingButton,
  ...props
}: TextEditorProps) => {
  const editorRef = useRef<Editor["editor"] | null>(null);
  const [isShowFile, setIsShowFile] = useState(false);
  const [idAttachments, setIdAttachments] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  const { state: loading, startLoading, stopLoading } = useLoading();
  const initEditor = useCallback((evt, editor: Editor["editor"]) => {
    editorRef.current = editor;
  }, []);
  const { state: modal, on: openModal, off: closeModal } = useToggle();

  const message = useMessage();

  const handleEditorChange = (content: string) => {
    onChange && onChange(content);

    form?.setFieldValue("content", content);

    if (setIsChanged) {
      setIsChanged(content);
    }
  };
  const { t } = useTranslation();
  const [myFiles, setMyFiles] = useState<any>([]);
  const location = useLocation();

  const [errorText, setErrorText] = useState("");

  const uploadInsert = useMutation({
    mutationFn: (data: any) => postImageApi(data),
    onSuccess: (data: UploadFileResponse) => {
      message.success(t("messages:success.file_upload"));

      editorRef.current?.insertContent(
        '<img width="200px" src="' + data.data.urls[0] + '" />'
      );
    },
    onError: () => {
      message.error(t("messages:error.file_upload"));
    },
    onSettled: () => {
      stopLoading();
    },
  });

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      const totalArray = [...myFiles, ...acceptedFiles];
      if (rejectedFiles.length > 0 || totalArray.length > 3) {
        setErrorText(
          "Only maximum of 3 files with each file size <50MB are allowed to be uploaded"
        );

        return;
      }
      setErrorText("");
      setMyFiles(totalArray);
      postAttachmentApi(acceptedFiles);
      closeModal();
      setIsShowFile(true);
    },
    [myFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 3,
    maxSize: 50 * 1024 * 1024,

    accept: {
      "application/pdf": [],
      "application/vnd.ms-excel": [],
      "application/msword": [],
      "text/plain": [],
      "text/csv": [],
      "video/mp4": [],
      "video/avi": [],
      "video/mpeg": [],
      "image/png": [],
      "image/jpeg": [],
      "image/gif": [],
      "application/zip": [],
      "application/x-tar": [],
    },
  });
  const { run: postAttachmentApi } = useJob((dataSubmit: any) => {
    setLoadingButton(true);
    startLoading();
    return TicketRepository()
      .postAttachment(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setLoadingButton(false);
            stopLoading();

            setIdAttachments((previousAttachs) => {
              return [...previousAttachs, ...data.data.ids];
            });
            message.success(t("messages:success.file_upload"));
          }
        }),
        catchError((err) => {
          setLoadingButton(false);
          stopLoading();

          message.error(t("messages:error.file_upload"));

          return of(err);
        })
      );
  });

  const { run: postImage } = useJob((dataSubmit: any, callback = () => {}) => {
    setLoadingButton(true);
    startLoading();
    return TicketRepository()
      .postAttachment(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setLoadingButton(false);
            stopLoading();
            callback(data.data);
            message.success(t("messages:success.file_upload"));
          }
        }),
        catchError((err) => {
          setLoadingButton(false);
          stopLoading();

          message.error(t("messages:error.file_upload"));

          return of(err);
        })
      );
  });
  const removeFile = (file: any, index: number) => () => {
    const newFiles = [...myFiles];
    const newIdAttachments = [...idAttachments];
    newFiles.splice(newFiles.indexOf(file), 1);

    newIdAttachments.splice(index, 1);
    setMyFiles(newFiles);
    setIdAttachments(newIdAttachments);
  };

  const ListFileRow = useMemo(() => {
    return (
      <div className="flex flex-wrap justify-start flex-row items-center gap-2">
        {myFiles.map((item: any, index: number) => {
          return (
            <div className="item-file flex gap-3" key={item.path}>
              <Popover title={item.path}>
                <div style={{ flexGrow: 1, width: 0 }}>
                  <p style={{ wordBreak: "break-all" }} className="truncate">
                    {item.path}
                  </p>
                  <p style={{ wordBreak: "break-all" }} className="truncate">
                    {filesize(item.size, { base: 2, standard: "jedec" })}
                  </p>
                </div>
              </Popover>
              {item.type.startsWith("image/") ? (
                <ImageZoom
                  style={{ height: 75, borderRadius: 10 }}
                  src={URL.createObjectURL(item)}
                  alt={item.name}
                />
              ) : (
                <></>
              )}
              {/* <div style={{ marginLeft: 10 }}> */}

              <Button
                disabled={loading}
                style={{ width: 50 }}
                onClick={removeFile(item, index)}
              >
                <DeleteOutlined />
              </Button>
              {/* </div> */}
            </div>
          );
        })}
      </div>
    );
  }, [myFiles, idAttachments, loading]);
  const handleCancel = () => {
    closeModal();
    setErrorText("");
  };

  useEffect(() => {
    setFiles(idAttachments);
  }, [idAttachments.length]);
  useEffect(() => {
    if (!files?.length) {
      setMyFiles([]);
    }
  }, [files]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (form?.getFieldValue("content")) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location, form]);

  return (
    <div>
      <Modal
        open={modal}
        onCancel={handleCancel}
        centered
        cancelText="Cancel"
        okText="Upload"
        footer={[]}
        zIndex={999999}
      >
        <div>
          <section className="flex justify-center ">
            <div
              {...getRootProps({
                className:
                  "flex flex-col items-center justify-center h-[200px] w-[400px] dropzone hover:cursor-pointer",
              })}
            >
              <CloudUploadOutlined style={{ fontSize: 50 }} />
              <input {...(getInputProps() as any)} />
              {/* <p className="text">Upload files (max 3)</p> */}
              <span>Drag & Drop or Click to add your file(s)</span>
            </div>
          </section>
          <div style={{ textAlign: "center" }} className="flex justify-center">
            <span
              style={{
                color: "red",
                width: 400,
                display: "block",
              }}
            >
              {errorText}
            </span>
          </div>

          <div className="mt-10  flex justify-center items-center">
            <p className="w-[400px] text-center">
              You can add Images & Video with each file size under 50MB
            </p>
          </div>
        </div>
      </Modal>

      <div id="my-editor">
        <Editor
          apiKey="t4mxpsmop8giuev4szkrl7etgn43rtilju95m2tnst9m9uod"
          {...props}
          onInit={initEditor}
          onEditorChange={handleEditorChange}
          value={value}
          init={{
            height: 400,
            branding: false,
            menubar: false,
            toolbar_mode: "sliding",
            fontsize_formats:
              "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px}",
            toolbar:
              "undo redo  bold italic underline align  blocks fontfamily fontsizeinput  importfile image media link code  past blockquote backcolor forecolor indent  lineheight  strikethrough",

            toolbar_sticky: true,
            // object_resizing: false,

            file_picker_types: "image",
            file_picker_callback: function (cb, value, meta) {
              if (meta.filetype === "image") {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.onchange = function () {
                  if (input.files?.length) {
                    const file = input.files[0];
                    postImage(file, (data: any) => {
                      cb(data.urls[0], {
                        title: file.name,
                        alt: file.name,
                        width: "200px",
                      });
                    });
                  }
                };

                input.click();
              }
            },

            setup: (editor) => {
              editor.ui.registry.addButton("importfile", {
                text: "Upload file",
                icon: "upload",
                onAction: () => {
                  openModal();
                },
              });
              editor.on("paste", function (e) {
                const clipboardData = e.clipboardData;
                if (!clipboardData) {
                  return;
                }
                const items = clipboardData.items;
                for (let i = 0; i < items.length; i++) {
                  const item = items[i];
                  const file = item.getAsFile();
                  if (item.kind === "file" && item.type.startsWith("image/")) {
                    e.preventDefault();

                    startLoading();
                    uploadInsert.mutate(file);
                  }
                }
                return e;
              });
            },

            statusbar: false,
            paste_data_images: true,
            ...props.init,
          }}
        ></Editor>
        {isShowFile ? ListFileRow : ""}
      </div>
    </div>
  );
};

export default TextEditorTicket;

import { useJob, useToggle } from "@moose-desk/core";
import { TicketRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  InlineError,
  Modal,
  TextContainer,
  TextProps,
} from "@shopify/polaris";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { filesize } from "filesize";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { QuillEditor } from "src/components/QuillEditor";
import { verifyShopifyAppIos } from "src/utils/localValue";
import DeleteIcon from "~icons/ic/baseline-delete-outline";
import UploadIcon from "~icons/ic/outline-cloud-upload";
import "./editor.scss";
interface RichTextProps extends Omit<IAllProps, "onChange" | "value"> {
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  labelProps?: TextProps;
  formRef?: any;
  setLoadingButton?: any;
  setFiles?: any;
  files?: any;
  setIsChanged?: any;
}

export const TextEditorTicket = ({
  value,
  onChange,
  error,
  labelProps,
  formRef,
  setFiles,
  setIsChanged,
  files,
  setLoadingButton,
  ...props
}: RichTextProps) => {
  const editorRef = useRef<any>(null);
  const [isShowFile, setIsShowFile] = useState(false);
  const { state: modal, on: openModal, off: closeModal } = useToggle();
  const [myFiles, setMyFiles] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [idAttachments, setIdAttachments] = useState<string[]>([]);
  const { show } = useToast();
  const { t, i18n } = useTranslation();

  const [errorText, setErrorText] = useState("");
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
    setLoading(true);
    return TicketRepository()
      .postAttachment(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setLoadingButton(false);
            setLoading(false);

            setIdAttachments((previousAttachs) => {
              return [...previousAttachs, ...data.data.ids];
            });
            show(t("messages:success.file_upload"));

            // message.success("Upload file successfully");
          }
        }),
        catchError((err) => {
          setLoadingButton(false);
          setLoading(false);
          show(t("messages:error.file_upload"));

          return of(err);
        })
      );
  });
  const { run: postImage } = useJob((dataSubmit: any, callback: any) => {
    setLoadingButton(true);
    setLoading(true);
    return TicketRepository()
      .postAttachment(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setLoadingButton(false);
            setLoading(false);
            callback(data.data);
            show(t("messages:success.file_upload"));
          }
        }),
        catchError((err) => {
          setLoadingButton(false);
          setLoading(false);

          show(t("messages:error.file_upload"));

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
      <div className="flex justify-start flex-row items-center gap-2 flex-wrap">
        {myFiles.map((item: any, index: number) => {
          return (
            <div className="item-file" key={item.path}>
              <div style={{ flexGrow: 1, width: 0 }}>
                <p style={{ wordBreak: "break-all" }} className="truncate">
                  {item.path}
                </p>
                <span>
                  {filesize(item.size, { base: 2, standard: "jedec" })}
                </span>
              </div>
              {item.type.startsWith("image/") ? (
                <img
                  style={{ height: 75, borderRadius: 10 }}
                  src={URL.createObjectURL(item)}
                  alt={item.name}
                />
              ) : (
                <></>
              )}
              <div style={{ marginLeft: 10 }}>
                <Button
                  icon={<DeleteIcon />}
                  disabled={loading}
                  onClick={removeFile(item, index)}
                >
                  {/* Delete */}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [myFiles, idAttachments, loading]);

  const initEditor = useCallback((evt, editor) => {
    editorRef.current = editor;
  }, []);

  const handleChange = (content: string) => {
    content = content === "<p><br></p>" ? "" : content;
    formRef.current?.setFieldValue("content", content);
    onChange && onChange(content);
    if (setIsChanged) {
      setIsChanged(content);
    }
  };
  const handleCloseModal = useCallback(() => {
    closeModal();
    setErrorText("");
  }, []);
  useEffect(() => {
    setFiles(idAttachments);
  }, [idAttachments.length]);
  useEffect(() => {
    if (!files?.length) {
      setMyFiles([]);
    }
  }, [files]);
  // useEffect(() => {
  //   onChange && onChange(value);
  // }, [value, onChange]);

  return (
    <div>
      <Modal open={modal} onClose={handleCloseModal} title="Upload file">
        <Modal.Section>
          <TextContainer>
            <section className="flex justify-center ">
              <div
                {...getRootProps({
                  className:
                    "flex flex-col items-center justify-center h-[200px] w-[400px] dropzone hover:cursor-pointer",
                })}
              >
                {/* <CloudUploadOutlined style={{ fontSize: 50 }} /> */}
                <UploadIcon style={{ fontSize: "3em" }} />
                <input {...getInputProps()} />
                {/* <p className="text">Upload files (max 3)</p> */}
                <span>Drag & Drop or Click to add your file(s)</span>
              </div>
            </section>
            <div
              style={{ textAlign: "center" }}
              className="flex justify-center"
            >
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
              <p className="w-[400px] text-center ">
                You can add Images & Video with each file size under 50MB
              </p>
            </div>
          </TextContainer>
        </Modal.Section>
      </Modal>
      <div className="mb-1">
        <span className="mr-1 text-red-500">*</span>
        <span>Message</span>
      </div>
      {verifyShopifyAppIos() ? (
        <div className="pb-10">
          <QuillEditor
            value={value}
            onChange={handleChange}
            openModal={openModal}
          />
        </div>
      ) : (
        <Editor
          apiKey="t4mxpsmop8giuev4szkrl7etgn43rtilju95m2tnst9m9uod"
          {...props}
          onInit={initEditor}
          onEditorChange={handleChange}
          value={value}
          init={{
            height: 400,
            branding: false,
            menubar: false,
            // toolbar_mode: "sliding",
            fontsize_formats:
              "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            toolbar:
              "undo redo  bold italic underline align  blocks fontfamily fontsizeinput  importfile image media link code  past blockquote backcolor forecolor indent lineheight strikethrough",

            toolbar_sticky: true,
            file_picker_types: "image",
            file_picker_callback: function (cb, value, meta) {
              if (meta.filetype === "image") {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.onchange = function () {
                  if (input.files?.length) {
                    const file = input.files[0];
                    show("Loading...");
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
            },
            // init_instance_callback: (ed) => {
            //   ed.on("click", function (e) {
            //     ed.editorCommands.execCommand("fontName", false, "Helvetica");
            //   });
            // },
            statusbar: false,

            paste_data_images: true,
            ...props.init,
          }}
        ></Editor>
      )}

      {isShowFile ? ListFileRow : ""}
      {error ? (
        <div className="mt-1">
          <InlineError message={error} fieldID="myFieldID" />
        </div>
      ) : null}
    </div>
  );
};

export default TextEditorTicket;

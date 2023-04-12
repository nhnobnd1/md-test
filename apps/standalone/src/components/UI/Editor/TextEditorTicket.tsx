import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useJob, useToggle } from "@moose-desk/core";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { Button, FormInstance, Modal, Popover } from "antd";
import { filesize } from "filesize";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { catchError, map, of } from "rxjs";
import ImageZoom from "src/modules/ticket/components/DetailTicketForm/ImageZoom";
import "./editor.scss";

import { TicketRepository } from "@moose-desk/repo";
import useMessage from "src/hooks/useMessage";
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
  error,
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
  const [loading, setLoading] = useState(false);

  const initEditor = useCallback((evt, editor: Editor["editor"]) => {
    editorRef.current = editor;
  }, []);
  const { state: modal, on: openModal, off: closeModal } = useToggle();
  const message = useMessage();

  const handleEditorChange = (content: string, editor: any) => {
    form?.setFieldValue("content", content);

    if (setIsChanged) {
      setIsChanged(content);
    }
  };
  const [myFiles, setMyFiles] = useState<any>([]);

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
            message.success("Upload file successfully");
          }
        }),
        catchError((err) => {
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
      <div className="flex justify-start flex-row items-center gap-2">
        {myFiles.map((item: any, index: number) => {
          return (
            <div className="item-file" key={item.path}>
              <Popover title={item.path}>
                <div style={{ flexGrow: 1, width: 0 }}>
                  <p style={{ wordBreak: "break-all" }} className="truncate">
                    {item.path}
                  </p>
                  <span>
                    {filesize(item.size, { base: 2, standard: "jedec" })}
                  </span>
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
              <div style={{ marginLeft: 10 }}>
                <Button
                  disabled={loading}
                  style={{ width: 75 }}
                  onClick={removeFile(item, index)}
                >
                  <DeleteOutlined />
                </Button>
              </div>
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

  return (
    <div>
      <Modal
        open={modal}
        onCancel={handleCancel}
        centered
        cancelText="Cancel"
        okText="Upload"
        footer={[]}
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
              <input {...getInputProps()} />
              {/* <p className="text">Upload files (max 3)</p> */}
              <span>Drag&drop or Click to add your files</span>
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
            <p className="w-[350px] ">
              We only accept Images, Videos files which size is smaller than
              50MB
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
            //   toolbar_mode: "sliding",
            fontsize_formats:
              "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:12pt }",
            toolbar:
              "undo redo | bold italic underline align | blocks fontfamily fontsize | importfile | link code copy cut past blockquote backcolor forecolor indent newdocument lineheight selectall strikethrough",
            plugins: [
              "advlist lists autolink charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
              "image",
              "link",
              "code",
            ],

            setup: (editor) => {
              editor.ui.registry.addButton("importfile", {
                text: "Upload file",
                icon: "upload",
                onAction: () => {
                  openModal();
                },
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

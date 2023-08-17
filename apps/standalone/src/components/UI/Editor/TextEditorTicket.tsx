import { CloudUploadOutlined } from "@ant-design/icons";
import { useJob, useLoading, useLocation, useToggle } from "@moose-desk/core";
import { TicketRepository, UploadFileResponse } from "@moose-desk/repo";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { FormInstance, Modal, Upload } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { catchError, map, of } from "rxjs";
import { QuillEditor } from "src/components/QuillEditor";
import { postImageApi } from "src/components/UI/Editor/api";
import useMessage from "src/hooks/useMessage";
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

  const { run: postInsertImage } = useJob((dataSubmit: any, callback: any) => {
    setLoadingButton(true);
    startLoading();
    return TicketRepository()
      .postAttachment(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setLoadingButton(false);
            stopLoading();
            callback(data.data.urls[0]);
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
            callback(data.data.urls[0]);
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
  const removeFile = (file: any, index: number) => {
    const newFiles = [...myFiles];
    const newIdAttachments = [...idAttachments];
    newFiles.splice(newFiles.indexOf(file), 1);

    newIdAttachments.splice(index, 1);
    setMyFiles(newFiles);
    setIdAttachments(newIdAttachments);
  };
  const ListFileRow = useMemo(() => {
    return (
      <div className="flex flex-wrap justify-start flex-row items-center gap-2 w-full">
        <Upload
          key={myFiles.length + Date()}
          className="w-full"
          defaultFileList={myFiles.map((item: any, index: number) => ({
            uid: item.path,
            name: item.name,
            url: URL.createObjectURL(item),
            index: index,
            item: item,
          }))}
          onChange={({ file, fileList }: any) => {
            removeFile(file?.item, file?.index);
          }}
        />
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

      <div id="my-editor" className="xs:pb-5 lg:pb-5">
        <QuillEditor
          value={value}
          onChange={handleEditorChange}
          openModal={openModal}
          postInsertImage={postInsertImage}
          postImage={postImage}
          placeholder="Enter your message here..."
          // setLoading={setLoading}
          listFile={ListFileRow}
        />

        {/* {isShowFile ? ListFileRow : ""} */}
      </div>
    </div>
  );
};

export default TextEditorTicket;

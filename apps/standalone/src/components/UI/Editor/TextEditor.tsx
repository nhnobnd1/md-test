import { useJob, useLoading } from "@moose-desk/core";
import { TicketRepository, UploadFileResponse } from "@moose-desk/repo";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { FormInstance } from "antd";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { catchError, map, of } from "rxjs";
import { postImageApi } from "src/components/UI/Editor/api";
import useMessage from "src/hooks/useMessage";

interface TextEditorProps extends Omit<IAllProps, "onChange" | "value"> {
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  form?: FormInstance<any>;
  setIsChanged?: any;
}

const TextEditor = ({
  value,
  form,
  onChange,
  setIsChanged,
  ...props
}: TextEditorProps) => {
  const editorRef = useRef<Editor["editor"] | null>(null);
  const { state: loading, startLoading, stopLoading } = useLoading();
  const message = useMessage();
  const { t } = useTranslation();

  const initEditor = useCallback((evt, editor: Editor["editor"]) => {
    editorRef.current = editor;
  }, []);
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

  const handleEditorChange = (content: string) => {
    onChange && onChange(content);
    form?.setFieldValue("content", content);

    // setContent(content);
    if (setIsChanged) {
      setIsChanged(content);
    }
  };
  const { run: postImage } = useJob((dataSubmit: any, callback = () => {}) => {
    startLoading();
    return TicketRepository()
      .postAttachment(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            stopLoading();
            callback(data.data);
            message.success(t("messages:success.file_upload"));
          }
        }),
        catchError((err) => {
          stopLoading();

          message.error(t("messages:error.file_upload"));

          return of(err);
        })
      );
  });

  return (
    <div>
      <Editor
        // initialValue={value || content}
        apiKey="t4mxpsmop8giuev4szkrl7etgn43rtilju95m2tnst9m9uod"
        {...props}
        onInit={initEditor}
        // onChange={handleChange}
        onEditorChange={handleEditorChange}
        value={value}
        init={{
          height: 200,
          branding: false,
          toolbar_mode: "scrolling",
          fontsize_formats:
            "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px}",
          toolbar:
            "undo redo | bold italic underline align | blocks fontfamily fontsizeinput | link image code past blockquote backcolor forecolor indent lineheight strikethrough",
          plugins: ["image", "link", "code"],
          file_picker_types: "image",
          toolbar_location: "bottom",

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
    </div>
  );
};

export default TextEditor;

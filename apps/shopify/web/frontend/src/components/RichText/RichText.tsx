import { InlineError, Text, TextProps } from "@shopify/polaris";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { useCallback, useRef } from "react";
import "./RichText.scss";
interface RichTextProps extends Omit<IAllProps, "onChange" | "value"> {
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  labelProps?: TextProps;
  formRef?: any;
  setLoadingButton?: any;
  setFiles?: any;
  files?: any;
}

export const RichText = ({
  value,
  onChange,
  error,
  labelProps,
  formRef,
  files,
  setLoadingButton,
  ...props
}: RichTextProps) => {
  const editorRef = useRef<any>(null);

  const initEditor = useCallback((evt, editor) => {
    editorRef.current = editor;
  }, []);

  const handleChange = (content: string) => {
    formRef.current.setFieldValue("content", content);
  };

  return (
    <div>
      {labelProps && (
        <div className="mb-1">
          <Text {...labelProps}></Text>
        </div>
      )}

      <Editor
        apiKey="t4mxpsmop8giuev4szkrl7etgn43rtilju95m2tnst9m9uod"
        {...props}
        onInit={initEditor}
        onEditorChange={handleChange}
        value={value}
        init={{
          height: 400,
          branding: false,
          toolbar_mode: "sliding",
          fontsize_formats:
            "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
          // content_style:
          //   "body { font-family:Helvetica,Arial,sans-serif; font-size:12pt }",
          toolbar:
            "undo redo | bold italic underline align | blocks fontfamily fontsizeinput | link image code past blockquote backcolor forecolor indent  lineheight strikethrough",
          plugins: [
            "advlist lists autolink charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "image",
            "link",
            "code",
          ],
          menubar: false,
          file_picker_types: "image",
          file_picker_callback: function (cb, value, meta) {
            if (meta.filetype === "image") {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = function () {
                if (input.files?.length) {
                  const file = input.files[0];
                  const reader = new FileReader();
                  reader.onload = function (e) {
                    const id = "blobid" + new Date().getTime();
                    const blobCache = editorRef.current?.editorUpload.blobCache;

                    const base64 = reader.result?.toString().split(",")[1];
                    if (base64 && blobCache) {
                      const blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);
                      cb(blobInfo.blobUri(), { title: file.name });
                    }
                  };
                  reader.readAsDataURL(file);
                }
              };

              input.click();
            }
          },
          statusbar: false,
          setup: (editor) => {
            editor.on("init", (ed) => {
              ed.target.editorCommands.execCommand(
                "fontName",
                false,
                "Helvetica"
              );
            });
          },

          paste_data_images: true,
          ...props.init,
        }}
      ></Editor>
      {error ? (
        <div className="mt-1">
          <InlineError message={error} fieldID="myFieldID" />
        </div>
      ) : null}
    </div>
  );
};

export default RichText;

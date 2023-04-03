import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { FormInstance } from "antd";
import { useCallback, useRef } from "react";
interface TextEditorProps extends Omit<IAllProps, "onChange" | "value"> {
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  form?: FormInstance<any>;
  setIsChanged?: any;
}

const TextEditor = ({
  value,
  onChange,
  error,
  form,
  setIsChanged,
  ...props
}: TextEditorProps) => {
  const editorRef = useRef<Editor["editor"] | null>(null);

  const initEditor = useCallback((evt, editor: Editor["editor"]) => {
    editorRef.current = editor;
  }, []);

  const handleChange = useCallback(() => {
    onChange && onChange(editorRef.current?.getContent());
  }, []);

  const handleEditorChange = (content: string, editor: any) => {
    // onChange && onChange(content);
    form?.setFieldValue("content", content);

    // setContent(content);
    if (setIsChanged) {
      setIsChanged(content);
    }
  };

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
          height: 400,
          branding: false,
          toolbar_mode: "sliding",
          fontsize_formats:
            "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:12pt }",
          toolbar:
            "undo redo | bold italic underline align | blocks fontfamily fontsize | link image code copy cut past blockquote backcolor forecolor indent newdocument lineheight selectall strikethrough",
          plugins: [
            "advlist lists autolink charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
            "image",
            "link",
            "code",
          ],
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
          paste_data_images: true,
          ...props.init,
        }}
      ></Editor>
    </div>
  );
};

export default TextEditor;

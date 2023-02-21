import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { useCallback, useRef } from "react";
interface TextEditorProps extends Omit<IAllProps, "onChange" | "value"> {
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
}

const TextEditor = ({ value, onChange, error, ...props }: TextEditorProps) => {
  const editorRef = useRef<Editor["editor"] | null>(null);

  const initEditor = useCallback((evt, editor: Editor["editor"]) => {
    editorRef.current = editor;
  }, []);

  const handleChange = useCallback(() => {
    onChange && onChange(editorRef.current?.getContent());
  }, []);

  return (
    <div>
      {/* <div className="mb-1">
        <Typography.Text {...labelProps}></Typography.Text>
      </div> */}
      <Editor
        // initialValue={value}
        apiKey="t4mxpsmop8giuev4szkrl7etgn43rtilju95m2tnst9m9uod"
        {...props}
        onInit={initEditor}
        onChange={handleChange}
        init={{
          height: 330,
          branding: false,
          toolbar_mode: "sliding",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          toolbar:
            "undo redo | bold italic underline align | blocks fontfamily fontsize | link image code copy cut past blockquote backcolor forecolor indent newdocument lineheight selectall strikethrough",
          ...props.init,
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
                  console.log(file, "file");
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
          paste_data_images: true,
        }}
      ></Editor>
      {/* {error ? (
        <div className="mt-1">
          <InlineError message={error} fieldID="myFieldID" />
        </div>
      ) : null} */}
    </div>
  );
};

export default TextEditor;

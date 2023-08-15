import { useJob } from "@moose-desk/core";
import { TicketRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { FC, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { catchError, map, of } from "rxjs";

interface QuillEditorProps {
  onChange: any;
  placeholder?: string;
  value?: string;
}
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);
export const QuillEditor: FC<QuillEditorProps> = ({
  onChange,
  placeholder,
  value,
}) => {
  const quillRef = useRef<any>();
  const { show } = useToast();
  const { t } = useTranslation();
  const { run: postAttachmentApi } = useJob(
    (dataSubmit: any, callback: any) => {
      return TicketRepository()
        .postAttachment(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show(t("messages:success.file_upload"));
              callback(data.data.urls[0]);
            }
          }),
          catchError((err) => {
            show(t("messages:error.file_upload"), { isError: true });

            return of(err);
          })
        );
    }
  );

  const imageHandler = () => {
    const editor = quillRef.current?.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files && input.files[0];
      postAttachmentApi(file, (link: any) => {
        console.log("wel", editor.getSelection());
        editor.insertEmbed(editor.getSelection(), "image", link);
      });
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  return (
    <ReactQuill
      ref={quillRef}
      style={{ height: 400 }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules}
    />
  );
};

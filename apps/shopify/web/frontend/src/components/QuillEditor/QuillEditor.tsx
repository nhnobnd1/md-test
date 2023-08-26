import { useJob } from "@moose-desk/core";
import { TicketRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { FC, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { catchError, map, of } from "rxjs";

interface QuillEditorProps {
  onChange: any;
  placeholder?: string;
  value?: string;
  openModal?: any;
  setLoading: any;
}

const QuillEditor: FC<QuillEditorProps> = ({
  onChange,
  placeholder,
  value,
  openModal,
  setLoading,
}) => {
  const quillRef = useRef<any>();
  const { show } = useToast();
  const { t } = useTranslation();
  const { run: postAttachmentApi } = useJob(
    (dataSubmit: any, callback: any) => {
      setLoading(true);
      return TicketRepository()
        .postAttachment(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setLoading(false);
              show(t("messages:success.file_upload"));
              callback(data.data.urls[0]);
            }
          }),
          catchError((err) => {
            setLoading(false);
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
        editor.insertEmbed(editor.getSelection(), "image", link);
      });
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          ["blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            "image",
            openModal ? "link" : "",
          ],
        ],
        handlers: {
          image: imageHandler,
          link: () => {
            openModal();
          },
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
export default QuillEditor;

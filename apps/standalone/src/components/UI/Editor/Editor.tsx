import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useCallback } from "react";
import "./Editor.scss";

interface EditorProps {
  value?: any;
  onChange?: (value: any) => void;
}

const Editor = ({ value, onChange, ...props }: EditorProps) => {
  const handleChangeValue = useCallback((event, editor) => {
    onChange && onChange(editor.getData());
  }, []);
  const editorConfig = {
    alignment: {
      options: ["left", "right"],
    },
    toolbar: {
      items: [
        "heading",
        "|",
        "alignment",
        "|",
        "fontfamily",
        "fontsize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "strikethrough",
        "underline",
        "subscript",
        "superscript",
        "|",
        "link",
        "|",
        "numberedList",
        "bulletedList",
        "todoList",
        "|",
        "outdent",
        "indent",
        "|",
        "code",
        "codeBlock",
        "blockQuote",
        "|",
        "insertTable",
        "|",
        "mediaEmbed",
        "|",
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
    },
  };
  return (
    <div className="custom-ckeditor">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={handleChangeValue}
        config={editorConfig}
      />
    </div>
  );
};

export default Editor;

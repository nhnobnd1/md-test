import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { useCallback, useRef } from "react";
import "./RichText.scss";
interface RichTextProps extends Omit<IAllProps, "onChange" | "value"> {
  value?: any;
  onChange?: (value: any) => void;
}

export const RichText = ({ value, onChange, ...props }: RichTextProps) => {
  const editorRef = useRef<any>(null);

  const handleChange = useCallback(() => {
    onChange && onChange(editorRef.current.getContent());
  }, []);

  return (
    <>
      <Editor
        {...props}
        apiKey="t4mxpsmop8giuev4szkrl7etgn43rtilju95m2tnst9m9uod"
        onInit={(evt, editor) => (editorRef.current = editor)}
        onChange={handleChange}
        initialValue={value}
        init={{
          height: 300,
          menubar: true,
          branding: false,

          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar_mode: "sliding",
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          ...props.init,
        }}
      ></Editor>
    </>
  );
};

export default RichText;

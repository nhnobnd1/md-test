import { InlineError, Text, TextProps } from "@shopify/polaris";
import { Editor, IAllProps } from "@tinymce/tinymce-react";
import { useCallback, useRef } from "react";
import "./RichText.scss";
interface RichTextProps extends Omit<IAllProps, "onChange" | "value"> {
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  labelProps: TextProps;
}

export const RichText = ({
  value,
  onChange,
  error,
  labelProps,
  ...props
}: RichTextProps) => {
  const editorRef = useRef<any>(null);

  const initEditor = useCallback((evt, editor) => {
    editorRef.current = editor;
  }, []);

  const handleChange = useCallback(() => {
    onChange && onChange(editorRef.current.getContent());
  }, []);

  return (
    <div>
      <div className="mb-1">
        <Text {...labelProps}></Text>
      </div>
      <Editor
        {...props}
        apiKey="t4mxpsmop8giuev4szkrl7etgn43rtilju95m2tnst9m9uod"
        onInit={initEditor}
        onChange={handleChange}
        initialValue={value}
        init={{
          height: 330,
          menubar: false,
          branding: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar_mode: "sliding",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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

import { useToggle } from "@moose-desk/core";
import { Button } from "antd";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import ImageResize from "quill-image-resize-module-react";
import { FC, useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageIcon from "~icons/material-symbols/photo-camera-back-outline";
import AttachIcon from "~icons/solar/paperclip-2-bold";
import IconText from "~icons/solar/text-bold";
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];
const QuillToolbar = ({ showToolbar }: any) => {
  return (
    <div id="toolbar">
      <span className={showToolbar ? "" : "hidden"}>
        <select className="ql-header" defaultValue="3">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="3">Normal</option>
        </select>
      </span>
      <span className={showToolbar ? "" : "hidden"}>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className={showToolbar ? "" : "hidden"}>
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className={showToolbar ? "" : "hidden"}>
        <button className="ql-blockquote" />
        <button className="ql-link" />
      </span>
      <span className={showToolbar ? "" : "hidden"}>
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
    </div>
  );
};
interface QuillEditorProps {
  onChange: any;
  placeholder?: string;
  value?: string;
  openModal?: any;
  postInsertImage?: any;
  postImage?: any;
}

export const QuillEditor: FC<QuillEditorProps> = ({
  onChange,
  placeholder,
  value,
  openModal,
  postInsertImage,
  postImage,
}) => {
  const quillRef = useRef<any>();
  const { state: showToolbar, toggle } = useToggle(false);

  const imageHandler = () => {
    const editor = quillRef.current?.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files && input.files[0];
      postInsertImage(file, (link: any) => {
        editor.insertEmbed(editor.getSelection().index, "image", link);
      });
    };
  };

  function imageHandlerPaste(imageDataUrl: any, type: any, imageData: any) {
    const editor = quillRef.current?.getEditor();
    const blob = imageData.toBlob();
    const file = imageData.toFile();
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("file", file);
    console.log({ file });
    postImage(file, (data: any) => {
      editor.insertEmbed(editor.getSelection().index, "image", data);
    });
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
      imageDropAndPaste: {
        handler: imageHandlerPaste,
      },
    };
  }, []);

  return (
    <div className="md-text-editor">
      <ReactQuill
        ref={quillRef}
        style={{ height: 200 }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        theme="snow"
      />
      <div className="md-custom-border">
        <Button onClick={toggle} type="text" icon={<IconText />}></Button>
        <Button
          onClick={openModal}
          type="text"
          icon={<AttachIcon fontSize={16} />}
        ></Button>
        <Button
          onClick={imageHandler}
          type="text"
          icon={<ImageIcon fontSize={16} />}
        ></Button>
      </div>
      <QuillToolbar showToolbar={showToolbar} />
    </div>
  );
};

import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import "./ImageZoom.scss";
interface Props {
  src: string;
  alt: string;
}

const ImageZoom: React.FC<Props> = ({ src, alt }) => {
  const [showImage, setShowImage] = useState(false);

  const handleImageClick = () => {
    setShowImage(true);
  };

  const handleCloseClick = () => {
    setShowImage(false);
  };
  const handleDownloadClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    // Tải xuống ảnh ở đây
    const link = document.createElement("a");
    link.href = src;
    link.download = alt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowImage(false);
      }
    };

    if (showImage) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showImage]);

  return (
    <div>
      <img
        className="hover:cursor-pointer rounded-lg object-contain"
        height={200}
        src={src}
        alt={alt}
        onClick={handleImageClick}
      />
      {showImage && (
        <div className="modal" onClick={handleCloseClick}>
          <div className="modal-content">
            <span className="close">×</span>
            <img
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ height: "80vh" }}
              src={src}
              alt={alt}
              className="object-contain"
            />
            <div className="download-button-container">
              <Button
                className="w-[100px]"
                onClick={handleDownloadClick}
                type="default"
                shape="round"
                icon={<CloudDownloadOutlined className="text-xl" />}
                size="large"
              ></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageZoom;

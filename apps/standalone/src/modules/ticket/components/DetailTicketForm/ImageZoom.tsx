import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import fileDownload from "js-file-download";
import "./ImageZoom.scss";
interface Props {
  src: string;
  alt: string;
  style?: any;
}

const ImageZoom: React.FC<Props> = ({ src, alt, style }) => {
  const [showImage, setShowImage] = useState(false);

  const handleImageClick = () => {
    setShowImage(true);
  };

  const handleCloseClick = () => {
    setShowImage(false);
  };
  const handleDownloadClick = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    const response = await axios.get(src, {
      responseType: "blob",
    });
    fileDownload(response.data, alt);
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
        style={style}
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
                icon={<CloudDownloadOutlined className="text-xl mt-1" />}
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

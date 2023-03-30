import React, { useState } from "react";
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

  return (
    <div>
      <img
        className="hover:cursor-pointer rounded-lg"
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageZoom;

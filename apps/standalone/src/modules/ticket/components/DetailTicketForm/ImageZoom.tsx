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
      <img height={200} src={src} alt={alt} onClick={handleImageClick} />
      {showImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseClick}>
              ×
            </span>
            <img style={{ height: "80vh" }} src={src} alt={alt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageZoom;

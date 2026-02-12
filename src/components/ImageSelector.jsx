import React, { useRef, useState } from "react";
import ButtonGroup from "./ButtonGroup";
import LoadImagemodal from "./LoadImagemodal";
import AreaControls from "./AreaControls";

const ImageSelector = () => {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [webUrl, setWebUrl] = useState("");

  const handleSelectFromPC = () => {
    fileInputRef.current.click();
  };

  const handleLoadFromWeb = () => {
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };


  const handleContinue = () => {
    if (!webUrl) return;
    setImageUrl(webUrl);
    setShowModal(false);
    setWebUrl("");
  };

  return (
    <div>
      <ButtonGroup
        onSelectPC={handleSelectFromPC}
        onLoadFromWeb={handleLoadFromWeb}
      />

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />


      <LoadImagemodal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onContinue={handleContinue}
        url={webUrl}
        setUrl={setWebUrl}
      />

      {imageUrl && (
    
        <div className="image-preview">
        <img
          src={imageUrl}
          alt="preview"
          style={{ marginTop: 20, maxWidth: "100%" }}
        />
        </div>
      )}
      <AreaControls/>
      
    </div>
  );
};

export default ImageSelector;

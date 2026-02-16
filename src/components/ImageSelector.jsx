import React, { useRef, useState } from "react";
import ButtonGroup from "./ButtonGroup";
import LoadImagemodal from "./LoadImagemodal";
import AreaControls from "./AreaControls";
import ImageCanvas from "./ImageCanvas";
import CodeOutputModal from "./CodeOutputModal";
import { generateImageMap } from "../utils/generateImageMap";

const ImageSelector = () => {
  const fileInputRef = useRef(null);

  // image states
  const [imageUrl, setImageUrl] = useState(null);
  const [webUrl, setWebUrl] = useState("");

  // modal states
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  // generated code
  const [htmlCode, setHtmlCode] = useState("");

  // areas state
  const [areas, setAreas] = useState([
    {
      id: 1,
      active: true,
      shape: "rect",
      link: "",
      title: "",
      target: "",
    },
  ]);

  /* ================= IMAGE HANDLERS ================= */

  const handleSelectFromPC = () => {
    fileInputRef.current.click();
  };

  const handleLoadFromWeb = () => {
    setShowLoadModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUrl(URL.createObjectURL(file));
  };

  const handleContinue = () => {
    if (!webUrl) return;
    setImageUrl(webUrl);
    setWebUrl("");
    setShowLoadModal(false);
  };

  /* ================= AREA HANDLERS ================= */

  const handleAddArea = () => {
    setAreas((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        active: false,
        shape: "",
        link: "",
        title: "",
        target: "",
      },
    ]);
  };

  const handleSetActive = (id) => {
    setAreas((prev) =>
      prev.map((area) => ({
        ...area,
        active: area.id === id,
      }))
    );
  };

  const handleDeleteArea = (id) => {
    setAreas((prev) => {
      const filtered = prev.filter((area) => area.id !== id);

      if (filtered.length && !filtered.some((a) => a.active)) {
        filtered[0] = { ...filtered[0], active: true };
      }

      return filtered;
    });
  };

  const handleAreaChange = (id, field, value) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === id ? { ...area, [field]: value } : area
      )
    );
  };

  /* ================= CODE GENERATION ================= */

  const handleShowCode = () => {
    if (!imageUrl || areas.length === 0) {
      alert("Please select an image and add at least one area");
      return;
    }

    const code = generateImageMap(imageUrl, areas);
    setHtmlCode(code);
    setShowCodeModal(true);
  };

  /* ================= RENDER ================= */

  return (
    <div>
      {/* Buttons */}
      <ButtonGroup
        onSelectPC={handleSelectFromPC}
        onLoadFromWeb={handleLoadFromWeb}
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Load from web modal */}
      <LoadImagemodal
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        onContinue={handleContinue}
        url={webUrl}
        setUrl={setWebUrl}
      />

      {/* Code output modal */}
      {showCodeModal && (
        <CodeOutputModal
          code={htmlCode}
          onClose={() => setShowCodeModal(false)}
        />
      )}

      {/* Image + controls */}
      {imageUrl && (
        <>
          <ImageCanvas
            imageUrl={imageUrl}
            areas={areas}
            setAreas={setAreas}
          />

          <AreaControls
            areas={areas}
            onAddArea={handleAddArea}
            onSetActive={handleSetActive}
            onDeleteArea={handleDeleteArea}
            onAreaChange={handleAreaChange}
            onShowCode={handleShowCode}
          />
        </>
      )}
    </div>
  );
};

export default ImageSelector;

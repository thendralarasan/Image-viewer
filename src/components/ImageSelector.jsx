import React, { useRef, useState } from "react";
import ButtonGroup from "./ButtonGroup";
import LoadImagemodal from "./LoadImagemodal";
import AreaControls from "./AreaControls";
import ImageCanvas from "./ImageCanvas";
import CodeOutputModal from "./CodeOutputModal";
import { generateImageMap } from "../utils/generateImageMap";
import CoordsValueBox from "./CoordsValueBox";

const ImageSelector = () => {

  const fileInputRef = useRef(null);

  const [imageUrl, setImageUrl] = useState(null);
  const [webUrl, setWebUrl] = useState("");

  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const [htmlCode, setHtmlCode] = useState("");

  const [areas, setAreas] = useState([
    {
      id: 1,
      active: true,
      shape: "rect",
      coords: null,
      link: "",
      title: "",
      target: "",
    },
  ]);

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
    setImageUrl(webUrl.trim());
    setWebUrl("");
    setShowLoadModal(false);
  };

  const handleAddArea = () => {
    setAreas(prev => [
      ...prev,
      {
        id: Date.now(),
        active: false,
        shape: "",
        coords: null,
        link: "",
        title: "",
        target: "",
      },
    ]);
  };

  const handleSetActive = (id) => {
    setAreas(prev =>
      prev.map(area => ({
        ...area,
        active: area.id === id,
      }))
    );
  };

  const handleDeleteArea = (id) => {
    setAreas(prev => {
      if (!Array.isArray(prev) || prev.length === 0) return prev;

      const areaToDelete = prev.find(a => a.id === id);

      
      if (areaToDelete?.active) return prev;

      return prev.filter(a => a.id !== id);
    });
  };

  const handleAreaChange = (id, field, value) => {
    setAreas(prev =>
      prev.map(area =>
        area.id === id ? { ...area, [field]: value } : area
      )
    );
  };

  const handleShowCode = () => {
    if (!imageUrl || areas.length === 0) {
      alert("Please select an image and add at least one area");
      return;
    }

    const code = generateImageMap(imageUrl, areas);
    setHtmlCode(code);
    setShowCodeModal(true);
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
        isOpen={showLoadModal}
        onClose={() => setShowLoadModal(false)}
        onContinue={handleContinue}
        url={webUrl}
        setUrl={setWebUrl}
      />

      {showCodeModal && (
        <CodeOutputModal
          code={htmlCode}
          onClose={() => setShowCodeModal(false)}
        />
      )}

      {imageUrl && (
        <>
        <CoordsValueBox areas={areas}/>
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
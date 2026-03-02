import React from "react";

const CoordsValueBox = ({ areas }) => {

  const activeArea = areas.find(a => a.active);
  let coordsString = "";

  if (activeArea && activeArea.coords) {
    if (activeArea.shape === "rect") {
      const { x1, y1, x2, y2 } = activeArea.coords;
      coordsString = `${x1},${y1},${x2},${y2}`;
    }

    if (activeArea.shape === "circle") {
      const { cx, cy, r } = activeArea.coords;
      coordsString = `${cx},${cy},${r}`;
    }

    if (activeArea.shape === "poly" && Array.isArray(activeArea.coords)) {
      coordsString = activeArea.coords
        .map(p => `${p.x},${p.y}`)
        .join(",");
    }
  }

  const handleCopy = () => {
    if (!coordsString) return;
    navigator.clipboard.writeText(coordsString);
  };

  return (
<div>
    <h2>if  you need the full code Click " Show Me The Code!"</h2>
    <div className="coords-box">
      <input
        value={coordsString}
        placeholder="Coordinates will appear here..."
        readOnly
      />

      <button
        className="copy-btn"
        onClick={handleCopy}
      >
         Copy
      </button>
    </div>
    </div>
  );
};

export default CoordsValueBox;


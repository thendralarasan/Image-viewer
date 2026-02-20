import React from "react";

const CoordsPopup = ({ area, onClose }) => {
  if (!area || !area.coords) return null;

  const formatcoords = () => {
    if (area.shape === "rect") {
      const { x1, y1, x2, y2 } = area.coords;
      return `coords="${x1},${y1},${x2},${y2}"`;
    }

    if (area.shape === "circle") {
      const { cx, cy, r } = area.coords;
      return `coords="${cx},${cy},${r}"`;
    }

    if (area.shape === "poly" && Array.isArray(area.coords)) {
      const poly = area.coords
        .map((p) => `${p.x},${p.y}`)
        .join(",");
      return `coords="${poly}"`;
    }

    return "";
  };

  const coordsString = formatcoords();

  return (
    <div className="coords-popup">
      <p>{coordsString}</p>
      <button onClick={() => navigator.clipboard.writeText(coordsString)}>
        Copy
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CoordsPopup;
import React, { useState } from "react";

const ImageCanvas = ({ imageUrl, areas, setAreas }) => {


  const [drawing, setDrawing] = useState(false);   
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 }); 
  const [mousePos, setMousePos] = useState(null);

  const getMousePos = (e) => {

    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    };
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const activeArea = areas.find(a => a.active);
    if (!activeArea || !activeArea.shape) return;

    const pos = getMousePos(e);
    setMousePos(pos);

    if (activeArea.shape === "rect" || activeArea.shape === "circle") {
      setStartPoint(pos);
      setDrawing(true);

      setAreas(prev =>
        prev.map(area =>
          area.active
            ? {
                ...area,
                coords:
                  area.shape === "rect"
                    ? { x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y }
                    : { cx: pos.x, cy: pos.y, r: 0 },
              }
            : area
        )
      );
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const pos = getMousePos(e);

    setAreas(prev =>
      prev.map(area => {
        if (!area.active || !area.coords) return area;

        if (area.shape === "rect") {
          return {
            ...area,
            coords: {
              x1: startPoint.x,
              y1: startPoint.y,
              x2: pos.x,
              y2: pos.y,
            },
          };
        }

        if (area.shape === "circle") {
          const dx = pos.x - startPoint.x;
          const dy = pos.y - startPoint.y;
          const r = Math.round(Math.sqrt(dx * dx + dy * dy));
          return {
            ...area,
            coords: { cx: startPoint.x, cy: startPoint.y, r },
          };
        }

        return area;
      })
    );
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleClick = (e) => {
    const activeArea = areas.find(a => a.active);
    if (!activeArea || activeArea.shape !== "poly") return;

    if (e.detail === 2) 
     return;
    

    const pos = getMousePos(e);

    setAreas(prev =>
      prev.map(area =>
        area.active
          ? {
              ...area,
              coords:  Array.isArray(area.coords)
                ? [...area.coords, pos]
                : [pos],
            }
          : area
      )
    );
    
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const activeArea = areas.find(a => a.active);
    if (!activeArea || activeArea.shape !== "poly") return;

    if (! Array.isArray(activeArea.coords)|| activeArea.coords.length < 2) {
        return;
    }
    setDrawing(false);
  };

  return (
    <div
      className="image-preview"
      style={{
        cursor: areas.some(a=> a.active)?  "crosshair": "default"
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <img src={imageUrl} alt="preview" draggable={false}
           onError={(e)=>{
            e.target.src =" ";
            alert(" unable to load image . please use direct image URL.")
           }}
      />
      <svg className="svg-overlay">
  {areas.map(area => {
    if (!area.coords) return null;


    if (area.shape === "rect") {
      const { x1, y1, x2, y2 } = area.coords;

      const left = Math.min(x1, x2);
      const top = Math.min(y1, y2);
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);

      return (
        <g key={area.id}>
          <rect
            x={left}
            y={top}
            width={width}
            height={height}
            fill="rgba(30,144,255,0.25)"
            stroke="#1e90ff"
            strokeWidth="2"
          />


          <circle cx={left} cy={top} r="5" fill="#1e90ff" />
          <circle cx={left + width} cy={top} r="5" fill="#1e90ff" />
          <circle cx={left} cy={top + height} r="5" fill="#1e90ff" />
          <circle cx={left + width} cy={top + height} r="5" fill="#1e90ff" />
        </g>
      );
    }


    if (area.shape === "circle") {
      const { cx, cy, r } = area.coords;

      return (
        <g key={area.id}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="rgba(46,204,113,0.25)"
            stroke="#2ecc71"
            strokeWidth="2"
          />

         
          <circle cx={cx} cy={cy} r="5" fill="#2ecc71" />

          <circle cx={cx + r} cy={cy} r="5" fill="#2ecc71" />
        </g>
      );
    }


    if (
      area.shape === "poly" &&
      Array.isArray(area.coords) &&
      area.coords.length >= 2
    ) {
      const points = area.coords
        .map(p => `${p.x},${p.y}`)
        .join(" ");

      return (
        <g key={area.id}>
          <polygon
            points={points}
            fill="rgba(241,196,15,0.25)"
            stroke="#f1c40f"
            strokeWidth="2"
          />

         
          {area.coords.map((p, index) => (
            <circle
              key={index}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#f1c40f"
            />
          ))}
        </g>
      );
    }

    return null;
  })}
</svg>

      
    </div>
  );
};

export default ImageCanvas;

import React, { useState } from "react";

const ImageCanvas = ({ imageUrl, areas, setAreas }) => {

  const [drawing, setDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [draggingId, setDraggingId] = useState(null);
  const [resizeData, setResizeData] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getMousePos = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    };
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const pos = getMousePos(e);


    for (let area of areas) {
      if (!area.coords) continue;

      if (area.shape === "rect") {
        const { x1, y1, x2, y2 } = area.coords;
        const corners = [
          { x: x1, y: y1, corner: "tl" },
          { x: x2, y: y1, corner: "tr" },
          { x: x1, y: y2, corner: "bl" },
          { x: x2, y: y2, corner: "br" },
        ];

        for (let c of corners) {
          const dx = pos.x - c.x;
          const dy = pos.y - c.y;
          if (dx * dx + dy * dy <= 36) {
            setResizeData({
              id: area.id,
              type: "rect",
              corner: c.corner,
            });
            return;
          }
        }
      }

      if (area.shape === "circle") {
        const { cx, cy, r } = area.coords;
        const dx = pos.x - (cx + r);
        const dy = pos.y - cy;

        if (dx * dx + dy * dy <= 36) {
          setResizeData({
            id: area.id,
            type: "circle",
          });
          return;
        }
      }

      if (area.shape === "poly" && Array.isArray(area.coords)) {
        for (let i = 0; i < area.coords.length; i++) {
          const p = area.coords[i];
          const dx = pos.x - p.x;
          const dy = pos.y - p.y;
          if (dx * dx + dy * dy <= 36) {
            setResizeData({
              id: area.id,
              type: "poly",
              index: i,
            });
            return;
          }
        }
      }
    }

   
    for (let area of areas) {
      if (!area.coords) continue;

      if (area.shape === "rect") {
        const { x1, y1, x2, y2 } = area.coords;
        const left = Math.min(x1, x2);
        const right = Math.max(x1, x2);
        const top = Math.min(y1, y2);
        const bottom = Math.max(y1, y2);

        if (
          pos.x >= left &&
          pos.x <= right &&
          pos.y >= top &&
          pos.y <= bottom
        ) {
          setDraggingId(area.id);
          setDragStart(pos);
          return;
        }
      }

      if (area.shape === "circle") {
        const { cx, cy, r } = area.coords;
        const dx = pos.x - cx;
        const dy = pos.y - cy;

        if (dx * dx + dy * dy <= r * r) {
          setDraggingId(area.id);
          setDragStart(pos);
          return;
        }
      }

      if (area.shape === "poly" && Array.isArray(area.coords)) {
        const xs = area.coords.map(p => p.x);
        const ys = area.coords.map(p => p.y);

        const left = Math.min(...xs);
        const right = Math.max(...xs);
        const top = Math.min(...ys);
        const bottom = Math.max(...ys);

        if (
          pos.x >= left &&
          pos.x <= right &&
          pos.y >= top &&
          pos.y <= bottom
        ) {
          setDraggingId(area.id);
          setDragStart(pos);
          return;
        }
      }
    }

   
    const activeArea = areas.find(a => a.active);
    if (!activeArea || !activeArea.shape) return;

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
    const pos = getMousePos(e);


    if (draggingId) {
      const dx = pos.x - dragStart.x;
      const dy = pos.y - dragStart.y;

      setAreas(prev =>
        prev.map(area => {
          if (area.id !== draggingId) return area;

          if (area.shape === "rect") {
            return {
              ...area,
              coords: {
                x1: area.coords.x1 + dx,
                y1: area.coords.y1 + dy,
                x2: area.coords.x2 + dx,
                y2: area.coords.y2 + dy,
              },
            };
          }

          if (area.shape === "circle") {
            return {
              ...area,
              coords: {
                ...area.coords,
                cx: area.coords.cx + dx,
                cy: area.coords.cy + dy,
              },
            };
          }

          if (area.shape === "poly") {
            return {
              ...area,
              coords: area.coords.map(p => ({
                x: p.x + dx,
                y: p.y + dy,
              })),
            };
          }

          return area;
        })
      );

      setDragStart(pos);
      return;
    }

    // ---------- RESIZE ----------
if (resizeData) {
  setAreas(prev =>
    prev.map(area => {
      if (area.id !== resizeData.id) return area;

      if (resizeData.type === "rect") {
        let { x1, y1, x2, y2 } = area.coords;

        if (resizeData.corner === "tl") {
          x1 = pos.x;
          y1 = pos.y;
        }
        if (resizeData.corner === "tr") {
          x2 = pos.x;
          y1 = pos.y;
        }
        if (resizeData.corner === "bl") {
          x1 = pos.x;
          y2 = pos.y;
        }
        if (resizeData.corner === "br") {
          x2 = pos.x;
          y2 = pos.y;
        }

        return { ...area, coords: { x1, y1, x2, y2 } };
      }

      if (resizeData.type === "circle") {
        const dx = pos.x - area.coords.cx;
        const dy = pos.y - area.coords.cy;
        const r = Math.sqrt(dx * dx + dy * dy);

        return { ...area, coords: { ...area.coords, r } };
      }

      if (resizeData.type === "poly") {
        const newCoords = [...area.coords];
        newCoords[resizeData.index] = pos;
        return { ...area, coords: newCoords };
      }

      return area;
    })
  );
  return;
}

   
    if (!drawing) return;

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
          const r = Math.sqrt(dx * dx + dy * dy);
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
    setDraggingId(null);
    setResizeData(null);
  };

  const handleClick = (e) => {
    const activeArea = areas.find(a => a.active);
    if (!activeArea || activeArea.shape !== "poly") return;

    const pos = getMousePos(e);

    setAreas(prev =>
      prev.map(area =>
        area.active
          ? {
              ...area,
              coords: Array.isArray(area.coords)
                ? [...area.coords, pos]
                : [pos],
            }
          : area
      )
    );
  };

  return (
    <div
      className="image-preview"
      style={{
        cursor:
          draggingId || resizeData || areas.some(a => a.active)
            ? "pointer"
            : "default",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <img src={imageUrl} alt="preview" draggable={false} />

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
              <rect
                key={area.id}
                x={left}
                y={top}
                width={width}
                height={height}
                fill="rgba(30,144,255,0.25)"
                stroke="#1e90ff"
              />
            );
          }

          if (area.shape === "circle") {
            const { cx, cy, r } = area.coords;
            return (
              <circle
                key={area.id}
                cx={cx}
                cy={cy}
                r={r}
                fill="rgba(46,204,113,0.25)"
                stroke="#2ecc71"
              />
            );
          }

          if (area.shape === "poly" && Array.isArray(area.coords)) {
            const points = area.coords
              .map(p => `${p.x},${p.y}`)
              .join(" ");

            return (
              <polygon
                key={area.id}
                points={points}
                fill="rgba(241,196,15,0.25)"
                stroke="#f1c40f"
              />
            );
          }

          return null;
        })}
      </svg>
    </div>
  );
};

export default ImageCanvas;
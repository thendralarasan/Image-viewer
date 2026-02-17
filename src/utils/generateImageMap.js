const formatCoords = (area) => {
  if (!area.coords) return "";

  if (area.shape === "rect") {
    const { x1, y1, x2, y2 } = area.coords;
    return `${x1},${y1},${x2},${y2}`;
  }

  if (area.shape === "circle") {
    const { cx, cy, r } = area.coords;
    return `${cx},${cy},${r}`;
  }

  // ✅ Improved poly handling
  if (area.shape === "poly" && Array.isArray(area.coords)) {

    // Minimum 3 points required
    if (area.coords.length < 3) return "";

    return area.coords
      .map(point => `${point.x},${point.y}`)
      .join(",");
  }

  return "";
};
export const generateImageMap = (imageUrl, areas) => {
  if (!imageUrl || areas.length === 0) return "";

  const mapName = "image-map";

  const areaTags = areas
    .filter(a => a.coords && a.shape)
    .map(a => {
      const coordsString = formatCoords(a);

      if (!coordsString) return "";

      return `<area 
  shape="${a.shape}"
  coords="${coordsString}"
  href="${a.link || '#'}"
  title="${a.title || ''}"
  target="${a.target || ''}"
/>`;
    })
    .filter(Boolean)   // remove empty results safely
    .join("\n");

  return `<!-- Image Map Generated -->
<img src="${imageUrl}" usemap="#${mapName}" />

<map name="${mapName}">
${areaTags}
</map>`;
};

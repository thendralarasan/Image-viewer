export const generateImageMap = (imageUrl, areas) => {
  if (!imageUrl || areas.length === 0) return "";

  const mapName = "image-map";

  const areaTags = areas
    .filter(a => a.link && a.shape)
    .map(a => {
      return `<area 
  shape="${a.shape}"
  coords="${a.coords || ''}"
  href="${a.link}"
  title="${a.title || ''}"
  target="${a.target || ''}"
/>`;
    })
    .join("\n");

  return `<!-- Image Map Generated -->
<img src="${imageUrl}" usemap="#${mapName}" />

<map name="${mapName}">
${areaTags}
</map>`;
};

// Inline SVG used when a cover/profile image is missing or fails to load.
export const placeholderImage = (label = "") => {
  const text = String(label).replace(/[<>&"']/g, "").slice(0, 24);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#1DB954"/><stop offset="1" stop-color="#191414"/>` +
    `</linearGradient></defs><rect width="300" height="300" fill="url(#g)"/>` +
    `<text x="150" y="165" font-family="Helvetica,Arial,sans-serif" font-size="22" ` +
    `fill="white" text-anchor="middle">${text}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const fallbackOnError = (label) => (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = placeholderImage(label);
};

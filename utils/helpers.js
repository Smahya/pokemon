import ColorThief from "colorthief";

export function getColorInfo(imageUrl, callback) {
  const img = document.createElement("IMG");
  const quality = 10;
  const colorThief = new ColorThief();
  img.setAttribute("src", imageUrl);
  img.crossOrigin = "Anonymous";
  if (img.complete) {
    callback(
      colorThief.getColor(img, quality),
      colorThief.getPalette(img, quality)
    );
  } else {
    img.addEventListener("load", function () {
      callback(
        colorThief.getColor(img, quality),
        colorThief.getPalette(img, quality)
      );
    });
  }
}

export const loadImageAsBitmap = async (src: string): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      resolve(imageData);
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};

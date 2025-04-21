export const getKey = ({
  imageData,
  top,
  left,
  width,
  height,
}: {
  imageData: ImageData;
  top: number;
  left: number;
  width: number;
  height: number;
}) => {
  return `${imageData.width}-h-${imageData.height}-t-${top}-l-${left}-w-${width}-h-${height}`;
};

const cache = new Map<
  string,
  {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
>();

export const getAveragePixel = ({
  imageData,
  top,
  left,
  width,
  height,
}: {
  imageData: ImageData;
  top: number;
  left: number;
  width: number;
  height: number;
}) => {
  const data = imageData.data;
  const total = width * height;
  const pixels = {
    red: [] as number[],
    green: [] as number[],
    blue: [] as number[],
    alpha: [] as number[],
  };

  const k = getKey({ imageData, top, left, width, height });
  if (cache.has(k)) {
    return cache.get(k)!;
  }

  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / width + top);
    const column = Math.floor((i % width) + left);
    const index = row * imageData.width + column;

    if (!Number.isInteger(index)) {
      throw new Error(`Index is not an integer: ${index}`);
    }

    if (index * 4 > data.length) {
      throw new Error("too big:" + index);
    }

    pixels.red.push(data[index * 4]);
    pixels.green.push(data[index * 4 + 1]);
    pixels.blue.push(data[index * 4 + 2]);
    pixels.alpha.push(data[index * 4 + 3]);
  }

  const average = {
    red: pixels.red.reduce((acc, curr) => acc + curr, 0) / total,
    green: pixels.green.reduce((acc, curr) => acc + curr, 0) / total,
    blue: pixels.blue.reduce((acc, curr) => acc + curr, 0) / total,
    alpha: pixels.alpha.reduce((acc, curr) => acc + curr, 0) / total,
  };

  cache.set(k, average);

  return average;
};

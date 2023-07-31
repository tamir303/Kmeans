const toPixels = (
  field: number[],
  maxFields: number[],
  graphWidth: number,
  graphHeight: number
) => {
  const [x, y] = field;
  const [maxX, maxY] = maxFields;

  const pixelX = (x / maxX) * graphWidth;
  const pixelY = graphHeight - (y / maxY) * graphHeight;
  return { x: pixelX, y: pixelY };
};

export default toPixels;

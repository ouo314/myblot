const Waves = (width, height, spacing, amplitude) => {
  const lines = [];
  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x++) {
      const waveY = height / 2 + amplitude * Math.sin(2 * Math.PI * x / spacing);
      lines.push([
        [x, height / 2],
        [x, waveY]
      ]);
    }
  }
  return lines;
};

drawLines(Waves(100, 100, 50, 10));
const width = 125;
const height = 125;

setDocDimensions(width, height);

// 狹縫
const barW = 20; 
const gapW = 30; 
const barH = height * 0.6; 
const barY = (height - barH) / 2; 

drawLines([
  [
    [0, barY],
    [(width - gapW) / 2, barY]
  ],
  [
    [0, barY + barH],
    [(width - gapW) / 2, barY + barH]
  ],
  [
    [(width + gapW) / 2, barY],
    [width, barY]
  ],
  [
    [(width + gapW) / 2, barY + barH],
    [width, barY + barH]
  ]
]);

// 波前
const sourceX = width / 2;
const sourceY = height - 10;
const maxR = Math.sqrt(width * width + height * height);
const numC = 10;

for (let i = 1; i <= numC; i++) {
  const r = (i / numC) * maxR;
  const numP = Math.max(16, Math.floor(r * 2));
  const circle = [];

  for (let j = 0; j < numP; j++) {
    const angle = (j / numP) * 2 * Math.PI;
    const x = sourceX + r * Math.cos(angle);
    const y = sourceY + r * Math.sin(angle);
    circle.push([x, y]);
  }

  drawLines([circle]);
}

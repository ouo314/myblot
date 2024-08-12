const width = 125;
const height = 125;

setDocDimensions(width, height);

// 狹縫
const barW = 20;
const gapW = 30;
const barY = 80;
const gapL = (width - gapW) / 2;
const gapR = (width + gapW) / 2;
drawLines([
  [
    [0, barY],
    [gapL, barY]
  ],
  [
    [gapR, barY],
    [width, barY]
  ]
]);

// 波前
const srcX = width / 2;
const srcY = height - 10;
const maxR = Math.sqrt(width * width + height * height);
const waveL = 10; 
const numP = 100; 

let curR = waveL;

while (curR <= maxR) {
  const circle = [];

  for (let i = 0; i < numP; i++) {
    const angle = (i / numP) * 2 * Math.PI;
    const x = srcX + curR * Math.cos(angle);
    const y = srcY + curR * Math.sin(angle);
    let block = false;

    if (y < barY) {
      if (x > gapR || x < gapL) {
        block = true;
      }
    }
    if(!block) circle.push([x, y]);
  }
  circle.push(circle[0]);

  drawLines([circle]);
  curR += waveL;
}

const width = 125;
const height = 130;

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
], { stroke: "blue" });

// 平行波前
const srcX = width / 2;
const srcY = height - 10;
const waveL = 10; // 波長
const numWaves = (srcY - 10) / waveL; // 波前數量
const waveSpacing = waveL; // 波前間距


for (let i = 0; i < numWaves; i++) {
  const yOffset = srcY - (i + 1) * waveSpacing;
  const line = [];
  const circle = [];
  
  for (let x = 0; x <= width; x++) {
    let blocked = false;
    if (yOffset <= barY) {
      
      if (x > gapR || x < gapL) {
        blocked = true;
      }
    }

    if (!blocked) {
      line.push([x, yOffset]);
    }
  }

  if (line.length > 0) {
    drawLines([line], { fill: "yellow" });
  }
}
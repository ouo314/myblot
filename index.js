const width = 125;
const height = 130;

setDocDimensions(width, height);

// 狹縫
const barW = 20;
const gapW = 22;
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

//波前
const srcX = width / 2;
const srcY = height - 10;
const waveL = 10; // 波長
const numWaves = (srcY - waveL) / waveL; // 波前數量
const waveSpacing = waveL; // 波前間距

let r = waveL;
const tur = new bt.Turtle();

tur.jump([gapL, barY]);
tur.setAngle(-90);
for (let x = gapL; x <= gapR; x++) {
  tur.jump([x, barY]);
  tur.down();
  tur.forward(barY - 1);
};

//左能量
const turL = new bt.Turtle();
let pathTurL = [];
for (let theta = -90; theta > -180; theta -= (90 / gapW)) {
  turL.jump([gapL, barY]);
  turL.down();
  turL.setAngle(theta);
  turL.forward(100);

  let pathTurL = turL.path;

  const filteredPathTurL = bt.iteratePoints(pathTurL, (pt) => {
    const [x, y] = pt;

    if (x < 0 || y <= 0) {
      return "REMOVE";
    }
    return [x, y];
  });

  drawLines(filteredPathTurL);
}



let turY = barY - waveL;
tur.jump([gapL, barY - waveL]);
tur.right(180);

for (let i = 0; i < numWaves; i++) {
  const yOffset = srcY - (i + 1) * waveSpacing;
  const line = [];
  //左曲線
  tur.up();
  tur.jump([gapL, turY]);
  tur.setAngle(180);
  tur.down();
  tur.arc(-90, r);
  const pathL = tur.path;

  const filteredPathL = bt.iteratePoints(pathL, (pt) => {
    const [x, y] = pt;

    if (x <= 0 || y <= 0) {
      return "REMOVE";
    }
    return [x, y];
  });
  drawLines(filteredPathL);
  //右曲線
  tur.up();
  tur.jump([gapR, turY]);
  tur.setAngle(0);
  tur.down();
  tur.arc(90, r);
  const pathR = tur.path;

  const filteredPathR = bt.iteratePoints(pathR, (pt) => {
    const [x, y] = pt;

    if (x >= width || y <= 0) {
      return "REMOVE";
    }
    return [x, y];
  });

  drawLines(filteredPathR);

  r += waveL;
  turY -= waveL;
  //平行線
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
    drawLines([line], { stroke: "black" });
  }
}
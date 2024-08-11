const width = 125
const height = 125

setDocDimensions(width, height)


const shape = (n) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n; i++) t.forward(1).right(360/n)
  return t.lines()
}


const shaft = bt.scale(shape(3), [2, 150])


const vanes = bt.scale(shape(11), [8, 30])


bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]])


const feather = [...shaft, ...vanes]


bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)
bt.rotate(feather, 225)
drawLines(feather)


const lines = []
const shaftCenterX = width / 2
const shaftCenterY = height / 2

const lineLength = 22 
const lineSpacing = 5  

for (let i = 0; i < 5; i++) {  
  const offset = i * lineSpacing
  const startX = shaftCenterX - lineLength / 2 + offset
  const endX = shaftCenterX + lineLength / 2 + offset
  const startY = shaftCenterY - offset
  const endY = shaftCenterY - offset

  lines.push([[startX, startY], [endX, endY]])
}

drawLines(lines)

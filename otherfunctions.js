function constructorObj() {
  const obj = {
    spriteX: 0,
    spriteY: 0,
    spriteW: 0,
    spriteH: 0,
    canvasX: 0,
    canvasY: 0,
    canvasW: 0,
    canvasH: 0
  }
  return obj;
}

function draw(spritesImg, objectDraw) {
  contexto.drawImage(
    spritesImg,
    objectDraw.spriteX, objectDraw.spriteY, // start position from sprites
    objectDraw.spriteW, objectDraw.spriteH, // size from sprites
    objectDraw.canvasX, objectDraw.canvasY, // start position from canvas
    objectDraw.canvasW, objectDraw.canvasH, // size from canvas
  );
}

const floor1 = Object.assign({}, floor);
floor1.canvasX = floor.spriteW;

backGround
const backGround1 = Object.assign({}, backGround);
backGround1.canvasX = backGround.spriteW;
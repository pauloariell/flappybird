console.log('Créditos ao DevSoutinho, Inscreva-se no canal dele')
console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav'

const som_JUMP = new Audio();
som_JUMP.src = './efeitos/pulo.wav'

const som_FALL = new Audio();
som_FALL.src = './efeitos/caiu.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

let activeScreen = {};
function changeScreen(newScreen){
  activeScreen = newScreen;

  if (activeScreen.inicialize) { activeScreen.inicialize() };
}

function crash(objectOne, objectTwo){
  const flappyBirdY = objectOne.canvasY + objectOne.canvasH;
  const floorY = objectTwo.canvasY;
  
  if(flappyBirdY>=floorY){
    setTimeout(() => {
      changeScreen(telas.INICIO);
    },500)
    return true
  }
  return false;
}

const globals = {};
const background = {
  spriteX: 390,
  spriteY: 0,
  spriteW: 275,
  spriteH: 204,
  canvasX: 0,
  canvasY: canvas.height - 204,
  canvasW: 275,
  canvasH: 204,
  draw() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      background.spriteX, background.spriteY, // start position from sprites
      background.spriteW, background.spriteH, // size from sprites
      background.canvasX, background.canvasY, // start position from canvas
      background.canvasW, background.canvasH, // size from canvas
    );
    contexto.drawImage(
      sprites,
      background.spriteX, background.spriteY, // start position from sprites
      background.spriteW, background.spriteH, // size from sprites
      background.canvasX+background.spriteW, background.canvasY, // start position from canvas
      background.canvasW, background.canvasH, // size from canvas
    );
  }
}

function createFloor(){
  const floor = {
    spriteX: 0,
    spriteY: 610,
    spriteW: 224,
    spriteH: 112,
    canvasX: 0,
    canvasY: canvas.height - 112,
    canvasW: 224,
    canvasH: 112,
    update(){

    },
    draw(){
      contexto.drawImage(
        sprites,
        floor.spriteX, floor.spriteY, // start position from sprites
        floor.spriteW, floor.spriteH, // size from sprites
        floor.canvasX, floor.canvasY, // start position from canvas
        floor.canvasW, floor.canvasH, // size from canvas
      );
      contexto.drawImage(
        sprites,
        floor.spriteX, floor.spriteY, // start position from sprites
        floor.spriteW, floor.spriteH, // size from sprites
        floor.canvasX+floor.spriteW, floor.canvasY, // start position from canvas
        floor.canvasW, floor.canvasH, // size from canvas
      );
    }
  }
  return floor;
}
function createFlappyBird(){
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    spriteW: 33,
    spriteH: 24,
    canvasX: 10,
    canvasY: 50,
    canvasW: 33,
    canvasH: 24,
    gravidade: 0.10,
    velocidade: 0,
    jump: 2.5,
    draw(){
      contexto.drawImage(
        sprites,
        flappyBird.spriteX, flappyBird.spriteY, // start position from sprites
        flappyBird.spriteW, flappyBird.spriteH, // size from sprites
        flappyBird.canvasX, flappyBird.canvasY, // start position from canvas
        flappyBird.canvasW, flappyBird.canvasH, // size from canvas
      );
    },
    update() {
      if (crash(flappyBird, globals.floor)){
        som_HIT.play();
        console.log('moreu!');
        return;
      }
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
      flappyBird.canvasY = flappyBird.canvasY + flappyBird.velocidade;
      som_FALL.play();
    },
    jumping(){
      flappyBird.velocidade = - flappyBird.jump
      som_JUMP.play();
    }
  }
  return flappyBird
}
const messageGetReady = {
  spriteX: 134,
  spriteY: 0,
  spriteW: 174,
  spriteH: 152,
  canvasX: (canvas.width / 2) - 174 / 2,
  canvasY: 50,
  canvasW: 174,
  canvasH: 152,
  draw(){
    contexto.drawImage(
      sprites,
      messageGetReady.spriteX, messageGetReady.spriteY, // start position from sprites
      messageGetReady.spriteW, messageGetReady.spriteH, // size from sprites
      messageGetReady.canvasX, messageGetReady.canvasY, // start position from canvas
      messageGetReady.canvasW, messageGetReady.canvasH, // size from canvas
    );
  }
}

const telas = {
  INICIO:{
    inicialize(){
      globals.floor = createFloor()
      globals.flappyBird = createFlappyBird()
    },
    draw(){
      background.draw();
      globals.floor.draw();
      globals.flappyBird.draw();
      messageGetReady.draw();
    },
    update(){

    },
    click(){
      changeScreen(telas.JOGO);
    }
  },
  JOGO: {
    draw(){
      background.draw();
      globals.floor.draw();
      globals.flappyBird.draw();
    },
    update(){
      globals.flappyBird.update();
    },
    click(){
      globals.flappyBird.jumping();
    }
  }
}

function loop() {
  activeScreen.draw();
  activeScreen.update();

  requestAnimationFrame(loop)
};

window.addEventListener('click', function() {
  if (activeScreen.click) {
    activeScreen.click();
  }
})
changeScreen(telas.INICIO);
loop();
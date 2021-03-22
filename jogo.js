console.log('Créditos ao DevSoutinho, Inscreva-se no canal dele')
console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

let frames = 0;

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

function createBackground(){
  const background = {
    spriteX: 390,
    spriteY: 0,
    spriteW: 275,
    spriteH: 204,
    canvasX: 0,
    canvasY: canvas.height - 204,
    canvasW: 275,
    canvasH: 204,
    update(){
      const backgroundMoviment = 1;
      const repeatMoviment = background.canvasW/2;
      const moving = background.canvasX - backgroundMoviment;
      background.canvasX = moving % repeatMoviment;
    },
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
  return background;
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
      const floorMoviment = 1;
      const repeatMoviment = floor.canvasW/2;
      const moving = floor.canvasX - floorMoviment;
      floor.canvasX = moving % repeatMoviment;
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
    currentFrame: 0,
    flappybirds:[
      {spriteX: 0, spriteY: 0},
      {spriteX: 0, spriteY: 26},
      {spriteX: 0, spriteY: 52}
    ],
    updateFrame(){
      //animation flappyboard
      const frameInterval = 10;
      const limitInterval = frames % frameInterval === 0;
      if(limitInterval) {
        const flappyBirdMoviment = 1;
        const moving = flappyBirdMoviment + flappyBird.currentFrame;
        const repeatMoviment = flappyBird.flappybirds.length;
        flappyBird.currentFrame = moving % repeatMoviment;
      }
    },
    draw(){
      //const { spriteX, spriteY } = flappyBird.flappybirds[0];
      //const { spriteX, spriteY } = flappyBird.flappybirds[1];
      flappyBird.updateFrame()
      const { spriteX, spriteY } = flappyBird.flappybirds[flappyBird.currentFrame];
      contexto.drawImage(
        sprites,
        spriteX, spriteY, // start position from sprites
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
  return flappyBird;
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

function createPipeObstacles(){
  const pipeObstacles = {
    spriteW: 52,
    spriteH: 400,
    floor: {
      spriteX: 0,
      spriteY: 169,
    },
    sky: {
      spriteX: 52,
      spriteY: 169,
    },
    distance: 80,
    pairs: [],
    draw(){
      pipeObstacles.pairs.forEach(function(pair){
        const yRandom = -150;
        const pipeDistance = 90;
        // Sky pipe
        const pipeSkyX = pair.x;
        const pipeSkyY = pair.y;
        contexto.drawImage(
          sprites,
          pipeObstacles.sky.spriteX, pipeObstacles.sky.spriteY, // start position from sprites
          pipeObstacles.spriteW, pipeObstacles.spriteH, // size from sprites
          pipeSkyX, pipeSkyY, // start position from canvas
          pipeObstacles.spriteW, pipeObstacles.spriteH, // size from canvas
        );
        
        // Floor pipe
        const pipeFloorX = pair.x;
        const pipeFloorY = pipeObstacles.spriteH + pipeDistance + pair.y ;
        contexto.drawImage(
          sprites,
          pipeObstacles.floor.spriteX, pipeObstacles.floor.spriteY, // start position from sprites
          pipeObstacles.spriteW, pipeObstacles.spriteH, // size from sprites
          pipeFloorX, pipeFloorY, // start position from canvas
          pipeObstacles.spriteW, pipeObstacles.spriteH, // size from canvas
        );
      });
    },
    update(){
      const passed100Frames = frames % 100 == 0;
      if (passed100Frames) {
        // console.log('Passou 100 frames');
        // draw  new pipe with new position
        pipeObstacles.pairs.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1),
        })
      }
      pipeObstacles.pairs.forEach(function(pair){
        pair.x-= 2;

        if(pipeObstacles.isCollisionFlappyBird(pair)){
          console.log(`You Lose`)
        };

        if (pair.x + pipeObstacles.spriteW <= 0 ) {
          pipeObstacles.pairs.shift();
        }
      });
    },
    isCollisionFlappyBird(pair){
      const flappyBirdHead = globals.flappyBird.spriteY;
      const flappyBirdFoot = globals.flappyBird.spriteY + globals.flappyBird.spriteH;

      if(globals.flappyBird.spriteX >= pair.x) {
        console.log(`Flappy bird invadiu a área dos canos`);
        if (flappyBirdHead <= pair.sky.spriteY) {
          return true;
        }
        if (flappyBirdFoot <= pair.sky.spriteY) {
          return true;
        }
      }
      return false;
    }
  }
  return pipeObstacles;
}

const telas = {
  INICIO:{
    inicialize(){
      globals.background = createBackground()
      globals.floor = createFloor()
      globals.flappyBird = createFlappyBird()
      globals.pipeObstacles = createPipeObstacles()
    },
    draw(){
      globals.background.draw();
      globals.flappyBird.draw();
      globals.pipeObstacles.draw();
      globals.floor.draw();
      // messageGetReady.draw();
    },
    update(){
      globals.floor.update();
      globals.background.update();
      globals.pipeObstacles.update();
    },
    click(){
      changeScreen(telas.JOGO);
    }
  },
  JOGO: {
    draw(){
      globals.background.draw();
      globals.floor.draw();
      globals.flappyBird.draw();
    },
    update(){
      globals.floor.update();
      globals.background.update();
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
  frames++;
  requestAnimationFrame(loop)
};

window.addEventListener('click', function() {
  if (activeScreen.click) {
    activeScreen.click();
  }
})
changeScreen(telas.INICIO);
loop();
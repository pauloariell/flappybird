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
const context = canvas.getContext('2d');

let activeScreen = {};
function changeScreen(newScreen){
  activeScreen = newScreen;

  if (activeScreen.inicialize) { activeScreen.inicialize() };
}

function crash(objectOne, objectTwo){
  const flappyBirdY = objectOne.canvasY + objectOne.canvasH;
  const floorY = objectTwo.canvasY;
  
  if(flappyBirdY>=floorY){
    // setTimeout(() => {
    //   changeScreen(telas.INICIO);
    // },500)
    changeScreen(telas.GAME_OVER);
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
    draw() {
      context.fillStyle = '#70c5ce';
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      context.drawImage(
        sprites,
        background.spriteX, background.spriteY, // start position from sprites
        background.spriteW, background.spriteH, // size from sprites
        background.canvasX, background.canvasY, // start position from canvas
        background.canvasW, background.canvasH, // size from canvas
      );
      context.drawImage(
        sprites,
        background.spriteX, background.spriteY, // start position from sprites
        background.spriteW, background.spriteH, // size from sprites
        background.canvasX+background.spriteW, background.canvasY, // start position from canvas
        background.canvasW, background.canvasH, // size from canvas
      );
    },
    update(){
      const backgroundMoviment = 1;
      const repeatMoviment = background.canvasW/2;
      const moving = background.canvasX - backgroundMoviment;
      background.canvasX = moving % repeatMoviment;
    },
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
    draw(){
      context.drawImage(
        sprites,
        floor.spriteX, floor.spriteY, // start position from sprites
        floor.spriteW, floor.spriteH, // size from sprites
        floor.canvasX, floor.canvasY, // start position from canvas
        floor.canvasW, floor.canvasH, // size from canvas
      );
      context.drawImage(
        sprites,
        floor.spriteX, floor.spriteY, // start position from sprites
        floor.spriteW, floor.spriteH, // size from sprites
        floor.canvasX+floor.spriteW, floor.canvasY, // start position from canvas
        floor.canvasW, floor.canvasH, // size from canvas
      );
    },
    update(){
      const floorMoviment = 1;
      const repeatMoviment = floor.canvasW/2;
      const moving = floor.canvasX - floorMoviment;
      floor.canvasX = moving % repeatMoviment;
    }, 
  }
  return floor;
}
function createFlappyBird(){
  const flappyBird = {
    spriteX: 0, // Position on sprites
    spriteY: 0, // Position on sprites
    spriteW: 33, // Size on sprites
    spriteH: 24, // Size on sprites
    canvasX: 10, // Position on screen when is draw
    canvasY: 50, // Position on screen when is draw
    canvasW: 33, // Position on screen when is draw
    canvasH: 24, // Position on screen when is draw
    gravidade: 0.10,
    velocidade: 0,
    jump: 2.5,
    currentFrame: 0,
    flappybirds:[
      {spriteX: 0, spriteY: 0},
      {spriteX: 0, spriteY: 26},
      {spriteX: 0, spriteY: 52}
    ],
    draw(){
      //const { spriteX, spriteY } = flappyBird.flappybirds[0];
      //const { spriteX, spriteY } = flappyBird.flappybirds[1];
      flappyBird.updateFrame()
      const { spriteX, spriteY } = flappyBird.flappybirds[flappyBird.currentFrame];
      context.drawImage(
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
    context.drawImage(
      sprites,
      messageGetReady.spriteX, messageGetReady.spriteY, // start position from sprites
      messageGetReady.spriteW, messageGetReady.spriteH, // size from sprites
      messageGetReady.canvasX, messageGetReady.canvasY, // start position from canvas
      messageGetReady.canvasW, messageGetReady.canvasH, // size from canvas
    );
  }
}

const messageGameOver = {
  spriteX: 134,
  spriteY: 153,
  spriteW: 226,
  spriteH: 200,
  canvasX: (canvas.width / 2) - 226 / 2,
  canvasY: 50,
  draw(){
    context.drawImage(
      sprites,
      messageGameOver.spriteX, messageGameOver.spriteY, // start position from sprites
      messageGameOver.spriteW, messageGameOver.spriteH, // size from sprites
      messageGameOver.canvasX, messageGameOver.canvasY, // start position from canvas
      messageGameOver.spriteW, messageGameOver.spriteH, // size from canvas
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
        context.drawImage(
          sprites,
          pipeObstacles.sky.spriteX, pipeObstacles.sky.spriteY, // start position from sprites
          pipeObstacles.spriteW, pipeObstacles.spriteH, // size from sprites
          pipeSkyX, pipeSkyY, // start position from canvas
          pipeObstacles.spriteW, pipeObstacles.spriteH, // size from canvas
        );
        
        // Floor pipe
        const pipeFloorX = pair.x;
        const pipeFloorY = pipeObstacles.spriteH + pipeDistance + pair.y ;
        context.drawImage(
          sprites,
          pipeObstacles.floor.spriteX, pipeObstacles.floor.spriteY, // start position from sprites
          pipeObstacles.spriteW, pipeObstacles.spriteH, // size from sprites
          pipeFloorX, pipeFloorY, // start position from canvas
          pipeObstacles.spriteW, pipeObstacles.spriteH, // size from canvas
        );

        pair.pipeSky = {
          x: pipeSkyX,
          y: pipeObstacles.spriteH + pipeSkyY,
        };
        pair.pipeFloor = {
          x: pipeFloorX,
          y: pipeFloorY,
        };
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
          console.log(`You Lose`);
          som_HIT.play();
          changeScreen(telas.GAME_OVER);
        };

        if (pair.x + pipeObstacles.spriteW <= 0 ) {
          pipeObstacles.pairs.shift();
        }
      });
    },
    isCollisionFlappyBird(pair){
      const flappyBirdHead = globals.flappyBird.canvasY;
      const flappyBirdFoot = globals.flappyBird.canvasY + globals.flappyBird.spriteH;

      if(globals.flappyBird.canvasX + globals.flappyBird.spriteW-5 >= pair.x) {
        console.log(`Flappy bird invadiu a área dos canos`);
        if (flappyBirdHead <= pair.pipeSky.y) {
          return true;
        }
        if (flappyBirdFoot >= pair.pipeFloor.y) {
          return true;
        }
      }
      return false;
    }
  }
  return pipeObstacles;
}

function createScoreboard(){
  const scoreboard = {
    score: 0,
    draw(){
      context.font = "20px 'VT323'";
      context.textAlign = 'right';
      context.fillStyle = 'white';
      context.fillText(`Score: ${padWithZeroes(scoreboard.score,7)}`, canvas.width - 10, 25);
    },
    update(){
      const frameInterval = 10;
      const limitInterval = frames % frameInterval === 0;
      if(limitInterval) {
        scoreboard.score+=1;
      }
    }
  }

  return scoreboard;
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
      globals.floor.draw();
      messageGetReady.draw();
    },
    update(){
      globals.floor.update();
      // globals.background.update();
    },
    click(){
      changeScreen(telas.JOGO);
    }
  },
  JOGO: {
    inicialize(){
      globals.scoreboard = createScoreboard();
    },
    draw(){
      globals.background.draw();
      globals.pipeObstacles.draw();
      globals.floor.draw();
      globals.flappyBird.draw();
      globals.scoreboard.draw();
    },
    update(){
      globals.pipeObstacles.update();
      globals.floor.update();
      // globals.background.update();
      globals.flappyBird.update();
      globals.scoreboard.update();
    },
    click(){
      globals.flappyBird.jumping();
    }
  },
  GAME_OVER: {
    draw(){
      messageGameOver.draw();
    },
    update(){

    },
    click(){
      changeScreen(telas.INICIO);
    }
  }
}

function loop() {
  activeScreen.draw();
  activeScreen.update();
  frames++;
  requestAnimationFrame(loop)
};

function padWithZeroes(number, length) {
  var stringNumber = '' + number;
  while (stringNumber.length < length) {
    stringNumber = '0' + stringNumber;
  }
  return stringNumber;
}

window.addEventListener('click', function() {
  if (activeScreen.click) {
    activeScreen.click();
  }
})
changeScreen(telas.INICIO);
loop();
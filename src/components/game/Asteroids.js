import React from "react"
import { useEffect, useRef, useState } from "react";

export default function Asteroids({generateLeaderboard, allScores, setNewAllScores}){

  // const [gameIsRunning, setGameIsRunning] = useState(false);
  let gameIsRunning = false;
  const [highscore, setHighscore] = useState();
  const [showAddName, setShowAddName] = useState();
  // const scoreInputRef = useRef();

  let canvas = null;
  let ctx = null;

  let width = undefined;
  let height = undefined;


  function downKey(e) {
    // console.log('DW' + e.code);
    switch(e.code){
      case 'KeyA':
        player.turnLeft(true);
        break;
      case 'KeyS':
        player.turnRight(true);
        break;
      case 'KeyD':
        player.burnEngine(true);
        break;
      case 'KeyF':
        player.fireCannon(true);
      default:

    }
  }

  function upKey(e) {
    // console.log('UP' + e.code);
    switch(e.code){
      case 'KeyA':
        player.turnLeft(false);
        break;
      case 'KeyS':
        player.turnRight(false);
        break;
      case 'KeyD':
        player.burnEngine(false);
        break;
      default:

    }
  }

  let player;

  useEffect(() => {

    const html = document.documentElement;
    const html_height = html.clientHeight;
    const html_width = html.clientWidth;
    // let player;
    // makeTmpPlayer();

    console.log("HTML (H,W) | (" + html_height + ', ' + html_width + ")");
    
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    canvas.height = html_height - 200;
    canvas.width = html_width;

    let tmpSpacer = document.getElementById('canvas-spacer');
    console.log('tmpSpacer', tmpSpacer);
    // tmpSpacer.height = html_height - 200;
    // tmpSpacer.widht = html_width;
    tmpSpacer.style.height = `${document.documentElement.clientHeight - 200}px`;


    width = canvas.width;
    height = canvas.height;

    // document.addEventListener('keydown', downKey);


    // document.addEventListener('keyup', upKey);


  }, []);
  
  /****************************************
  * Draw Array
  *****************************************/
  const renderQueue = [];
  function removeFromRenderQueue(obj){
    const index = renderQueue.indexOf(obj);
    renderQueue.splice(index, 1);
  }

  const tmpQueue = [];

  const collisionQueue = [];
  function removeFromCollisionQueue(obj){
    const index = collisionQueue.indexOf(obj);
    collisionQueue.splice(index,1);
  }

  const asteroidQueue = [];
  function removeFromAsteroidQueue(obj){
    const index = asteroidQueue.indexOf(obj);
    asteroidQueue.splice(index,1);
  }

  /****************************************
  *Dev Buttons
  *****************************************/
  
  // const startButton = document.getElementById('start-btn');
  // console.log(startButton);
  // const stopButton = document.getElementById('stop-btn');
  // console.log(stopButton);

  /****************************************
  *Player Stuff
  *****************************************/
  // let player;
  // var player = undefined;
  // const [player, setPlayer] = useState(undefined)
  // const getPlayer = () => {
  //   return(player)
  // }

  /****************************************
  * Game Stuff
  *****************************************/
  let currentLevel = 1;
  let currentSpawnNumber = 4;
  let isGameRunning = false;
  let nextLevel = 2;
  let nextSpawnNumber = 6;

  let currentScene = 1;

  /****************************************
  * Highscore Stuff
  *****************************************/


  /**
  

  // let localScores = undefined;

  let tmpScores = window.localStorage.getItem('highscores');
  console.log(tmpScores + '\ntypeof: ' + typeof(tmpScores));

  let ttd = [1000, 2000, 3000, 5000, 10000];//Temp Test Data

  if(tmpScores == null){
    window.localStorage.setItem('highscores', JSON.stringify(ttd));
  }

  let ttsd = window.localStorage.getItem('highscores')
  let tttsd = JSON.parse(ttsd);

  // Sort TTTSD

  tttsd.sort(function(a,b){return b-a});

  setLeaderboard(tttsd);

  console.log('TTSD: ' + ttsd);
  console.log('Typeof ttsd: ' + typeof(ttsd) + '\nTypeof tttsd: ' + typeof(tttsd));
  console.log(ttsd[0] + '\n tttsd: ' + tttsd[0]);

  if(tmpScores == null){console.log('YUP its null')}
  else{

  }

  function setLeaderboard(arr){
    let LI1 = document.getElementById('leaderboard1');
    LI1.innerHTML = arr[0];
    let LI2 = document.getElementById('leaderboard2');
    LI2.innerHTML = arr[1];
    let LI3 = document.getElementById('leaderboard3');
    LI3.innerHTML = arr[2];
    let LI4 = document.getElementById('leaderboard4');
    LI4.innerHTML = arr[3];
    let LI5 = document.getElementById('leaderboard5');
    LI5.innerHTML = arr[4];
  }
  
  */

  /****************************************
  * End Of Gobs Section
  *****************************************/

  /****************************************
  * Cannonball Section
  *****************************************/
  class Cannonball {
    constructor(data){
        this.type = 'cannonball';

        this.h = data.h;
        this.w = data.w;
        this.x = data.x;
        this.y = data.y;
        this.vx = data.vx;
        this.vy = data.vy;
        this.alive = true;
        this.color = data.color;
        this.startingX = data.x;
        this.startingY = data.y;
        this.burnOutTime = data.bot;
        this.size = data.size;
        this.timer = 0;
    }


    // checkContact(){
    //   // console.log("Checking Contact")
    //
    //   asteroidQueue.forEach((obj) => {
    //     // console.log(obj)
    //     let tmpCords = obj.getCollisionBox();
    //     // console.log(tmpCords);
    //     if(tmpCords.x < (this.x - this.size/2) + this.size &&
    //       tmpCords.x + tmpCords.w > (this.x - this.size/2) &&
    //       tmpCords.y < (this.y - this.size/2) + this.size &&
    //       tmpCords.y + tmpCords.h > (this.y - this.size/2)){
    //       // obj.color = "red";
    //       console.log('hit')
    //     }
    //   })
    // }

    checkContact2(){
      // console.log('New ROUND:')

      asteroidQueue.forEach((obj) => {
        let tmpCords = obj.getCollisionBox();
        // console.log(tmpCords);
        // console.log(tmpCords);
        // console.log('X: ' + this.x + '\nY: ' + this.y);
        if(this.x > tmpCords.x && this.x < tmpCords.x + tmpCords.w &&
          this.y > tmpCords.y && this.y < tmpCords.y + tmpCords.h){
            console.log('****************HIT****************');
            removeFromRenderQueue(this);
            removeFromAsteroidQueue(this);
            obj.hitFace(1);
            player.addAmmo(1);
            // this = null;
            // player.ammo += 1;
          }
      })
    }

    checkContact3(){
      renderQueue.forEach((obj) => {
        if(obj.type == 'asteroid'){
          let tmpCords = obj.getCollisionBox();
          if(this.x > tmpCords.x && this.x < tmpCords.x + tmpCords.w &&
            this.y > tmpCords.y && this.y < tmpCords.y + tmpCords.h){
              console.log('****************HIT****************');
              removeFromRenderQueue(this);
              obj.hitFace(1);
              player.addAmmo(1);
              // this = null;
              // player.ammo += 1;
            }
        }
      })
    }


    update(delta){

      // this.checkContact();

      if(this.x > this.w){
        this.x = 0;
      }
      if(this.y > this.h){
        this.y = 0;
      }
      if(this.y < 0){
        this.y = this.h;
      }
      if(this.x < 0){
        this.x = this.w;
      }


      this.x += this.vx * delta;
      this.y += this.vy * delta;

      this.timer += delta;
      if( this.timer > this.burnOutTime ){
        // this.color = 'red';
        player.addAmmo(1);
        removeFromRenderQueue(this);
      } else {
        this.checkContact3();
      }

      // const tmpDist = Math.pow((this.startingX - this.x) , 2) + Math.pow((this.startingY - this.y), 2);
      // const tmpBOD = Math.pow(this.burnOutDist, 2)
      // if(tmpDist > tmpBOD){
      //   this.color = 'red';
      // }

    }

    draw(ctx, interp){
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - (this.size/2), this.y - (this.size/2), this.size, this.size);

    }

  }
  /****************************************
  * End Of Cannonball Section
  *****************************************/

  /****************************************
  * Player Section
  *****************************************/
  class Player {
    constructor(data){
      this.type = 'player';
      this.name = data.name;
      this.health = data.health;
      this.score = data.score;

      this.x = data.x;
      this.y = data.y;
      this.lVelocity = data.lv;
      this.vx = 0.0;
      this.vy = 0.0;
      this.rad = data.r; // Rotation
      this.aVelocity = data.av;
      this.turnL = false;
      this.turnR = false;

      this.burning = false;
      this.firing = false;

      this.alive = true;

      this.color = "white";

      this.h = data.h;
      this.w = data.w;

      this.ammo = data.ammo;
      console.log(this.ammo);

      this.respawnTimer = 0;
      this.respawning = false;
      this.timer = 0;

      this.nextExtraLifeGoal = 10000;
      this.isAlive = true;
      this.slowdown = true;

      this.ranGotNewHSOnce = false;
    }

    gotNewHighscore(){
      let bumpVal = null;
      for(let i = 0; i<tttsd.length; i++){
        if(this.score > tttsd[i]){
          let bumpVal = tttsd[i];
          tttsd[i] = this.score;
          break;
        }
      }
      if(bumpVal != null){
        for(let i = 0; i<tttsd.length; i++){
          if(tttsd[i] == this.score){
            break;
          }else if(tttsd[i+1] == this.score){
            tttsd[i] = bumpVal;
            break;
          }else{
            tttsd[i] = tttsd[i+1];
          }
        }
      }
      console.log(tttsd);
      console.log('Highscore Tally Done')
      window.localStorage.setItem('highscores', JSON.stringify(tttsd));
      this.ranGotNewHSOnce = true;
      return true;
    }

    addToArrConditional(num, arr){

      console.log('========');
      console.log('addToArrConditional: ');
      console.log('Original Array| ' + arr);
      console.log('Original Num| ' + num);

      let abc = undefined;
      for(let i = arr.length -1; i>=0; i--){
        console.log(arr[i]);
        if(num > arr[i]){
          abc = i;
        }
      }

      if(abc != undefined){
        arr.splice(abc, 0, num);
        arr.length = arr.length -1;
        console.log('Modified Array|' + arr);
        return true;
      }else{
        console.log('No Mods Applied' + arr);
        return false;
      }
    }

    gotNewHighscore2(){
      let tmpScore = this.score;
      console.log(tmpScore);
      if(this.addToArrConditional(tmpScore, tttsd)){
        console.log('NEW HIGH SCORE!!!');
        let tmpAlertStr = "SCORE || " + tmpScore + 
        "\nEnter Name . . .";
        // let PlayerName = prompt(tmpAlertStr);
        window.localStorage.setItem('highscores', JSON.stringify(tttsd));
        console.log(tttsd);
      }else{
        console.log('TRY AGAIN???');
      }
    }


    takeDamage(){
      // makeTmpAnim();
      if(this.health - 1 <= 0){
        console.log('Game Over');
        this.health -= 1;
        this.color = 'orange';
        this.ammo = 0;
        this.aVelocity = 0;
        this.lVelocity = 0;
        this.isAlive = false;
        this.slowdown = false;
        if(this.score >= 0 && !this.ranGotNewHSOnce){
          this.ranGotNewHSOnce = true;
          // setHighscore(this.score);
          testScoreRef.current.value = this.score;
          document.getElementById('score-form').style.display = 'grid'
          // TODO highscore Thingy
          // if(this.gotNewHighscore2()){
          //   console.log('YAY!');
          // }
        }
      }else{
        this.respawnTimer = 3000;
        this.respawning = true;
        this.health -= 1;
        this.color = 'red';
      }
    }

    checkContact(){ //TODO not accurate to renderQueue, sometimes you hit midding asteroids :/
      let data = {
        result: false,
        object: null
      }

      asteroidQueue.forEach((obj) => {
        let tmpCords = obj.getCollisionBox();

        if(this.x > tmpCords.x && this.x < tmpCords.x + tmpCords.w &&
          this.y > tmpCords.y && this.y < tmpCords.y + tmpCords.h){
            data = {
              result: true,
              object: obj
            }
            // obj.hitFace();
            // this.takeDamage();
          }
      })

      return data;
    }

    checkContact2(){
      let data = {
        result: false,
        object: null
      }

      renderQueue.forEach((obj) => {
        if(obj.type == 'asteroid'){
          let tmpCords = obj.getCollisionBox();
          if(this.x > tmpCords.x && this.x < tmpCords.x + tmpCords.w &&
            this.y > tmpCords.y && this.y < tmpCords.y + tmpCords.h){
              data = {
                result: true,
                object: obj
              }
              // obj.hitFace();
              // this.takeDamage();
            }
        }
      })

      return data;
    }

    addScore(s){
      this.score += s;
      if(this.score > this.nextExtraLifeGoal){
        this.health += 1;
        this.nextExtraLifeGoal += 10000;
      }
    }

    turnLeft(b){
      this.turnL = b;
    }

    turnRight(b){
      this.turnR = b;
    }

    burnEngine(b){
      this.burning = b;
    }

    fireCannon(b){
      this.firing = b;
    }

    addAmmo(){
      if(this.ammo + 1 <= 4){
        this.ammo += 1;
      }
    }

    takeShot(){

      if(this.isAlive){
        this.ammo -= 1;

        const burnOutTime = 2000;
        const size = 5;

        let tmpVX = 0;
        let tmpVY = 0;
        let tmpLV = 0.75;

        tmpVX = this.vx + (tmpLV * (1 * Math.sin(this.rad)));
        tmpVY = this.vy + (tmpLV * (-1 * Math.cos(this.rad)));

        let tmpX = this.x;
        let tmpY = this.y;

        const data = {
          x: tmpX,
          y: tmpY,
          bot: burnOutTime,
          size: size,
          vx: tmpVX,
          vy: tmpVY,
          color: 'white',
          h: this.h,
          w: this.w
        }

        const ball = new Cannonball(data);
        renderQueue.push(ball);
        this.firing = false;
      }
    }

    respawn(delta){
      this.timer += delta
      this.vx = 0;
      this.vy = 0;
      // makeTmpAnim();
      if(this.timer > this.respawnTimer){
        let cc = this.checkContact2()
        if(cc.result){
          this.respawnTimer += 500;
        }else{
          this.color = 'white';
          this.respawning = false;
          this.timer = 0;
          this.burning = false;
          this.firing = false;
        }
      }else if(this.timer >= this.respawnTimer / 2){
        this.rad = 0.0;
      }else{

      }
    }

    update(delta){
      // The Bounding Box
      if(this.x > this.w){
        this.x = 0;
      }
      if(this.y > this.h){
        this.y = 0;
      }
      if(this.y < 0){
        this.y = this.h;
      }
      if(this.x < 0){
        this.x = this.w;
      }

      if(!this.respawning){
        if(this.turnR){
          this.rad += this.aVelocity * delta;
        }
        else if(this.turnL){
          this.rad -= this.aVelocity * delta;
        }

        // let slowdown = true;

        if(this.burning){
          this.vy -= (this.lVelocity * delta) * Math.cos(this.rad);
          this.vx += (this.lVelocity * delta) * Math.sin(this.rad);
        }
        else if(this.slowdown){ // Slowdown Feature, eventually the craft stops
          if(this.vx != 0){
            if(this.vx > 0){
              this.vx -= (this.vx * 0.001) * delta;
            }
            else if(this.vx < 0){
              this.vx -= (this.vx * 0.001) * delta;
            }
          }
          if(this.vy != 0){
            if(this.vy > 0){
              this.vy -= (this.vy * 0.001) * delta;
            }
            else if(this.vy < 0){
              this.vy -= (this.vy * 0.001) * delta;
            }
          }
        }

        if(this.firing){
          if(this.ammo > 0){
            console.log('firing: ' + this.ammo)
            this.takeShot();
          }
        }

        this.x += this.vx * delta;
        this.y += this.vy * delta;

        // this.checkContact();
        const cc = this.checkContact2()
        // console.log(cc);
        if(cc.result){
          this.takeDamage();
          cc.object.hitFace(0);
        }
      }else{
        this.respawn(delta)
      }


    }

    draw(ctx, interp){
      ctx.strokeStyle = this.color;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rad);

      ctx.beginPath();
      //Left Side
      ctx.moveTo(0, -15);
      ctx.lineTo(-8, 5);
      ctx.stroke();

      //Right Side
      ctx.moveTo(0, -15);
      ctx.lineTo(8, 5);
      ctx.stroke();

      //Bottom
      ctx.moveTo(-8, 5);
      ctx.lineTo(8, 5);
      ctx.stroke();

      //Left Fin
      ctx.moveTo(-8, 5);
      ctx.lineTo(-10, 10);
      ctx.stroke();

      //Right Fin
      ctx.moveTo(8, 5);
      ctx.lineTo(10, 10);
      ctx.stroke();

      //Exhaust
      if(this.burning && !this.respawning && this.isAlive){
        ctx.moveTo(-4, 5);
        ctx.lineTo(0, 15);
        ctx.stroke();

        ctx.moveTo(4, 5);
        ctx.lineTo(0, 15);
        ctx.stroke();
      }

      ctx.restore();
    }
  }
  /****************************************
  * End Of Player Section
  *****************************************/

  /****************************************
  * Asteroid Section
  *****************************************/
  class Asteroid {
    constructor(data){
      this.type = 'asteroid';
      this.health = data.health;
      this.flavor = data.flavor;

      this.x = data.x;
      this.y = data.y;
      this.lVelocity = data.lv;
      this.vx = data.vx;
      this.vy = data.vy;

      // this.vx = 0;
      // this.vy = 0;

      this.rad = data.rad;

      this.color = "white";

      this.h = data.h;
      this.w = data.w;
      this.abb = data.abb;
      this.abc = data.abc;

      this.xTable = [];
      this.yTable = [];

      this.showBB = false;
      // this.isHit = false;

      this.setAsteroidShape();
    }

    setAsteroidShape(){
      let tmpXTable = [];
      let tmpYTable = [];

      switch (this.flavor) {
        case 'Pinched':
          tmpXTable=[ 0, 12, 12, 1, -9, -4,-14,-14,-10,  1,  7, 12, 0];
          tmpYTable=[ 1,  3,  5, 9,  9,  5,  5, -2, -9, -6, -9, -4, 1];
          break;
        case 'Jagged':
          tmpXTable=[ -1, -2,  2, 12, 12,  7, -4,-12, -5,-13,-10, -1];
          tmpYTable=[  0,-10,-10, -2,  3,  8,  9,  5,  0, -2, -8,  0];
          break;
        case 'Lumpy':
          tmpXTable=[ 0,6,12,9,13,6,-7,-11,-11,-5,0];
          tmpYTable=[ 6,10,7,0,-7,-10,-10,-7,7,10,6];
          break;
        case 'Cobbled':
          tmpXTable=[0,6,11,5,12,6,-2,-6,-12,-9,-11,-7,0];
          tmpYTable=[7,10,6,4,0,-9,-6,-9,-5,0,5,10,7];
          break;
        default:
      }

      switch (this.health) {
        case 3:
          this.xTable = tmpXTable.map((e) => {return e * 4} )
          this.yTable = tmpYTable.map((e) => {return e * 4} )
          this.abb = {
            x: this.abb.x.map((e) => {return e * 4}),
            y: this.abb.y.map((e) => {return e * 4})
          };
          this.abc = this.abc * 4;
          break;
        case 2:
          this.xTable = tmpXTable.map((e) => {return e * 2} )
          this.yTable = tmpYTable.map((e) => {return e * 2} )
          this.abb = {
            x: this.abb.x.map((e) => {return e * 2}),
            y: this.abb.y.map((e) => {return e * 2})
          };
          this.abc = this.abc * 2;
          break;
        case 1:
          this.xTable = tmpXTable
          this.yTable = tmpYTable
          break;
        default:
          this.xTable = tmpXTable
          this.yTable = tmpYTable
          break;
      }

    }

    getCollisionBox(){
      const tmpX = this.x - this.abb.x[0];
      const tmpY = this.y - this.abb.y[0];
      const tmpWidth = this.abb.x[0] - this.abb.x[2];
      const tmpHeight = this.abb.y[0] - this.abb.y[2];
      const data = {
        x: tmpX,
        y: tmpY,
        w: tmpWidth,
        h: tmpHeight
      };
      return data;
    }

    generateChildAsteroid(){
      let flavor = '';
      switch(Math.floor(Math.random() * 4)){
        case 0:
          flavor = 'Pinched';
          break;
        case 1:
          flavor = 'Jagged';
          break;
        case 2:
          flavor = 'Lumpy';
          break;
        case 3:
          flavor = 'Cobbled';
          break;
        default:
      }

      const vx = ((Math.random() * 2) -1 ) * 0.1;
      const vy = ((Math.random() * 2) -1 ) * 0.1;

      const asteroidBoundingBox = {
        x:[
          10,10,-10,-10,10
        ],
        y:[
          10,-10,-10,10,10
        ]
      }

      const asteroidBoundingCircle = 15;


      const data = {
        abb: asteroidBoundingBox,
        abc: asteroidBoundingCircle,
        health: this.health - 1,
        flavor: flavor,
        x: this.x,
        y: this.y,
        vx: vx,
        vy: vy,
        rad: 0,
        lv: 0.1,
        h: this.h,
        w: this.w
      }

      let asteroid = new Asteroid(data);

      return asteroid;
    }

    hitFace(pORc){

      if(pORc == 1){
        switch (this.health) {
          case 3:
            player.addScore(20);
            break;
          case 2:
            player.addScore(50);
            break;
          case 1:
            player.addScore(100);
            break;
          default:
            console.log('error');
        }
      } else {
        console.log('player hit by rock');
      }


      // player.addScore(this.health);

      // this.isHit = true;
      if(this.health - 1 > 0){
        let tmpAsteroid1 = this.generateChildAsteroid();
        let tmpAsteroid2 = this.generateChildAsteroid();
        renderQueue.push(tmpAsteroid1);
        renderQueue.push(tmpAsteroid2);
        // asteroidQueue.push(tmpAsteroid1);
        // asteroidQueue.push(tmpAsteroid2);
      }
      removeFromRenderQueue(this);
      // removeFromAsteroidQueue(this);

      // if(this.isHit){this = null;}
      //Add Score To player
      //Remove THIS asteroid
      //spawn two asteroids with -- health at this.x,this.y

    }

    update(delta){
      if(this.x > this.w){
        this.x = 0;
      }
      if(this.y > this.h){
        this.y = 0;
      }
      if(this.y < 0){
        this.y = this.h;
      }
      if(this.x < 0){
        this.x = this.w;
      }


      this.x += this.vx * delta;
      this.y += this.vy * delta;
    }



    draw(ctx, interp){
      ctx.strokeStyle = this.color;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rad);
      // ctx.scale(1,1);

      ctx.beginPath();

      for(let i = 0; i < this.xTable.length - 1; i++){
        ctx.moveTo(this.xTable[i], (-1 * this.yTable[i]));
        ctx.lineTo(this.xTable[i+1], -1 * this.yTable[i+1]);
        ctx.stroke();
      }

      if(this.showBB){
        for(let i = 0; i<4; i++){
          ctx.moveTo(this.abb.x[i],this.abb.y[i]);
          ctx.lineTo(this.abb.x[i+1],this.abb.y[i+1]);
          ctx.stroke()
        }

        ctx.arc(0, 0, this.abc, 0, 2 * Math.PI);
        ctx.stroke();
      }

      ctx.restore();

    }
  }
  /****************************************
  * End Of Asteroid Section
  *****************************************/

  /****************************************
  * Canvas Section
  *****************************************/
  /****************************************
  * DOM Variables
  *****************************************/
  
  
  // const canvas = document.getElementById('game-canvas');
  // const ctx = canvas.getContext('2d');

  // const html = document.documentElement;
  // const html_height = html.clientHeight;
  // const html_width = html.clientWidth;
  // console.log("HTML (H,W) | (" + html_height + ', ' + html_width + ")");

  // canvas.height = html_height - 200;
  // canvas.width = html_width;


  // const width = canvas.width;
  // const height = canvas.height;

  // const fpsDisplay = document.getElementById('fps-display');

  /****************************************
  * Main Loop Variables
  *****************************************/
  let delta = 0;
  let tickrate = 1000 / 60;

  let lastFrameTimeMs = 0;

  let fps = 60;
  let fpsAlpha = 0.9;
  let fpsUpdateInterval = 1000;
  let lastFpsUpdate = 0;
  let framesSinceLastFpsUpdate = 0;
  let numUpdateSteps = 0;

  let running = false;
  let started = false;

  let rafHandle;
  /****************************************
  * Main Loop Stuff
  *****************************************/


  let areThereAsteroids = false;



  function throwRocksScene(){
    // makeTmpPlayer();
    renderQueue.forEach((obj) => {
      let tmpType = obj.type;
      // if(tmpType == 'asteroid'){
      //   areThereAsteroids = true;
      // }
      // if(!areThereAsteroids){
      //   areThereAsteroids = true;
      //   startNextLevel();
      // }
      if(tmpType == 'player'){
        if(renderQueue.length == 1){
          startNextLevel();
        }
      }
      // console.log(tmpType);

      obj.update(delta);
    })
  }

  function update(delta) {
    renderQueue.forEach((obj) => {
      let tmpType = obj.type;
      // if(tmpType == 'asteroid'){
      //   areThereAsteroids = true;
      // }
      // if(!areThereAsteroids){
      //   areThereAsteroids = true;
      //   startNextLevel();
      // }
      if(tmpType == 'player'){
        if(renderQueue.length == 1){
          startNextLevel();
        }
      }
      // console.log(tmpType);

      obj.update(delta);
    })
  }


  /****************************************
  * Graphics Stuff
  *****************************************/
  function draw(interp) {
    ctx.clearRect(0, 0, width, height);

    // ctx.fillStyle = '#CDCDCD';

    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, width, height);

    // ctx.font = '48px serif';
    // ctx.strokeText('HELLO WORLD', 10, 50);

    // player.draw(ctx, interp);

    renderQueue.forEach((obj) => {
      if (typeof obj.drawSprite === "function"){
        obj.drawSprite(ctx, interp); // FIX playerTHIS
      } else {
        obj.draw(ctx, interp);
      }
    })

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(player.score, 75, 80);

    let tmpHealthText = '';
    for(let i = 0; i < player.health ; i++){
      tmpHealthText = tmpHealthText + 'A';
    }
    // tmpHealthText = "\u200F" + tmpHealthText + "\u200F";

    // ctx.fillText("Health: " + player.health, canvas.width - 105 ,50);
    ctx.fillText(tmpHealthText, 75, 100);

  }

  function animate(timestamp) {
    rafHandle = requestAnimationFrame(animate);

    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    begin(timestamp, delta);

    if (timestamp > lastFpsUpdate + fpsUpdateInterval) {
      fps = fpsAlpha * framesSinceLastFpsUpdate * 1000  / (timestamp - lastFpsUpdate) + (1 - fpsAlpha) * fps;

      lastFpsUpdate = timestamp;
      framesSinceLastFpsUpdate = 0;
    }
    framesSinceLastFpsUpdate++;

    // Update, unlinked to framerate
    numUpdateSteps = 0;
    while(delta >= tickrate) {
      update(tickrate);
      delta -= tickrate;
      // Sanity check, breaks if spiral of death starts
      if (++numUpdateSteps >= 240) { // Adds to numUpdateSteps while checking
        panic();
        break;
      }
    }

    draw(delta / tickrate);

    //end(fps); // Doesn't Do Anything Yet

  }

  /****************************************
  * Systems Stuff
  *****************************************/
  function panic() {// Sets delta to 0, Ignoring leftover time
    console.log(`PANIC:\nDelta: ${delta}`);
    delta = 0;
  }


  function begin(timestamp, delta) {// Currently Empty
    // if(player.alive){
    //   if(!!currentRound){
    //     if(currentRound.completed()){makeTmpPlayer();
    //       player.surviveRound();
    //
    //       if(currentRound.isLastRound){
    //         console.log("You Win!!!");
    //         stop();
    //         setTimeout(renderWinPage, 2000);
    //       }
    //     }makeTmpPlayer();
    //     if(currentRound.started && !currentRound.finished){// while currentRound still generating creeps
    //       currentRound.update(timestamp);
    //     }
    //   }
    // } else {
    //   console.log("You Lose!!!");
    //   stop();
    //   //setTimeout(renderLosePage, 2000);
    // }

  }

  function stop() {
    running = false;
    started = false;
    cancelAnimationFrame(rafHandle);
  }

  function start() {
    if (!started) {
      started = true;

      rafHandle = requestAnimationFrame((timestamp) => {
        draw(1); // initial draw
        running = true;
        // Resetting Time Tracking Vars
        lastFrameTimeMs = timestamp;
        lastFpsUpdate = timestamp;
        framesSinceLastFpsUpdate = 0;
        // Starting the main loop
        rafHandle = requestAnimationFrame(animate);
      });
    }
  }

  /****************************************
  * Event Listeners
  *****************************************/

  // canvas.addEventListener('click', (e) => {
  //   // debugger;
  //   console.log("Where Am I Clicking?");
  //   const x = e.clientX - e.target.offsetLeft;
  //   const y = e.clientY - e.target.offsetTop;
  //   console.log(`X: ${e.clientX} | Y: ${e.clientY}`)
  //   // console.log(`X: ${e.target.offsetParent.offsetLeft} | Y: ${e.target.offsetParent.offsetTop}`)
  //   console.log(`X: ${e.target.offsetLeft} | Y: ${e.target.offsetTop}`)
  //   console.log(`X: ${x} | Y: ${y}`)
  // })

  /****************************************
  * End Of Canvas Section
  *****************************************/


  /****************************************
  * Nobs Section
  *****************************************/
  const handleGameReplay = () => {
    renderQueue.length = 0;
    asteroidQueue.length = 0; 

    currentLevel = 1;
    currentSpawnNumber = 4;

    document.addEventListener("contextmenu", (e) => {e.preventDefault()} )
    
    document.addEventListener('keydown', downKey);
    document.addEventListener('keyup', upKey);

    // let qButton = document.getElementById('quarter-button');
  
    document.getElementById('mobile-controls').style.display = 'block';

    document.getElementById('leaderboard').style.display = 'none';
    
    document.getElementById('player-new-score').style.display = 'none';


    makeTmpPlayer();
    start();
  }


  const handleStartButton = () => {
    // setGameIsRunning(true);
    gameIsRunning = true;

    // const tmpGameDiv = document.getElementById('game-div');
    // tmpGameDiv.addEventListener("contextmenu", (e) => {e.preventDefault()});

    document.addEventListener("contextmenu", (e) => {e.preventDefault()});
    // document.addEventListener('scroll', (e) => {e.preventDefault()});
    // document.addEventListener('touchmove', (e) => {e.preventDefault()});

    document.addEventListener('keydown', downKey);
    document.addEventListener('keyup', upKey);

    let qButton = document.getElementById('quarter-button');
    let mControls = document.getElementById('mobile-controls');
    let hScores = document.getElementById('leaderboard');

    qButton.style.display = 'none';
    mControls.style.display = 'block';
    hScores.style.display = 'none';


    console.log('PLAYER SPAWN TEST')
    console.log(player)
    console.log(typeof(player))
    if(typeof(player) == 'undefined'){
      makeTmpPlayer();
    }
    
    // makeTmpAsteroid();
    // makeTmpAsteroid();
    // makeTmpAsteroid();
    start();
    // console.log("Have I Won: 1");
  }

  // startButton.addEventListener('click', () => {
  //   console.log('PLAYER SPAWN TEST')
  //   console.log(player)
  //   console.log(typeof(player))
  //   if(typeof(player) == 'undefined'){
  //     makeTmpPlayer();
  //   }
    
  //   // makeTmpAsteroid();
  //   // makeTmpAsteroid();
  //   // makeTmpAsteroid();
  //   start();
  //   // console.log("Have I Won: 1");
  // })

  const handlePauseButton = () => {
    stop();
  }


  // stopButton.addEventListener('click', () => {
  //   stop();
  // })

  function startNextLevel(){

    asteroidQueue.length = 0;

    for(let i = 0; i < currentSpawnNumber; i++){
      makeTmpAsteroid();
    }

    currentLevel += 1;
    currentSpawnNumber += 2;

    player.ammo = 4;

  }



  /****************************************
  * Asteroid Making
  *****************************************/
  function genAsteroidStats() {
    let ranX = Math.random() * (width);
    let ranY = Math.random() * (height);
    // if(ranX > ((width/2) - 50) || ranX < ((width/2) + 50)){
    //   ranX +=5;
    // }
    // if(ranY > ((height/2) - 50) || ranY < ((height/2) + 50)){
    //   ranY +=5;
    // }
    // ranRad = Math.random() * (Math.PI * 2);
    let ranRad = 0;

    let coords = [ranX, ranY, ranRad];
    let flavor = '';

    switch(Math.floor(Math.random() * 4)){
      case 0:
        flavor = 'Pinched';
        break;
      case 1:
        flavor = 'Jagged';
        break;
      case 2:
        flavor = 'Lumpy';
        break;
      case 3:
        flavor = 'Cobbled';
        break;
      default:
    }

    let vx = ((Math.random() * 2) -1 ) * 0.1;
    let vy = ((Math.random() * 2) -1 ) * 0.1;

    const stats = {
      coords:coords,
      flavor:flavor,
      vx:vx,
      vy:vy
    }

    return stats;
  }

  function makeTmpAsteroid() {
    let h = height;
    let w = width;
    let stats = genAsteroidStats();
    //console.log(stats);
    const asteroidBoundingBox = {
      x:[
        10,10,-10,-10,10
      ],
      y:[
        10,-10,-10,10,10
      ]
    }

    const asteroidBoundingCircle = 15;

    const data = {
      name: 'the_player',
      abc: asteroidBoundingCircle,
      abb: asteroidBoundingBox,
      vx:stats.vx,
      vy:stats.vy,
      health:3,
      flavor:stats.flavor,

      // x: height / 2,
      // y: width /2,

      x:stats.coords[0],
      y:stats.coords[1],

      lv:0.1,
      rad:stats.coords[2],
      h:height,
      w:width
    };
    //const data = {health:3, flavor:'Cobbled', x:100, y:100, lv:0.1, rad:0, h:height, w:width};
    let asteroid = new Asteroid(data);

    if(asteroid.health >= 3){
      console.log('here 1');
      if(asteroid.x > player.x - 50 && asteroid.x < player.x + 50){
        console.log('here 2');
        if(asteroid.y > player.y - 50 && asteroid.y < player.y + 50){
          console.log("Badsteroid: (" + asteroid.x + ", " + asteroid.y + ")");
          // makeTmpAsteroid({health:4, child:false});
          asteroid.x += (150 * (Math.round(Math.random()) * 2 - 1)) ;
          asteroid.y += (150 * (Math.round(Math.random()) * 2 - 1));
        }
      }
    }

    renderQueue.push(asteroid);
    // asteroidQueue.push(asteroid);
  }


  /****************************************
  * Player Making
  *****************************************/
  async function makeTmpPlayer() {
    let h = height;
    let w = width;
    const data = {
      name: "",
      health:3,
      score:0,
      x:width/2,
      y:height/2,
      lv:0.0005,
      r:0.0,
      av:0.003,
      h:h,
      w:w,
      ammo:4
    };
    player = new Player(data);
    console.log(player);
    // setPlayer(tmpPlayer)
    renderQueue.push(player)
  }


  /****************************************
  * Animation Making
  *****************************************/


  function makeTmpAnim() {
    let h = height;
    let w = width;

    const tmpX = [-5  ,   5,-1.5];
    const tmpY = [-2.5,-2.5, 6.5];

    const tmpXTab = [0,-10, 0, 10, -8, 8];
    const tmpYTab = [-15,10,-15,10,5,5];

    let tmpVx = [0,0,0];
    let tmpVy = [0,0,0];

    tmpVx = tmpVx.map((n) => {return n = Math.random()});

    tmpVy = tmpVy.map((n) => {return n = Math.random()});

    const data = {
      x: [0,0,0],
      y: [0,0,0],
      xTable: tmpXTab,
      yTable: tmpYTab,
      r: [0,0,0],
      h: height,
      w: width,
      vXTable: tmpVx,
      vYTable: tmpVy
    }

    anim = new Animtest(data);
    renderQueue.push(anim);
  }


  /****************************************
  * Controls
  *****************************************/

  // document.addEventListener('keydown', downKey);

  // function downKey(e) {
  //   // console.log('DW' + e.code);
  //   switch(e.code){
  //     case 'KeyA':
  //       player.turnLeft(true);
  //       break;
  //     case 'KeyS':
  //       player.turnRight(true);
  //       break;
  //     case 'KeyD':
  //       player.burnEngine(true);
  //       break;
  //     case 'KeyF':
  //       player.fireCannon(true);
  //     default:

  //   }
  // }

  // document.addEventListener('keyup', upKey);

  // function upKey(e) {
  //   // console.log('UP' + e.code);
  //   switch(e.code){
  //     case 'KeyA':
  //       player.turnLeft(false);
  //       break;
  //     case 'KeyS':
  //       player.turnRight(false);
  //       break;
  //     case 'KeyD':
  //       player.burnEngine(false);
  //       break;
  //     default:

  //   }
  // }

  /****************************************
  * End Of Nobs Section
  *****************************************/

  /****************************************
  * End Of Script Section
  *****************************************/

  // const newPlayerNameRef = useRef();
  // const newPlayerScoreRef = useRef();

  const handleGameOver = (newScore) => {
    // if(newScore.score)
    console.log('In Game Over')
    console.log(newScore);
    let parsedNewScore = JSON.parse(newScore.result);
    console.log(parsedNewScore)
    console.log(allScores);

    let newAll = []

    console.log('NEW ALL\n=================================')

    for(let i = 0; i< allScores.length; i++){
      if(allScores[i].score < parsedNewScore.score){
        newAll = [...allScores.slice(0,i)];
        console.log(newAll)
        newAll.push(parsedNewScore);
        newAll = newAll.concat(allScores.slice(i));
        break;
      }
    }

    newAll.length = 10;

    console.log('newALL', newAll)

    // newPlayerNameRef.current.value = parsedNewScore.player_name;
    // newPlayerScoreRef.current.value = parsedNewScore.score;

    let tmpNPN = document.getElementById('npn-id');
    tmpNPN.innerText = parsedNewScore.player_name;
    let tmpNPS = document.getElementById('nps-id');
    tmpNPS.innerText = parsedNewScore.score;

    // let qButton = document.getElementById('quarter-button');
    let mControls = document.getElementById('mobile-controls');
    let hScores = document.getElementById('leaderboard');
    document.getElementById('score-form').style.display = 'none';
    document.getElementById('player-new-score').style.display = 'grid';

    // qButton.style.display = 'none';
    mControls.style.display = 'none';
    hScores.style.display = 'grid';

    // const newLeaderboard = generateLeaderboard(newAll);

    // console.log(newLeaderboard);
    // console.log(JSON.stringify(newLeaderboard))
    // console.log(hScores)
    // hScores.props.children = newLeaderboard;
    // hScores.innerHTML = <>{generateLeaderboard(newAll)}</>;
    // setNewAllScores(newAll);
  }

  const testNameRef = useRef();
  const testScoreRef = useRef();
  const handleTestScore = async (e) => {
    e.preventDefault();

    let tmpBody = {
      player_name: testNameRef.current.value,
      score: testScoreRef.current.value,
    }
    
    if(testNameRef.current.value.length <= 0){
      tmpBody.player_name = 'AAA'
    }

    const response = await fetch(`/api/addScore`, {
      method: 'POST',
      body: JSON.stringify(tmpBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let data = await response.json();
    handleGameOver(data);

  }

  const handleMControlsLD = (e) => { e.preventDefault(); renderQueue[0].turnLeft(true); }
  const handleMControlsLU = (e) => { renderQueue[0].turnLeft(false); }

  const handleMControlsRD = (e) => { e.preventDefault(); player.turnRight(true); }
  const handleMControlsRU = (e) => { player.turnRight(false); }
  
  
  const handleMControlsBD = (e) => { e.preventDefault(); player.burnEngine(true); }
  const handleMControlsBU = (e) => { player.burnEngine(false); }

  const handleMControlsFD = (e) => { e.preventDefault(); player.fireCannon(true); }
  const handleMControlsFU = (e) => { player.fireCannon(false); }

  // Hmmmm Huhhh

  const generateMobileControls = () => {

    console.log('Generating Mobile Controlls', player)

    return(
      <div id='controls' className="bg-grey-300 rounded flex justify-center">
        <button className="rounded max-h-[144px] max-w-[144px] h-[14vw] w-[14vw] bg-white my-2" 
        onMouseDown={handleMControlsLD} 
        onMouseUp={handleMControlsLU} 
        onTouchStart={handleMControlsLD} 
        onTouchEnd={handleMControlsLU}> 
        <p className="sm:text-xl sm:font-bold text-black text-sm font-light">A - Left</p>
        </button>

        <button className="rounded max-h-[144px] max-w-[144px] h-[14vw] w-[14vw] bg-white ml-[6vw] mr-[3vw] my-2" 
        onMouseDown={handleMControlsRD} 
        onMouseUp={handleMControlsRU}
        onTouchStart={handleMControlsRD} 
        onTouchEnd={handleMControlsRU}>
          <p className="sm:text-xl sm:font-bold text-black text-sm font-light">S - Right</p>
        </button>


        <button className="rounded max-h-[144px] max-w-[144px] h-[14vw] w-[14vw] bg-blue-500 mr-[6vw] ml-[3vw] my-2" 
        onMouseDown={handleMControlsBD}
        onMouseUp={handleMControlsBU}
        onTouchStart={handleMControlsBD} 
        onTouchEnd={handleMControlsBU}>
          <p className="sm:text-xl sm:font-bold text-white text-sm font-light">D - Engine</p>
        </button>

        <button className="rounded max-h-[144px] max-w-[144px] h-[14vw] w-[14vw] bg-red-500 my-2" 
        onMouseDown={handleMControlsFD}
        onMouseUp={handleMControlsFU}
        onTouchStart={handleMControlsFD} 
        onTouchEnd={handleMControlsFU}>
          <p className="sm:text-xl sm:font-bold text-white text-sm font-light ">F - Shoot</p>
        </button>

      </div>
    )
  }

  const handlePlayerNameInput = () => {
    let tmpCurrName = testNameRef.current.value;
    console.log(tmpCurrName);
    if(tmpCurrName.length > 3){
      tmpCurrName = tmpCurrName.substring(0,3);
    }
    tmpCurrName = tmpCurrName.toUpperCase();
    testNameRef.current.value = tmpCurrName;
  }

  return(
    <>
      <div id="game-div" className='relative z-10 h-[100vh] w-full'>
        <div className='grid h-full w-full '>
          <div id='canvas-spacer' className="grid place-items-center">
            <div id='leaderboard' className='z-50 grid'>
            <h2 className="font-bold text-8xl text-white mb-12 px-4">ASTEROIDS</h2>
                {generateLeaderboard(allScores)}
                <div>
                  <div id='player-new-score' className='grid place-items-center hidden'>
                    <h3 className='text-5xl text-white mt-8 mb-2'>YOUR SCORE</h3>
                    <div className='grid grid-cols-3 gap-4'>
                        <p className='text-white text-xl'>?.</p>
                        <p className='text-white text-xl w-16' id='npn-id'></p>
                        <p className='text-white text-xl' id='nps-id'></p>
                    </div>
                    <button className="px-4 py-2 mt-6 bg-green-500 hover:bg-green-200 text-white rounded" onClick={handleGameReplay}>REPLAY</button>
                </div>
            </div>
            </div>
            <form id='score-form' onSubmit={handleTestScore} className="hidden grid place-items-center border bg-white z-50 p-4 rounded opacity-85">
              <label className="pb-2">ENTER NAME</label>
              <input placeholder="AAA" className='text-center outline focus:outline-lg rounded py-2' ref={testNameRef} onChange={handlePlayerNameInput}></input>
              <label className="pt-4">YOUR SCORE</label>
              <input placeholder="000"  className='text-center py-2' ref={testScoreRef} disabled={true}></input>
              <button type="submit" className="bg-green-500 hover:bg-green-200 text-white py-2 px-4 rounded">SUBMIT SCORE</button>
            </form>
          </div>
          <canvas className='absolute top-0 left-0 z-10' id='game-canvas'></canvas>
          
          {/* <div style={{height: 'calc(100% - 200px)'}}>Test</div> */}
          <div className="grid place-items-center h-[200px]">
            <a href="#game-div"><button id='quarter-button' onClick={handleStartButton} className="p-8 bg-green-500 hover:bg-green-200 text-white rounded"> Insert Quarter </button></a>  
            <div id='mobile-controls' className="hidden">{generateMobileControls()}</div>
          </div>
          

        </div>
        {/* {generateMobileControls()} */}
      </div>


      {/* <canvas id='game-canvas'></canvas> */}

      {/* <button 
        className="p-2 bg-white rounded" 
        onClick={handleStartButton}
      >
          Start
      </button>
      <button 
        className="p-2 bg-white rounded" 
        onClick={handlePauseButton}
      >
        Pause
      </button> */}

      {/* <button className="p-8 bg-green-500 text-white rounded"> Insert Quarter </button> */}
      
      {/* <div id='controls' className="bg-grey-300 rounded w-full flex justify-center z-50">
        <button className="rounded h-8 w-20 bg-white m-2" 
        onMouseDown={handleMControlsLD} 
        onMouseUp={handleMControlsLU} 
        onTouchStart={handleMControlsLD} 
        onTouchEnd={handleMControlsLU}></button>

        <button className="rounded h-8 w-20 bg-white m-2" 
        onMouseDown={handleMControlsRD} 
        onMouseUp={handleMControlsRU}
        onTouchStart={handleMControlsRD} 
        onTouchEnd={handleMControlsRU}></button>

        <button className="rounded h-8 w-20 bg-blue-500 m-2" 
        onMouseDown={handleMControlsBD}
        onMouseUp={handleMControlsBU}
        onTouchStart={handleMControlsBD} 
        onTouchEnd={handleMControlsBU}></button>

        <button className="rounded h-8 w-20 bg-red-500 m-2" 
        onMouseDown={handleMControlsFD}
        onMouseUp={handleMControlsFU}
        onTouchStart={handleMControlsFD} 
        onTouchEnd={handleMControlsFU}></button>

      </div> */}


      {/* <form onSubmit={handleTestScore} className="border bg-white">
        <input placeholder="AAA" ref={testNameRef}></input>
        <input placeholder="000" ref={testScoreRef}></input>
        <button type="submit">Test Score Add</button>
      </form> */}
      
    </>
  )

}
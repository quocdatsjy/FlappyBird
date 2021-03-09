let cvs = document.getElementById("flappy");
let ctx = cvs.getContext("2d");

// load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeN = new Image();
const pipeS = new Image();
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeN.src = "images/pipeNorth.png";
pipeS.src = "images/pipeSouth.png";

// load audio
const fly = new Audio();
const score = new Audio();
fly.src = "sounds/fly.mp3";
score.src = "sounds/score.mp3";

var pipe = [];
pipe[0]= {
    x:cvs.width,
    y:0
}

// variables
const gap = 85;
var bX = 10;
var bY = 150;
const gravity = 1;
var scor = 0;

// on mouse click
document.addEventListener("keyup", control);

function control(e) {
    if(e.keyCode == 32) {
        jump();
    }
}

function jump() {
    bY -= 10;
    bY -= 10;
    bY -= 10;
    fly.play();
}

// run game
function run() {
    ctx.drawImage(bg, 0, 0);
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeN, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeS, pipe[i].x, pipe[i].y + gap + pipeN.height);
        pipe[i].x--;
        if(pipe[i].x == cvs.width - 178) {
            pipe.push({
                x: cvs.width,
                y:Math.floor(Math.random()*pipeN.height)-pipeN.height
            }
            );
        }

        // detect collistion
        if(bY + bird.height >= cvs.height - fg.height || bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeN.width && 
            (bY <= pipe[i].Y + pipeN.height || bY + bird.height >= pipe[i].y + gap + pipeN.height)) {
            alert("Game over");
            location.reload(); // reload the page
            return;
        }
        if(pipe[i].x == 5) {
            scor++;
            score.play();
        }

    }
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, bX, bY);
    bY += gravity;
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + scor, 10, cvs.height - 20);
    requestAnimationFrame(run);
}

run();
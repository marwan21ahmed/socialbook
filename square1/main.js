var game = document.createElement("div");
game.setAttribute("id", "game");
game.style.width = "300px";
game.style.height = "500px";
game.style.border = "1px solid black";
game.style.margin = "auto";
game.style.position = "relative";
game.style.top = "70px";
game.style.backgroundImage = "linear-gradient(to bottom, #c4baff, #ffffff)";
game.style.overflow = "hidden";
document.body.appendChild(game);

var player = document.createElement("div");
player.setAttribute("id", "player");
player.style.width = "100px";
player.style.height = "100px";
player.style.backgroundColor = "purple";
player.style.position = "absolute";
player.style.top = "400px";
player.style.left = "100px";
game.appendChild(player);

var block = document.createElement("div");
block.setAttribute("class", "block");
block.style.width = "100px";
block.style.height = "100px";
block.style.backgroundColor = "black";
block.style.position = "absolute";
block.style.top = "-100px";
block.style.left = "100px";
game.appendChild(block);

var block1 = document.createElement("div");
block1.setAttribute("class", "block");
block1.style.width = "100px";
block1.style.height = "100px";
block1.style.backgroundColor = "#ED6BB0";
block1.style.position = "absolute";
block1.style.top = "-100px";
block1.style.left = "300px";
game.appendChild(block1);
// ظهور الscore
var scoreElement = document.createElement("div");
scoreElement.setAttribute("id", "score");
scoreElement.style.fontSize = "35px";
scoreElement.style.paddingTop = "10px";
scoreElement.style.textAlign = "center";
game.appendChild(scoreElement);
var scoreValue = 0;

var playerElement = document.getElementById("player");
var blocks = document.getElementsByClassName("block");
function toleft() {
playerElement.style.left = Math.max(0, parseInt(playerElement.style.left) - 100) + "px";
}
function toright() {
playerElement.style.left = Math.min(200, parseInt(playerElement.style.left) + 100) + "px";
}
document.addEventListener('keydown', (event) => {
    if (event.key == "ArrowLeft") toleft();
    else if (event.key == "ArrowRight") toright();
});



for (var i = 0; i < blocks.length; i++) {
let block = blocks[i];
setInterval(() => {
let blockTop = parseInt(window.getComputedStyle(block).getPropertyValue('top'));
let newTop = blockTop + 5;
if (newTop > 500) {
block.style.top = "-100px";
let random= Math.floor(Math.random() * 3) * 100;
block.style.left = random+ "px";
        } else {
            block.style.top = newTop + "px";
        }
        let playerLeft = parseInt(window.getComputedStyle(playerElement).getPropertyValue('left'));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
        if (playerLeft === blockLeft && blockTop < 450 && blockTop > 310) {
            alert(`Game Over !!!!\nYour Score: ${scoreValue}`);
            block.style.top = "-100px";
            scoreValue = 0;
            location.reload();
        }
    }, 10);
}

setInterval(() => {
    scoreValue++;
    scoreElement.innerHTML = `Score: ${scoreValue}`;
}, 1000);


var messages = [
    "Great job! You did it!",
    "You did it!",
    "Amazing! Keep up the good work!",
    "Well done! You're a superstar!",
    "Fantastic! You're crushing it!",
    "You're a superstar!"
];
var randomIndex = Math.floor(Math.random() * messages.length);
var message = messages[randomIndex];
document.getElementById("tip").innerHTML = message;
document.body.appendChild(div);
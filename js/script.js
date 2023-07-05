import Player from "./player.js";

document.addEventListener("DOMContentLoaded", function () {
    const player = new Player(30, 110);
    player.move();
    player.skills();
    player.jump();
    let gameScreen = document.querySelector('.game-screen');
    gameScreen.appendChild(player.element);
});
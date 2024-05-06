'use strict';

import { estimatePoses } from "./Assets/Scripts/posenetSetup.js";
import { Game } from "./Assets/Scripts/game.js";

const videoWidth = 1920;
const videoHeight = 1080;

const videoCanvas = document.getElementById('videoCanvas');
const gameCanvas = document.getElementById('gameCanvas');
const uiCanvas = document.getElementById('uiCanvas');

const videoContext = videoCanvas.getContext('2d');
const gameContext = gameCanvas.getContext('2d');
const uiContext = uiCanvas.getContext('2d');

videoCanvas.width = videoWidth;
videoCanvas.height = videoHeight;
gameCanvas.width = videoWidth;
gameCanvas.height = videoHeight;
uiCanvas.width = videoWidth;
uiCanvas.height = videoHeight;

let lastTimeStamp = 0;
const game = new Game(videoWidth, videoHeight);

function drawGame(timeStamp) {
    const deltaTime = timeStamp - lastTimeStamp;
    lastTimeStamp = timeStamp;
    gameContext.clearRect(0, 0, videoWidth, videoHeight);
    game.draw(uiContext);
    game.update(deltaTime, gameContext);
    requestAnimationFrame(drawGame);
}

estimatePoses(videoCanvas, videoWidth, videoHeight, videoContext);
drawGame(0);
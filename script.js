const gameArea = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const pumpHandle = document.getElementById("pump-handle");
const pumpBody = document.getElementById("pump-body");

let playerScore = 0;
let remainingTime = 30;
let isGameRunning = true;
let balloonMoveSpeed = 30;
let balloonMoveStep = 2;
let balloonsPopped = 0;

const balloonImagePaths = [
    "D:/Ballon_game/Graphics/Symbol 100010.png",
    "D:/Ballon_game/Graphics/Symbol 100009.png",
    "D:/Ballon_game/Graphics/Symbol 100008.png",
    "D:/Ballon_game/Graphics/Symbol 100007.png",
    "D:/Ballon_game/Graphics/Symbol 100006.png",
    "D:/Ballon_game/Graphics/Symbol 100005.png",
    "D:/Ballon_game/Graphics/Symbol 100004.png",
    "D:/Ballon_game/Graphics/Symbol 100003.png",
    "D:/Ballon_game/Graphics/Symbol 100002.png",
    "D:/Ballon_game/Graphics/Symbol 100001.png"
];

const letterImages = [
    "D:/Ballon_game/Graphics/Symbol 10001.png", "D:/Ballon_game/Graphics/Symbol 10002.png", "D:/Ballon_game/Graphics/Symbol 10003.png",
    "D:/Ballon_game/Graphics/Symbol 10004.png", "D:/Ballon_game/Graphics/Symbol 10005.png", "D:/Ballon_game/Graphics/Symbol 10006.png",
    "D:/Ballon_game/Graphics/Symbol 10007.png", "D:/Ballon_game/Graphics/Symbol 10008.png", "D:/Ballon_game/Graphics/Symbol 10009.png",
    "D:/Ballon_game/Graphics/Symbol 10010.png", "D:/Ballon_game/Graphics/Symbol 10011.png", "D:/Ballon_game/Graphics/Symbol 10012.png",
    "D:/Ballon_game/Graphics/Symbol 10013.png", "D:/Ballon_game/Graphics/Symbol 10014.png", "D:/Ballon_game/Graphics/Symbol 10015.png",
    "D:/Ballon_game/Graphics/Symbol 10016.png", "D:/Ballon_game/Graphics/Symbol 10017.png", "D:/Ballon_game/Graphics/Symbol 10018.png",
    "D:/Ballon_game/Graphics/Symbol 10019.png", "D:/Ballon_game/Graphics/Symbol 10020.png", "D:/Ballon_game/Graphics/Symbol 10021.png",
    "D:/Ballon_game/Graphics/Symbol 10022.png", "D:/Ballon_game/Graphics/Symbol 10023.png", "D:/Ballon_game/Graphics/Symbol 10024.png",
    "D:/Ballon_game/Graphics/Symbol 10025.png", "D:/Ballon_game/Graphics/Symbol 10026.png"
];

function spawnBalloon() {
    if (!isGameRunning) return;

    const newBalloon = document.createElement("img");
    newBalloon.src = getRandomBalloonImage();
    newBalloon.classList.add("balloon");
    
    const pumpStartX = 92;
    const pumpStartY = 90;

    newBalloon.style.position = "absolute";
    newBalloon.style.right = `${pumpStartX}px`;
    newBalloon.style.bottom = `${pumpStartY}px`;
    newBalloon.style.transformOrigin = "center bottom";
    newBalloon.style.transform = "scale(0.5)";

    gameArea.appendChild(newBalloon);

    let inflationCount = 0;
    let inflationProcess = setInterval(() => {
        if (!isGameRunning) {
            clearInterval(inflationProcess);
            return;
        }

        inflationCount++;
        newBalloon.style.transform = `scale(${0.5 + inflationCount * 0.2})`;
        animatePump(inflationCount);

        if (inflationCount === 4) {
            clearInterval(inflationProcess);
            moveBalloon(newBalloon);
        }
    }, 500);
}

function getRandomBalloonImage() {
    return balloonImagePaths[Math.floor(Math.random() * balloonImagePaths.length)];
}

function animatePump(inflateStep) {
    if (inflateStep > 3) return;

    pumpHandle.style.transform = "translateY(20px)";
    pumpHandle.style.clipPath = "inset(10px 0px 0px 0px)";
    pumpBody.style.transform = "scaleY(1.1)";
    
    setTimeout(() => {
        pumpHandle.style.transform = "translateY(0px)";
        pumpHandle.style.clipPath = "none";
        pumpBody.style.transform = "scaleY(1)";
    }, 200);
}

function moveBalloon(balloon) {
    let moveInterval = setInterval(() => {
        if (!isGameRunning) {
            clearInterval(moveInterval);
            return;
        }

        let currentRight = parseInt(balloon.style.right);
        let currentBottom = parseInt(balloon.style.bottom);

        if (currentRight >= window.innerWidth - 100) {
            clearInterval(moveInterval);
            gameArea.removeChild(balloon);
        } else {
            balloon.style.bottom = currentBottom + (Math.random() * 2) + "px";
            balloon.style.right = currentRight + balloonMoveStep + "px";
        }
    }, balloonMoveSpeed);

    balloon.addEventListener("click", () => {
        if (!isGameRunning) return;

        clearInterval(moveInterval);
        balloon.src = letterImages[Math.floor(Math.random() * letterImages.length)];
        balloon.classList.add("letter");

        setTimeout(() => {
            gameArea.removeChild(balloon);
        }, 500);

        playerScore++;
        scoreElement.textContent = playerScore;
        balloonsPopped++;

        adjustDifficulty();
    });

    setTimeout(spawnBalloon, 2000);
}

function adjustDifficulty() {
    if (balloonsPopped % 3 === 0) {
        if (balloonMoveSpeed > 15) balloonMoveSpeed -= 3;
        if (balloonMoveStep < 8) balloonMoveStep += 0.3;
    }
}

function startGameTimer() {
    let gameTimer = setInterval(() => {
        if (!isGameRunning) {
            clearInterval(gameTimer);
            return;
        }

        remainingTime--;
        timerElement.textContent = remainingTime;
        
        if (remainingTime <= 0) {
            clearInterval(gameTimer);
            stopGame();
        }
    }, 1000);
}

function stopGame() {
    isGameRunning = false;
    document.querySelectorAll(".balloon").forEach(balloon => balloon.remove());
    alert("Game Over! Your Score: " + playerScore);
}

spawnBalloon();
startGameTimer();

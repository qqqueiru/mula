const inputs = {
    left: false,
    right: false,
    leftResetted: true,
    rightResetted: true,
    start: false,
    exit: false,
}
const gameState = {
    mula: {
        x: 150,
        vx: 0,  // Se permiten velocidades entre -5 y 5
        boundsX: [100, 700],
        maxSpeed: 10,
        speedIncrement: 2,
    },
    apples: [],
    difficulty: 0,
};

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 70 || event.keyCode == 37)  // F or "ArrowLeft"
    {
        if (inputs.leftResetted) {
            inputs.left = true;
            inputs.leftResetted = false;
        }
    }
    if (event.keyCode == 74 || event.keyCode == 39)  // J or "ArrowRight"
    {
        if (inputs.rightResetted) {
            inputs.right = true;
            inputs.rightResetted = false;
        }
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 70 || event.keyCode == 37)  // F or "ArrowLeft"
    {
        inputs.leftResetted = true;
    }
    if (event.keyCode == 74 || event.keyCode == 39)  // J or "ArrowRight"
    {
        inputs.rightResetted = true;
    }
});

function readInputs() {
    // TODO borrar
}
function updateState() {
    if (inputs.left) {
        if (gameState.mula.vx > -gameState.mula.maxSpeed)
        {
            gameState.mula.vx -= gameState.mula.speedIncrement;
        }
        inputs.left = false;
    }
    if (inputs.right) {
        if (gameState.mula.vx <= gameState.mula.maxSpeed)
        {
            gameState.mula.vx += gameState.mula.speedIncrement;
        }
        inputs.right = false;
    }


    if (gameState.mula.x >= gameState.mula.boundsX[0] &&
    gameState.mula.x <= gameState.mula.boundsX[1]) {
        gameState.mula.x += gameState.mula.vx;
    }

    if (gameState.mula.x < gameState.mula.boundsX[0]) {
        gameState.mula.x = gameState.mula.boundsX[0];
    }

    if (gameState.mula.x > gameState.mula.boundsX[1]) {
        gameState.mula.x = gameState.mula.boundsX[1];
    }
}
function draw() {
    const canvas = document.getElementById("mula-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(150, 150, 150)";
    ctx.fill();

    // const p = new Path2D('m 32.423215,101.64019 17.226952,-34.041938 40.65784,-0.107456 14.574913,33.595634 5.69533,-33.778278 9.57132,-29.303957 17.40239,18.23567 8.70119,-1.966633 L 119.79987,14.366847 103.67653,41.180492 43.336938,37.059475 19.922809,60.216901 41.754898,49.8471 Z');
    // ctx.stroke(p);


    // Elipse (círculo) del punto que intersecciona con la elipse de la mula
    {
        ctx.beginPath();
        const x = 600;
        const y = 250;
        const a = 2;
        const b = 2;
        ctx.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fill();
    }

    // Elipse de la mula
    {
        ctx.beginPath();
        const x = gameState.mula.x;
        const y = 500;
        const a = 120;
        const b = 60;
        ctx.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
        ctx.stroke();

        const distanceToEllipse = (x-600)*(x-600)/(a*a) + (y-250)*(y-250)/(b*b);
        if (distanceToEllipse <= 1) {
            alert("La mula ha tocado el punto...");
            return;
        }
    }
}
function loop() {
    readInputs();
    updateState();
    draw();
    window.requestAnimationFrame(loop);
}
function init() {
    window.requestAnimationFrame(loop);
}
init();
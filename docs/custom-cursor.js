// global variables
let pointerPosX = -100, pointerPosY = -100;
let pointerHoverElement = undefined;
let customCursorCanvas = document.createElement("canvas");

function recordPointerPos(event) {
    pointerPosX = event.clientX;
    pointerPosY = event.clientY;
}

function recordPointerHover(event) {
    pointerHoverElement = event.target;
}

function buildCanvasContext(canvas) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    return canvas.getContext("2d");
}

function drawCustomCursor(timestamp) {
    const ctx = buildCanvasContext(customCursorCanvas);

    ctx.clearRect(0, 0, customCursorCanvas.width, customCursorCanvas.height);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

    if (pointerHoverElement instanceof HTMLAnchorElement) {
        let buttonBounds = pointerHoverElement.getBoundingClientRect();
        ctx.roundRect(
            buttonBounds.x - 5,
            buttonBounds.y - 5,
            buttonBounds.width + 10,
            buttonBounds.height + 10,
            10,
        );
    } else {
        ctx.arc(
            pointerPosX,
            pointerPosY,
            15,
            0,
            2 * Math.PI,
        );
    }

    ctx.closePath();
    ctx.stroke();

    window.requestAnimationFrame(drawCustomCursor);
}

window.onload = function () {
    // setup listeners
    window.onpointermove = recordPointerPos;
    window.onpointerover = recordPointerHover;

    // begin custom cursor canvas animation
    customCursorCanvas.id = "customCursorCanvas";
    document.body.appendChild(customCursorCanvas);
    window.requestAnimationFrame(drawCustomCursor);
}
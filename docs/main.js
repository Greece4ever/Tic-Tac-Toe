game = new TicTacToe("x");

let ai = new AI(game);


oponent = AI.o;
PLAYER = AI.x;

game.onPlayerMoveEnd = () => {
    let turn = game.turn == "o" ? AI.o : AI.x;
    if (turn == oponent)
    {
        setTimeout(() => {
            let optimal_move = ai.move( game.optimisedBoard, oponent );
            game.move(optimal_move.position[1], optimal_move.position[0]);    
        }, 100)
    }
}

game.onGameRestart = () => {
    let turn = game.turn == "x" ? AI.x :  AI.o;
    if (turn == oponent)
    {
        let optimal_move = ai.move( game.optimisedBoard, oponent );
        game.move(optimal_move.position[1], optimal_move.position[0]);        
    }
}

function getCanvasImage(canvas) {
    let a = document.createElement("img");
    a.src = canvas.toDataURL("img/png");
    return a;
}

let ctx;
Array.from(document.querySelectorAll("img")).forEach(
    (img, index) => {
        let cv = document.createElement("canvas");
        ctx = cv.getContext("2d");
            cv.width  = 128;
            cv.height = 128;
        
        ctx.beginPath();
            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, cv.width, cv.height)
        ctx.closePath();
        let center = [cv.width / 2, cv.height / 2];
        switch (index)
        {
            case 0:
                Shapes.drawCircles( [ center ], 5 );    
                break;
            case 1:
                Shapes.drawCrosses( [center ] );
        }
        img.src = cv.toDataURL("img/png");
    }
)

function fitRatio(image, screen) { // [width, height]
    let [wi, hi] = image;
    let [ws, hs] = screen;
    let ri = wi / hi;
    let rs = ws / hs;
    return rs > ri ? [wi * hs/hi, hs] : [ws, hi * ws/wi];
}

function resizeCanvas() {
    let delta = canvas.getBoundingClientRect();
    let [w, h] =fitRatio( [200, 200], [window.innerWidth, window.innerHeight - delta.y - 50] );

    canvas.width  = w;
    canvas.height = h;        
    Shapes.clear();
    Shapes.drawBoard(game.board);    
}

window.addEventListener("resize", () => {
    resizeCanvas();
})

let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
resizeCanvas();

Shapes.clear();
Shapes.drawBoard(game.board);

let x = AI.x;
let o = AI.o;


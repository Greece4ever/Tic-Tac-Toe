let game = new TicTacToe("x");

let ai = new AI(game);
let oponent = AI.o;

game.onPlayerMoveEnd = () => {
    // console.log("end", game.turn)
    let turn = game.turn == "o" ? AI.o : AI.x;
    if (turn == oponent)
    {
        let optimal_move = ai.move( game.optimisedBoard, oponent );
        // game.move(...optimal_move.position);
        game.move(optimal_move.position[1], optimal_move.position[0]);
    }
}

Shapes.clear();
Shapes.drawBoard(game.board);

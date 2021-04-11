class AI
{
    static x = 0;
    static o = 1;

    constructor(game)
    {
        this.game = game;
    }

    checkWinner(board)
    {
        // Check Horizoontally
        for (let y=0; y < 3; y++)
        {
            let row_sum = 0;
            for (let x=0; x < 3; x++)
                row_sum += board[y][x];

            switch (row_sum) {
                case 0:
                    return AI.x;
                case 3:
                    return AI.o;
            }
        }

        // check Vertically 
        for (let x=0; x < 3; x++)
        {
            let col_sum = 0;
            for (let y=0; y < 3; y++)
                col_sum += board[y][x];
            
            switch (col_sum)
            {
                case 0:
                    return AI.x;
                case 3:
                    return  AI.o;
            }
        }

        // Left Diagnal
        {
            let d_sum_left = 0;
            for (let i=0; i < 3; i++)
            {
                d_sum_left += board[i][i];
            }    


            switch (d_sum_left)
            {
                case 0:
                    return AI.x;
                case 3:
                    return AI.o;
            }

        }

        // Right diagnal
        {
            let d_sum_right = 0;
            for (let i=2, j=0; i >= 0; i--, j++)
            {
                d_sum_right += board[j][i];
            }    


            switch (d_sum_right)
            {
                case 0:
                    return AI.x;
                case 3:
                    return AI.o;
            }
        }

        return null;
    }
};

function copy(arr) {
    let a= [];
    for (let i=0; i < arr.length; i++)
    {
        a.push(arr[i].slice())
    }
    return a;
}

function printboard(board) {
    let big_str = "";
    for (let y=0; y < 3; y++)
    {
        let str = ""
        for (let x=0; x < 3; x++)
        {
            if (board[y][x] == 1)
                str += "|o";
            else if (board[y][x] == 0)
                str += "|x"
            else
                str += "| "
            if (x == 2)
                str += "|";   
        }
        big_str += str + "\n"
    }
    console.log(big_str);
}

AI.max_reward = 10000
Math.f

let factorials = [
    1,
    2,
    6,
    24,
    120,
    720,
    5040,
    40320,
    362880,
]


let c = 0;


AI.prototype.minimax = function (board, turn, you, parent_node, depth, empty_spots) 
{
    for (let y=0; y < 3; y++)
    {
        for (let x=0; x < 3; x++)
        {
            if (board[y][x] != 50)
                continue;
                
            let b_copy = copy(board);
            b_copy[y][x] = turn;

            let winner = this.checkWinner(b_copy);            
            if (isNaN(this.parent_node_scores[parent_node].score) )
                debugger

            switch (winner)
            {
                case null: // score += 0
                    break;
                case you: // score += 3 (winner)
                    this.parent_node_scores[parent_node].score += factorials[9 - depth] * 1;    
                    return;
                default: // score -= 2 (loser)
                    this.parent_node_scores[parent_node].score -= factorials[9 - depth] * 2;    
                    return;
            }

            this.minimax(b_copy, !turn, you, parent_node, depth + 1, empty_spots - 1);
        }
    }
}

AI.prototype.getEmptySpots = function(board__) 
{
    let empty = 0;
    for (let y=0; y < 3; y++)
    {
        for (let x=0; x < 3; x++)
        {
            if (board__[y][x] != 50)
                continue;
            empty++;
        }
    }
    return empty;
}

AI.prototype.choose_move = function(game_board, you) 
{
    let count = 0;
    this.parent_node_scores = [];

    let empty = this.getEmptySpots(game_board);

    for (let y=0; y < 3; y++)
    {
        for (let x=0; x < 3; x++)
        {
            if (game_board[y][x] != 50)
                continue;
    
            this.parent_node_scores.push( {"position": [y, x], "score": 0} );

            let copy_board = copy(game_board);
            copy_board[y][x] = you;

            let winner = this.checkWinner(copy_board);

            switch (winner)
            {
                case you:   // instant win
                    console.log("instant win");
                    this.parent_node_scores[count].score += 3628800;
                    count++;
                    continue;
                case null:
                    break;
                default: // instant lose
                    console.log("instant lose")
                    this.parent_node_scores[count].score -= 3628800;
                    count++;
                    continue;
            }

            ai.minimax(copy_board, !you, you, count, 1, empty);
            count++;
        }
    }        
    return this.parent_node_scores;
}


AI.prototype.move = function (board, you) {
    let scores = this.choose_move(board, you);

    let max = scores[0].score;
    let index = 0;

    for (let i=1; i < scores.length; i++)
    {
        if (scores[i].score > max)
        {
            max = scores[i].score;
            index = i;
        }
    }

    console.log(scores, max);

    return scores[index];
}


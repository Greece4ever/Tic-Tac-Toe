class TicTacToe
{
    constructor(turn) 
    {
        this.reset_boards();
        this.initialTurn = turn;
        this.turn = turn;
        this.moving = false;

        this.circle_sound = document.getElementById("circle_sound");
        this.cross_sound  = document.getElementById("cross_sound");

        this.score0 = document.getElementById("player0");
        this.score1 = document.getElementById("player1");
        this.scores = [0, 0];
    }

    reset_boards()
    {
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        this.optimisedBoard = [
            [50, 50, 50],
            [50, 50, 50],
            [50, 50, 50]
        ]
    }

    onGameRestart()
    {

    }

    restart_game()
    {
        this.reset_boards();
        this.moving = false;
        this.initialTurn = this.initialTurn == "x" ? "o" : "x";
        this.turn = this.initialTurn;


        Shapes.clear();
        Shapes.drawBoard(this.board);
        this.onGameRestart();
    }

    handleWinner(move)
    {
        if (!move)
            return;

        let color, stroke_color;

        if (move[0] == "x")
        {
            this.score1.innerText = `${Number( this.score1.innerText ) + 1}`
            color = "rgb(47, 168, 237)";
            stroke_color = "rgb(196, 213, 245)";
        }
        else 
        {
            this.score0.innerText = `${Number( this.score0.innerText ) + 1}`
            color = "rgb(247, 47, 66)";
            stroke_color = "rgb(250, 197, 203)";
        }
        
        let P0 = move[1][0];
        let P1 = move[1][1];   
        
        let anim = new LineAnimation(P0, P1, this.board, color, stroke_color, () => setTimeout(() => this.restart_game(), 500) );
        this.moving = true;
        anim.start(0.2);
    };

    onPlayerMoveEnd() {};

    getEmptySpots() 
    {
        let empty = 0;
        for (let y=0; y < 3; y++)
        {
            for (let x=0; x < 3; x++)
            {
                if (this.optimisedBoard[y][x] != 50)
                    continue;
                empty++;
            }
        }
        return empty;
    }
    

    move(x, y)
    {
        if (this.moving)
            return;

        if ( this.board[y][x] !== 0 )
            return false;
        
        if (y < 0 || y > 3 || x < 0 || x > 3)
            return false;
        
        let pos = this.getPosition(x, y);
        this.moving = true;

        if (this.turn == "x")
        {
            let anim = new CanvasAnimation(pos[0] - Shapes.delta, 50);

            anim.onAnimationEnd = () => {
                this.board[y][x] = this.turn;
                this.optimisedBoard[y][x] = this.turn == "x" ? AI.x : AI.o;

                let won = this.playerWon();
                if (won)
                    return this.handleWinner(won);

                else if (this.getEmptySpots() == 0)
                    return setTimeout(() => this.restart_game(), 1000);

                Shapes.clear();
                Shapes.drawBoard(this.board);
        
                this.turn = this.turn == "x" ? "o" : "x";
                this.moving = false;
                this.onPlayerMoveEnd();
            }
            
            this.cross_sound.play();
            anim.animate(0.4,  (len, blur) => {
                Shapes.clear();
                Shapes.drawBoard(this.board);

                Shapes.drawCrosses([[pos[1], pos[2]]], len, 5, "blue", blur);
            });
        }
        else { // o
            let anim = new CanvasAnimation(2 * Math.PI, 50);
            anim.onAnimationEnd = () => {
                this.board[y][x] = this.turn;
                this.optimisedBoard[y][x] = this.turn == "x" ? 0 : 1;

                let won = this.playerWon();
                if (won)
                    return this.handleWinner(won);
                else if (this.getEmptySpots() == 0)
                    return setTimeout(() => this.restart_game(), 1000);

                Shapes.clear();
                Shapes.drawBoard(this.board);
        
                this.turn = this.turn == "x" ? "o" : "x";
                this.moving = false;
                this.onPlayerMoveEnd();
            }

            this.circle_sound.play();
            anim.animate(0.4,  (len, blur) => {
                Shapes.clear();
                Shapes.drawBoard(this.board);
                Shapes.drawCircles([[pos[1], pos[2]]], 5, pos[0] - Shapes.delta, "rgb(217, 48, 48)", blur, len);
            });
        }
    };


    getPosition(x, y)
    {
        let unit = canvas.width / 3;
        let cordX = unit * (x + 1);
        let cordY = unit * (y + 1);

        let radius = unit / 2;

        cordX -= unit / 2 ;
        cordY -= unit / 2 ;

        return [radius, cordX, cordY];

    }

    LeftDiagnal()
    {
        let P0 = this.getPosition(0, 0)
        let P1 = this.getPosition(2, 2)

        P0.shift();
        P1.shift();

        return [P0, P1]
    };

    RightDiagnal()
    {
        let P0 = this.getPosition(2, 0);
        let P1 = this.getPosition(0, 2);

        P0.shift(); P1.shift();
        return [P0, P1];
    }

    Vertical(x)
    {
        let P0 = this.getPosition(x, 0);
        let P1 = this.getPosition(x, 2);
        P0.shift(); P1.shift();

        return [P0, P1];
    }

    Horizontal(y)
    {
        let P0 = this.getPosition(0, y);
        let P1 = this.getPosition(2, y);
        P0.shift(); P1.shift();
        return [P0, P1];        
    }

    playerWon()
    {
        // Check Horizoontally
        for (let y=0; y < 3; y++)
        {
            let row_sum = 0;
            for (let x=0; x < 3; x++)
                row_sum += this.optimisedBoard[y][x];
    
            switch (row_sum) {
                case 0:
                    return ["x", this.Horizontal(y)];
                case 3:
                    return ["o", this.Horizontal(y)];
            }
        }
    
        // check Vertically 
        for (let x=0; x < 3; x++)
        {
            let col_sum = 0;
            for (let y=0; y < 3; y++)
                col_sum += this.optimisedBoard[y][x];
            
            switch (col_sum)
            {
                case 0:
                    return ["x", this.Vertical(x)];
                case 3:
                    return  ["o", this.Vertical(x)];
            }
        }
    
        // Left Diagnal
        {
            let d_sum_left = 0;
            for (let i=0; i < 3; i++)
            {
                d_sum_left += this.optimisedBoard[i][i];
            }    

    
            switch (d_sum_left)
            {
                case 0:
                    return ["x", this.LeftDiagnal()];
                case 3:
                    return  ["o", this.LeftDiagnal()];
            }
    
        }
    
        // Right diagnal
        {
            let d_sum_right = 0;
            for (let i=2, j=0; i >= 0; i--, j++)
            {
                d_sum_right += this.optimisedBoard[j][i];
            }    


            switch (d_sum_right)
            {
                case 0:
                    return ["x", this.RightDiagnal()];
                case 3:
                    return  ["o", this.RightDiagnal()];
            }
        }

        return null;
    }
};

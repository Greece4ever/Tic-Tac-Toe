class TicTacToe
{
    constructor(turn) 
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

        this.turn = turn;
        this.moving = false;
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
                this.optimisedBoard[y][x] = this.turn == "x" ? 0 : 1;
                console.log(this.playerWon());
                Shapes.clear();
                Shapes.drawBoard(this.board);
        
                this.turn = this.turn == "x" ? "o" : "x";
                this.moving = false;
            }

            anim.animate(0.2,  (len, blur) => {
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

                console.log(this.playerWon());

                Shapes.clear();
                Shapes.drawBoard(this.board);
        
                this.turn = this.turn == "x" ? "o" : "x";
                this.moving = false;
            }

            anim.animate(0.2,  (len, blur) => {
                Shapes.clear();
                Shapes.drawBoard(this.board);
                Shapes.drawCircles([[pos[1], pos[2]]], 5, pos[0] - Shapes.delta, "rgb(217, 48, 48)", blur, len);
            });
        }

        // this.board[y][x] = this.turn;

        // Shapes.clear();
        // Shapes.drawBoard(this.board);

        // this.turn = this.turn == "x" ? "o" : "x";
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
                    return "x";
                case 3:
                    return "o";
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
                    return "x";
                case 3:
                    return  "o";
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
                    return "x";
                case 3:
                    return  "o";
            }
    
        }
    
        // Right diagnal
        {
            let d_sum_right = 0;
            for (let i=2; i >= 0; i--)
            {
                d_sum_right += this.optimisedBoard[i][i];
            }    
    
            switch (d_sum_right)
            {
                case 0:
                    return "x";
                case 3:
                    return  "o";
            }
        }
        return null;
    
    }
};



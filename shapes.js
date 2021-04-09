
class Shapes 
{
    static drawCircles(data, lineWidth=5, r=50, color="red", blur=20) {};
    static drawCrosses(data, length=50, lineWidth=5, color="blue", blur=20) {};
    static drawLines(thickness /* number */) {};
    static drawCross(x, y, length)  {};
    static addBackground() {};
    static drawBoard(board) {};
    static clear() { ctx.clearRect(0, 0, canvas.width, canvas.height); };
};


Shapes.drawCircles = function(data, lineWidth=5, r=50, color="rgb(217, 48, 48)", blur=20)
{
    ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = lineWidth;
        ctx.shadowBlur = blur;
        ctx.shadowColor = color;

        for (let i=0; i < data.length; i++)
        {
            ctx.moveTo(data[i][0] + r, data[i][1]);
            ctx.arc(data[i][0], data[i][1], r, 0, 360);
        }
        
        ctx.stroke();
    ctx.closePath();
};


Shapes.drawCross = function(x, y, length) // center
{
    ctx.moveTo(x, y);

    let sin = Math.sin(Math.PI / 4);
    let cos = Math.cos(Math.PI / 4);

    let dy = length * sin;
    let dx = length * cos;

    ctx.lineTo(x + dx, y + dy);
    ctx.moveTo(x, y);

    ctx.lineTo(x - dx, y + dy);
    ctx.moveTo(x, y);

    ctx.lineTo(x - dx, y - dy);
    ctx.moveTo(x, y);

    ctx.lineTo(x + dx, y - dy);
    ctx.moveTo(x, y);
};


Shapes.drawLines = function(thickness /* number */, color="white", blur=20)
{
    ctx.beginPath();

        ctx.shadowBlur = blur;
        ctx.shadowColor = "pink";
        ctx.fillStyle = color;
        ctx.strokeStyle = "black";


        let square_length_x = canvas.width / 3;
        let square_length_y = canvas.height / 3;

        for (let i=1; i <= 2; i++)
        {
            let y = square_length_y * i;
            ctx.rect(0, y, canvas.width, thickness);
        }
        
        for (let i=1; i <= 2; i++)
        {
            let x = square_length_x * i;
            ctx.rect(x, 0, thickness, canvas.height);
        }

        ctx.fill();

    ctx.closePath();
    return [square_length_x, square_length_y];
};


Shapes.drawCrosses = function(data, length=50, lineWidth=5, color="blue", blur=20)
{   
    ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = lineWidth;
        ctx.shadowBlur = blur;
        ctx.shadowColor = color;


        for (let i=0; i < data.length; i++)
        {
            Shapes.drawCross( data[i][0], data[i][1],  length);
        }
        ctx.stroke();
    ctx.closePath();
}


Shapes.addBackground = function()
{
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.shadowBlur = 50;
    ctx.shadowColor = "white";

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
};

Shapes.drawBoard = function(board)
{
    Shapes.clear();
    let [X, Y] = Shapes.drawLines(5);
    
    let radius = X / 2 - 20;
    

    // Shapes.drawCircles([[X / 2, y / 2]], 10, x / 2 - 5 - 20);
    // console.log(x, y)

    let cross = [];
    let circles = [];

    for (let y=0; y < 3; y++)
    {
        for (let x=0; x < 3; x++)
        {
            let item = board[y][x];
            let cordX = X * (x + 1);
            let cordY = Y * (y + 1);

            cordX -= X / 2 ;
            cordY -= Y / 2 ;


            if (item === "x") {                         


                cross.push( [ cordX, cordY ] );


            }            
            else if (item === "o") {
                circles.push( [ cordX, cordY] )
            }
        }
    }

    console.log(circles)
    Shapes.drawCircles(circles, 5, radius);
    Shapes.drawCrosses(cross, radius);
};

// void generate_grid(thickness /* number */)
// {
//     let square_length_x = canvas.width / 3;
//     let square_length_y = canvas.height / 3;

//     for (let i=1; i <= 2; i++)
//     {
//         y = square_length_y * i;
//         ctx.rect(0, y, canvas.width, thickness);
//     }
    
//     for (let i=1; i <= 2; i++)
//     {
//         let x = square_length_x * i;
//         ctx.rect(x, 0, thickness, height);
//     }
// };

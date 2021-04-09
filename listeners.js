function inside(x, y, mouseX, mouseY)
{
    let unit = canvas.width / 3;

    let endX = unit * (x + 1);
    let endY = unit * (y + 1);

    let startX = endX - unit;
    let startY = endY - unit;

    return (startX <= mouseX) && (endX >= mouseX) && (startY <= mouseY) && (endY >= mouseY);
}


canvas.addEventListener("click", (e) => {
    let delta = canvas.getBoundingClientRect();
    let [mouseX, mouseY] = [e.clientX - delta.x, e.clientY - delta.y];


    for (let y=0; y < 3; y++)
    {
        for (let x=0; x < 3; x++)
        {
            if (inside(x, y, mouseX, mouseY))
            {
                game.move(x, y);
            }    
        }
    }
})



class Timer {
    constructor() {
        this.time = 0;
        this.restart();
    }
 
    toSeconds(miliseconds) {
        return miliseconds * 0.001;
    }    
     
    restart() {
        this.time = performance.now();
    }   
 
    getMiliseconds() {
        return performance.now() - this.time;
    }
 
    getElapsedTime() {
        return this.toSeconds(performance.now() - this.time);
    }
}

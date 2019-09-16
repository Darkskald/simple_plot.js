/*This JS module provides some basic functions and objects to interact with the HTML5 canvas*/

function Point2d(x, y) {
    this.x = x;
    this.y = y;

    // default values for point plotting
    this.radius = 5;
    this.fill = "blue";
    this.stroke = "blue";

    this.draw = function () {
        ctx.save()
        ctx.strokeStyle = this.stroke;
        ctx.fillStyle = this.fill;

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0,  Math.PI*2);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }

}

function Axis(origin, end, type){

    this.origin = origin;
    this.end = end;
    this.type = type;

    this.majorTickN = 22;
    this.major_tick_length = 4;

    this.draw = function(ctx) {

        // draw the ax line
        ctx.beginPath();
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }

}

// Visualization of Data
function connectPoints(ctx, pointList) {

    ctx.beginPath();
    ctx.moveTo(pointList[0].x, pointList[0].y);
    pointList[0].draw();

    pointList.slice(1).forEach(function (element) {
        ctx.lineTo(element.x, element.y);
        ctx.stroke();
        element.draw();
    })
}


// top Level object Plot

function Plot(canvas){
    this.totalWidth = canvas.width;
    this.totalHeight = canvas.height;
    this.ctx = canvas.getContext("2d");

    // margins
    this.mTop = this.totalHeight*0.1;
    this.mBot = this.totalHeight*0.1;
    this.mLeft = this.totalWidth*0.1;
    this.mRight = this.totalWidth*0.2;

    this.origin = new Point2d(0+this.mLeft, 0+(this.totalHeight-this.mBot));

    this.xEnd = new Point2d(this.origin.x+(this.totalWidth - this.mLeft - this.mRight), this.origin.y);
    this.yEnd = new Point2d(this.origin.x, 0 + this.mTop);

    // axis
    this.xAxis = new Axis(this.origin, this.xEnd);
    this.yAxis = new Axis(this.origin, this.yEnd);


    // draw
    this.xAxis.draw(this.ctx);
    this.yAxis.draw(this.ctx);



}
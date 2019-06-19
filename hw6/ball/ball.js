function Ball(svg, x, y, id, color, aoa, weight) {
    this.posX = x; 
    this.posY = y; 
    this.color = get_random_color();
    this.radius = weight; 
    this.jumpSize = 1; 
    this.svg = svg; 
    this.id = id; 
    this.aoa = aoa; 
    this.weight = weight;
    if (!this.aoa)
        this.aoa = Math.PI / 7;
    if (!this.weight)
        this.weight = 10;
    this.radius = this.weight;
    this.data = [this.id]; 
    var thisobj = this;

    this.vx = Math.cos(thisobj.aoa) * thisobj.jumpSize; 
    this.vy = Math.sin(thisobj.aoa) * thisobj.jumpSize; 
    this.initialVx = this.vx;
    this.initialVy = this.vy;
    this.initialPosX = this.posX;
    this.initialPosY = this.posY;
    
    this.GoToInitialSettings = function (newjumpSize) {
        thisobj.posX = thisobj.initialPosX;
        thisobj.posY = thisobj.initialPosY;
        thisobj.vx = Math.cos(thisobj.aoa) * newjumpSize; 
        thisobj.vy = Math.sin(thisobj.aoa) * newjumpSize; 
        thisobj.Draw();
    }
    this.Draw = function () {
        var svg = thisobj.svg;
        var ball = svg.selectAll('#' + thisobj.id)
        .data(thisobj.data)
        ;
        ball.enter()
        .append("circle")
        .attr({"id" : thisobj.id, 'class' : 'ball', 'r' : thisobj.radius, 'weight' : thisobj.weight})
        .style("fill", thisobj.color)
        ;
        ball
        
            .attr("cx", thisobj.posX)
            .attr("cy", thisobj.posY)
            ;
       
        var intersectBall = ball.enter()
        .append('circle')
        .attr({ 'id': thisobj.id + '_intersect', 'class': 'intersectBall' });
    }
    this.Move = function () {
        var svg = thisobj.svg;
       
        thisobj.posX += thisobj.vx;
        thisobj.posY += thisobj.vy;
        if (parseInt(svg.attr('width')) <= (thisobj.posX + thisobj.radius)) {
            thisobj.posX = parseInt(svg.attr('width')) - thisobj.radius - 1;
            thisobj.aoa = Math.PI - thisobj.aoa;
            thisobj.vx = -thisobj.vx;
        }
        if ( thisobj.posX < thisobj.radius) {
            thisobj.posX = thisobj.radius+1;
            thisobj.aoa = Math.PI - thisobj.aoa;
            thisobj.vx = -thisobj.vx;
        }
        if (parseInt(svg.attr('height')) < (thisobj.posY + thisobj.radius)) {
            thisobj.posY = parseInt(svg.attr('height')) - thisobj.radius - 1;
            thisobj.aoa = 2 * Math.PI - thisobj.aoa;
            thisobj.vy = -thisobj.vy;
        }
        if (thisobj.posY < thisobj.radius) {
            thisobj.posY = thisobj.radius+1;
            thisobj.aoa = 2 * Math.PI - thisobj.aoa;
            thisobj.vy = -thisobj.vy;
        }
       
        if (thisobj.aoa > 2 * Math.PI)
            thisobj.aoa = thisobj.aoa - 2 * Math.PI;
        if (thisobj.aoa < 0)
            thisobj.aoa = 2 * Math.PI + thisobj.aoa;
        thisobj.Draw();
    }
}
function get_random_color() {
   var letters = 'ABCDE'.split('');
   var color = '#';
   for (var i=0; i<3; i++ ) {
      color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
  }
  return color;
}
function CheckCollision(ball1, ball2) {
var absx = Math.abs(parseFloat(ball2.posX) - parseFloat(ball1.posX));
var absy = Math.abs(parseFloat(ball2.posY) - parseFloat(ball1.posY));
   
    var distance = (absx * absx) + (absy * absy);
    distance = Math.sqrt(distance);
   
    if (distance < (parseFloat(ball1.radius) + parseFloat(ball2.radius))) {
        return true;
    }
    return false;
}
var balls = []; 
var color = d3.scale.category20();

function ProcessCollision(ball1, ball2) {
    if (ball2 <= ball1)
        return;
    if (ball1 >= (balls.length-1) || ball2 >= balls.length )
        return;
    ball1 = balls[ball1];
    ball2 = balls[ball2];
    if ( CheckCollision(ball1, ball2) ) {
       
        var interx = ((ball1.posX * ball2.radius) + ball2.posX * ball1.radius)
        / (ball1.radius + ball2.radius);
        var intery = ((ball1.posY * ball2.radius) + ball2.posY  * ball1.radius)
        / (ball1.radius + ball2.radius);
        
        var intersectBall = svg.select('#' + ball1.id + '_intersect');
        intersectBall.attr({ 'cx': interx, 'cy': intery, 'r': 5 ,'fill': 'black' })
        .transition()
        .duration(500)
        .attr('r', 0);
       
        var vx1 = (ball1.vx * (ball1.weight - ball2.weight)
            + (2 * ball2.weight * ball2.vx )) / (ball1.weight + ball2.weight);
        var vy1 = (ball1.vy * (ball1.weight - ball2.weight)
            + (2 * ball2.weight * ball2.vy)) / (ball1.weight + ball2.weight);
        var vx2 = (ball2.vx * (ball2.weight - ball1.weight)
            + (2 * ball1.weight * ball1.vx)) / (ball1.weight + ball2.weight);
        var vy2 = (ball2.vy * (ball2.weight - ball1.weight)
            + (2 * ball1.weight * ball1.vy)) / (ball1.weight + ball2.weight);
        
        ball1.vx = vx1;
        ball1.vy = vy1;
        ball2.vx = vx2;
        ball2.vy = vy2;
        
        while (CheckCollision(ball1, ball2)) {
            ball1.posX += ball1.vx;
            ball1.posY += ball1.vy;
            ball2.posX += ball2.vx;
            ball2.posY += ball2.vy;
        }
        ball1.Draw();
        ball2.Draw();
    }
}
function Initialize(containerId) {
    var height = document.getElementById(containerId).clientHeight;
    var width = document.getElementById(containerId).clientWidth;
    gContainerId = containerId;
    gCanvasId = containerId + '_canvas';
    gTopGroupId = containerId + '_topGroup';
    var svg = d3.select("#" + containerId).append("svg")
    .attr("id", gCanvasId)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", gTopGroupId)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none");

    balls.push(new Ball(svg, Math.random()*100, 10, 'n1', 'red', Math.PI / 6));
    balls.push(new Ball(svg, Math.random()*200, 50, 'n2', 'green', Math.PI / 6));
    balls.push(new Ball(svg, Math.random()*300, 100, 'n3', 'yellow', Math.PI / 6));
    balls.push(new Ball(svg, Math.random()*400, 150, 'n4', 'orange', Math.PI / 6));
    balls.push(new Ball(svg, Math.random()*500, 200, 'n5', 'pink', Math.PI + Math.PI / 6));
    balls.push(new Ball(svg, Math.random()*600, 250, 'n6', 'blue', Math.PI + Math.PI /6));
    balls.push(new Ball(svg, Math.random()*700, 300, 'n7', 'aqua', Math.PI + Math.PI / 6));
    balls.push(new Ball(svg, Math.random()*800, 400, 'n8', 'brown', Math.PI + Math.PI / 6));
    balls.push(new Ball(svg, Math.random()*900, 500, 'n9', 'purple', Math.PI + Math.PI / 6));
    balls.push(new Ball(svg, Math.random()*1000, 600, 'n10', 'black', Math.PI + Math.PI / 6));
    for (var i = 0; i < balls.length; ++i) {
        balls[i].Draw();
    }
    return svg;
}
var startStopFlag = null;
function StartStopGame() {
    if (startStopFlag == null) {
        d3.timer(function () {
            for (var i = 0; i < balls.length; ++i) {
                var r = balls[i].Move();
                for (var j = i + 1; j < balls.length; ++j) {
                    ProcessCollision(i, j);
                }
            }
            if (startStopFlag == null)
                return true;
            else
                return false;
        }, 500);
        startStopFlag = 1;
        document.getElementById('startStop').innerHTML = 'STOP';
    }
    else {
        startStopFlag = null;
        document.getElementById('startStop').innerHTML = 'RESTART';
    }
}

function OnNumberOfBallsChanged() {
    var o = document.getElementById('numberOfBalls');
    numberOfBalls = o.value;
    balls = balls.slice(0, 10);
    d3.selectAll('.ball').remove();
   
    for (var i = 10; i < numberOfBalls; i++) {
        balls.push(new Ball(svg, 500, 250, 'n'+(i+1).toString(), color = "#" + ((1 << 24) * Math.random() | 0).toString(16), Math.PI / (i%2)==0?10 : (10+i)));
    }
}

    var svg = Initialize('drawArea');
    StartStopGame();
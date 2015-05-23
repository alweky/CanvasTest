var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var counter = 0;
var xOrigin = canvas.width / 2, yOrigin = canvas.height / 2;

var galaxies = new Array();

$(function() {	
	createGalaxy(100,100,500);
	step();
});

function step() {	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGalaxy();
	//updateGalaxy();
	//counter++;
	setTimeout(step, 10);	
}

function drawCircle(x,y) {
	ctx.beginPath();
	ctx.arc(x, y,1,0,2*Math.PI);
	ctx.stroke();
}

function createGalaxy(centX,centY,starCount){
	for (var i = 0; i < starCount; i++)
	{
		var x = centX + 60 * (Math.random() - .5);
		var y = yOrigin - centY + 60 * (Math.random() - .5);
		var s = Math.pow(x - centX, 2) + Math.pow (y - yOrigin + centY, 2);
		while(s > Math.pow (30,2))
		{
			x = centX + 30 * (Math.random() - .5);
			y = yOrigin - centY + 30 * (Math.random() - .5);
			s = Math.pow(x - centX, 2) + Math.pow (y - yOrigin + centY, 2);
		}
		galaxies.push(new star(x,y,0,0))
		drawCircle(x,y);
	}
}

function drawGalaxy(){
	for (var i = 0; i < galaxies.length; i++){
		drawCircle(galaxies[i].x,galaxies[i].y);
		galaxies[i].x += galaxies[i].vx;
		galaxies[i].y += galaxies[i].vy;
		var accTotalX=0;
		var accTotalY=0;
		for (var j = 0; j < galaxies.length; j++){
			if(i != j){
				var acc = gravity(galaxies[i].x,galaxies[i].y,galaxies[j].x,galaxies[j].y);	
				var distance = Math.pow(Math.pow(galaxies[i].x - galaxies[j].x,2) + Math.pow(galaxies[i].y - galaxies[j].y,2),.5);				
				accTotalX += acc * (galaxies[i].x - galaxies[j].x) / distance;
				accTotalY += acc * (galaxies[i].y - galaxies[j].y) / distance;
			}
		}
		galaxies[i].vx += accTotalX * Math.pow(10,13) / Math.pow(10,19);
		galaxies[i].vy += accTotalY * Math.pow(10,13) / Math.pow(10,19);
		console.log(galaxies[i].vx);
	}
}

function star(x,y,vx,vy){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
}

function gravity(x1,y1,x2,y2){
	var gravConstant = 6.67 * Math.pow(10,-11);
	var mass = 2 * Math.pow(10,30) * 30 * Math.pow(10,6);
	var distanceSq = Math.pow(x1-x2,2) + Math.pow(y1-y2,2);
	return gravConstant * mass / distanceSq;
}
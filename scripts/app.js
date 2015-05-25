var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var counter = 0;
var xOrigin = canvas.width / 2, yOrigin = canvas.height / 2;

var solarMass = 2 * Math.pow(10,30), millionYears = 3 * Math.pow(10,11), kpc = 3 * Math.pow(10,19);

var galaxies = new Array();
var gal1x = 500, gal1y = 15, gal2x = 600, gal2y = -15;

$(function() {	
	createGalaxy(gal1x,gal1y,1000);
	createGalaxy(gal2x,gal2y,1000);
	step();
});

function step() {	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGalaxy();
	//updateGalaxy();
	//counter++;
	setTimeout(step, 1);	
}

function drawCircle(x,y,color) {
	ctx.beginPath();
	ctx.arc(x, y,1,0,2*Math.PI);
	ctx.strokeStyle = color;
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
		if(centX == gal1x){
			if(i == 0){
				galaxies.push(new star(centX, centY, 0, 0, 3 * Math.pow(10,9)));
			}
			else{
				galaxies.push(new star(x, y, 0 * kpc / millionYears, 0 * kpc / millionYears, 3 * Math.pow(10,6)));
			}
		}
		else if(centX == gal2x){
			if(i == 0){
				galaxies.push(new star(centX, centY, 0, 0, 3 * Math.pow(10,9)));
			}
			else{
				galaxies.push(new star(x, y, -0 * kpc / millionYears, -0 * kpc / millionYears, 3 * Math.pow(10,6)));
			}
		}
		drawCircle(galaxies[i].x,galaxies[i].y,'rgb(0,0,0)');
	}
}

function drawGalaxy(){
	for (var i = 0; i < galaxies.length; i++){
		if(i < 1000){
			drawCircle(galaxies[i].x,galaxies[i].y,'rgb(0,255,0)');
		}
		else{
			drawCircle(galaxies[i].x,galaxies[i].y,'rgb(0,0,255)');
		}
		galaxies[i].x += galaxies[i].vx * millionYears / kpc;
		galaxies[i].y += galaxies[i].vy * millionYears / kpc;
		var accTotalX=0;
		var accTotalY=0;
		for (var j = 0; j < galaxies.length; j++){
			if(i != j){
				var acc = gravity(galaxies[i].x,galaxies[i].y,galaxies[j].x,galaxies[j].y,galaxies[j].mass);	
				var distance = Math.pow(Math.pow(galaxies[i].x - galaxies[j].x,2) + Math.pow(galaxies[i].y - galaxies[j].y,2),.5);		
				accTotalX -= acc * (galaxies[i].x - galaxies[j].x) / distance;
				accTotalY -= acc * (galaxies[i].y - galaxies[j].y) / distance;
			}
		}
		galaxies[i].vx += accTotalX * millionYears;
		galaxies[i].vy += accTotalY * millionYears;
	}
	drawCircle(550,yOrigin,'rgb(255,0,0)');
	drawCircle(galaxies[0].x,galaxies[0].y,'rgb(255,0,0)');
	drawCircle(galaxies[1000].x,galaxies[1000].y,'rgb(255,0,0)');
}

function star(x,y,vx,vy,mass){
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.mass = mass;
}

function gravity(x1,y1,x2,y2,mas){
	var gravConstant = 6.67 * Math.pow(10,-11);
	var mass = solarMass * mas;
	var distanceSq = (Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2)) * Math.pow(9,38) ;
	return gravConstant * mass / distanceSq;
}
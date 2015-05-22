var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var counter = 0;
var xOrigin = canvas.width / 2, yOrigin = canvas.height / 2;

$(function() {	

	step();
});

function step() {	
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < 5; i++)
	{
		var x = xOrigin + 300 * (Math.random() - .5);
		var y = yOrigin + 300 * (Math.random() - .5);
		var s = Math.pow(x - xOrigin, 2) + Math.pow (y - yOrigin, 2);
		while(s > Math.pow (150,2))
		{
			x = xOrigin + 300 * (Math.random() - .5);
			y = yOrigin + 300 * (Math.random() - .5);
			s = Math.pow(x - xOrigin, 2) + Math.pow (y - yOrigin, 2);
		}
		drawCircle(x,y);
	}
	counter++;
	setTimeout(step, 10);	
}

function drawCircle(x,y) {
	ctx.beginPath();
	ctx.arc(x, y,1,0,2*Math.PI);
	ctx.strokeStyle = getRndColor();
	ctx.stroke();
}

function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
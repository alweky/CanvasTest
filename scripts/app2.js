var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var counter = 0;
var xOrigin = canvas.width / 2, yOrigin = canvas.height / 2;

$(function() {	

	step();
});

function step() {	
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < 500; i++)
	{
		var x = xOrigin + 500 * (Math.random() - .5);
		var y = yOrigin + 500 * (Math.random() - .5);
		var s = Math.pow(x - xOrigin, 2) + Math.pow (y - yOrigin, 2);
		while(s > Math.pow (250,2))
		{
			x = xOrigin + 500 * (Math.random() - .5);
			y = yOrigin + 500 * (Math.random() - .5);
			s = Math.pow(x - xOrigin, 2) + Math.pow (y - yOrigin, 2);
		}
		drawCircle(x,y,Math.pow(s,1/2));
	}
	counter++;
	setTimeout(step, 10);	
}

function drawCircle(x,y,s) {
	ctx.beginPath();
	ctx.arc(x, y,1,0,2*Math.PI);
	ctx.strokeStyle = getRndColor(s);
	ctx.stroke();
}

function getRndColor(s) {
    var r = (255-s)*Math.random()|0,
        g = (255-s)*Math.random()|0,
        b = (255-s)*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
// Require pixi module

//browserify script2.js -o bundle2.js

//setup Pixi renderer

var animeRq;
var epoqueRunning;

var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

var epoque1 = new PIXI.Container();
var epoque2 = new PIXI.Container();

// create a background...
var background1 = PIXI.Sprite.fromImage('assets/button_test_BG.png');
background1.width = renderer.width;
background1.height = renderer.height;
// add background to stage...
epoque1.addChild(background1);

// create a background...
var background2 = PIXI.Sprite.fromImage('assets/a.png');
background2.width = renderer.width;
background2.height = renderer.height;
epoque2.addChild(background2);

epoqueRunning = epoque1;
animate();

document.body.onkeyup = function(e){
	if(e.keyCode == 32){
		// TODO fonction changement de scene
		console.log('changement de scene ');
	}
}

function animate() {
	// render the stage
	renderer.render(epoqueRunning);
	animeRq = requestAnimationFrame(animate);
}

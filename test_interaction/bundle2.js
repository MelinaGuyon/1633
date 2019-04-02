(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
		changeScene();
		console.log('changement de scene ');
	}
}

function animate() {
	// render the stage
	renderer.render(epoqueRunning);
	animeRq = requestAnimationFrame(animate);
}

function changeScene() {
	window.cancelAnimationFrame(animeRq);
	renderer.stop(epoqueRunning);
	epoqueRunning = epoque2;
	animate();
}

},{}]},{},[1]);

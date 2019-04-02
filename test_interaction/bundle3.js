(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Require pixi module

//browserify script3.js -o bundle3.js

//setup Pixi renderer

var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('assets/a.jpeg');

for (var i = 0; i < 10; i++)
{
	createBunny(Math.floor(Math.random() * 800) , Math.floor(Math.random() * 600));
}

function createBunny(x, y)
{
	// create our little bunny friend..
	var bunny = new PIXI.Sprite(texture);

	// enable the bunny to be interactive... this will allow it to respond to mouse and touch events
	bunny.interactive = true;

	// this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
	bunny.buttonMode = true;

	// center the bunny's anchor point
	bunny.anchor.set(0.5);

	// make it a bit bigger, so it's easier to grab
	bunny.scale.set(3);

	// setup events
	bunny
	// events for drag start
		.on('mousedown', onDragStart)
		.on('touchstart', onDragStart)
		// events for drag end
		.on('mouseup', onDragEnd)
		.on('mouseupoutside', onDragEnd)
		.on('touchend', onDragEnd)
		.on('touchendoutside', onDragEnd)
		// events for drag move
		.on('mousemove', onDragMove)
		.on('touchmove', onDragMove);

	// move the sprite to its designated position
	bunny.position.x = x;
	bunny.position.y = y;

	// add it to the stage
	stage.addChild(bunny);
}

requestAnimationFrame( animate );

function animate() {

	requestAnimationFrame(animate);

	// render the stage
	renderer.render(stage);
}

function onDragStart(event)
{
	// store a reference to the data
	// the reason for this is because of multitouch
	// we want to track the movement of this particular touch
	this.data = event.data;
	this.alpha = 0.5;
	this.dragging = true;
}

function onDragEnd()
{
	this.alpha = 1;

	this.dragging = false;

	// set the interaction data to null
	this.data = null;
}

function onDragMove()
{
	if (this.dragging)
	{
		var newPosition = this.data.getLocalPosition(this.parent);
		console.log(newPosition);
		if ( newPosition.x < 450 ) {
			this.position.x = newPosition.x + 1;
		}

		this.position.y = newPosition.y + 1;

	}
}

},{}]},{},[1]);

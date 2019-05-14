function init (element) {
	element[0].addEventListener('mousemove', onMouseMove)
	element[0].addEventListener('touchmove', onMouseMove)
}

function onMouseMove (event) {
	// store a reference to the data
	// the reason for this is because of multitouch
	// we want to track the movement of this particular touch
	this.data = event.data
	let x = event.clientX
  let y = event.clientY
	let mouseDiv = document.getElementsByClassName('mouse')
	mouseDiv[0].style.left = (x - 15) + 'px'
	mouseDiv[0].style.top = (y - 15) + 'px'
}



export default {
	init
}

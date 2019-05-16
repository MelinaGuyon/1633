import store from "../state/store";

function init (element) {
  let zoneClose = document.getElementsByClassName('mouse__close-zone')
  element[0].addEventListener('mousemove', onMouseMove)
  element[0].addEventListener('touchmove', onMouseMove)
  for (let i = 0; i < zoneClose.length; i++) {
    zoneClose[i].addEventListener('click', clickClose)
  }
}

function onMouseMove (event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data
  let x = event.clientX
  let y = event.clientY
  let mouseDiv = document.getElementsByClassName('mouse')

  if (event.target.className === 'mouse__close-zone' || event.target.closest('.mouse__close-zone')) {
	  mouseDiv[0].className = 'mouse active'
	  mouseDiv[0].style.left = (x - 15) + 'px'
	  mouseDiv[0].style.top = (y - 15) + 'px'
  } else {
	  mouseDiv[0].className = 'mouse'
  }
}

function clickClose (event) {
  let element = event.target.closest('.mouse__close')
  let type = element.getAttribute('data-type')
  type += ' mouse__close hide'
  event.target.closest('.mouse__close').className = type
	store.pause.set(false)
}

export default {
  init
}

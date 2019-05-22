import store from "../state/store"
import anime from 'animejs'

function init (element) {
  let zoneClose = document.getElementsByClassName('mouse__close-zone')
  element[0].addEventListener('mousemove', onMouseMove.bind(this))
  element[0].addEventListener('touchmove', onMouseMove)
  for (let i = 0; i < zoneClose.length; i++) {
    zoneClose[i].addEventListener('click', clickClose)
  }

  this.offsetsLeft = []
  this.offsetsTop = []
  this.mouseTarget = null

  this.magnetsElements = document.querySelectorAll('.magnet')
  // for (let i = 0; i < this.magnetsElements.length; i++) {
  //   this.offsetsLeft.push(this.magnetsElements[i].offsetLeft)
  //   this.offsetsTop.push(this.magnetsElements[i].getBoundingClientRect().top)
  // }
}

function onMouseMove (event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data
  let x = event.clientX
  let y = event.clientY
  let mouseDiv = document.getElementsByClassName('mouse')

  // if (event.target.className === 'mouse__close-zone' || event.target.closest('.mouse__close-zone')) {
	  mouseDiv[0].className = 'mouse active'
	  mouseDiv[0].style.left = (x - 15) + 'px'
	  mouseDiv[0].style.top = (y - 15) + 'px'
  // } else {
	//   mouseDiv[0].className = 'mouse'
  // }

  this.mouse = document.querySelector('.mouse.active')
  this.mouseX = this.mouse.offsetLeft + parseInt(getComputedStyle(this.mouse).width, 10) / 2
  this.mouseY = this.mouse.offsetTop + parseInt(getComputedStyle(this.mouse).width, 10) / 2

  for (let i = 0; i < this.magnetsElements.length; i++) {
    this.elementX = this.magnetsElements[i].offsetLeft + parseInt(getComputedStyle(this.magnetsElements[i]).width, 10) / 2
    this.elementY = this.magnetsElements[i].getBoundingClientRect().top + parseInt(getComputedStyle(this.magnetsElements[i]).height, 10) / 2

    if (this.mouseTarget !== this.magnetsElements[i] && this.mouseX <= this.elementX + 40 && this.mouseX >= this.elementX - 40 && this.mouseY >= this.elementY - 40 && this.mouseY <= this.elementY + 40) {      
      this.mouseTarget = this.magnetsElements[i]
      anime({
        targets: this.mouse,
        left: [this.mouse.offsetLeft, this.elementX],
        top: [this.mouse.offsetTop, this.elementY],
        easing: 'easeInOutQuad',
        delay: 100,
        duration: 100
      })
    }
  }
}

function clickClose (event) {
  let element = event.target.closest('.mouse__close')
  let type = element.getAttribute('data-type')
  type += ' mouse__close hide'
  event.target.closest('.mouse__close').className = type
	store.pause.set(true)
}

export default {
  init
}

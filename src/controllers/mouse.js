import store from "../state/store"
import anime from 'animejs'

function init (element) {
  let zoneClose = document.getElementsByClassName('mouse__close-zone')

  element[0].addEventListener('mousemove', onMouseMove.bind(this, element))
  element[0].addEventListener('touchmove', onMouseMove)
  for (let i = 0; i < zoneClose.length; i++) {
    zoneClose[i].addEventListener('click', clickClose)
  }

  this.offsetsLeft = []
  this.offsetsTop = []
  this.mouseTarget = null
  this.mouse = document.querySelector('.mouse')
  this.mouseWidth = getComputedStyle(this.mouse).width
  this.mouseHeight = getComputedStyle(this.mouse).height

  this.magnetsElements = document.querySelectorAll('.magnet')
}

function onMouseMove (element, event) {
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

  this.mouseX = x
  this.mouseY = y

  for (let i = 0; i < this.magnetsElements.length; i++) {

    this.elementX = parseInt(this.magnetsElements[i].offsetLeft, 10) - 5
    this.elementY = parseInt(this.magnetsElements[i].getBoundingClientRect().top, 10) - 2.5
    this.elementWidth = parseInt(getComputedStyle(this.magnetsElements[i]).width, 10) + 10
    this.elementHeight = parseInt(getComputedStyle(this.magnetsElements[i]).height, 10) + 5

    if (this.mouseTarget !== this.magnetsElements[i] && this.mouseX <= this.elementX + 60 && this.mouseX >= this.elementX - 60 && this.mouseY >= this.elementY - 60 && this.mouseY <= this.elementY + 60) {

      this.mouseTarget = this.magnetsElements[i]
      console.log('magnet')

      anime({
        targets: this.mouse,
        left: [this.mouse.offsetLeft, this.elementX],
        top: [this.mouse.offsetTop, this.elementY],
        width: [this.mouseWidth, this.elementWidth],
        height: [this.mouseHeight, this.elementHeight],
        easing: 'easeOutCubic',
        duration: 500
      })

      let that = this

      setTimeout(function () {
        that.magnetDone = true
      }, 800)
    }
  }

  if (this.magnetDone === true) {
    anime({
      targets: this.mouse,
      width: [getComputedStyle(this.mouse).width, this.mouseWidth],
      height: [getComputedStyle(this.mouse).height, this.mouseHeight],
      easing: 'easeOutCubic',
      duration: 100
    })

    this.magnetDone = false
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

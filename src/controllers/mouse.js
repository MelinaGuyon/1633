import store from '../state/store'
import anime from 'animejs'
import Inrtia from 'inrtia'
import { raf } from '@internet/raf'

function init (element) {
  // let zoneClose = document.getElementsByClassName('mouse__close-zone')
  // element[0].addEventListener('mousemove', onMouseMove.bind(this, element))
  // element[0].addEventListener('touchmove', onMouseMove)
  // for (let i = 0; i < zoneClose.length; i++) {
  //   zoneClose[i].addEventListener('click', clickClose)
  // }

  this.cursorContainer = document.querySelector('.cursor-container')
  this.dot = this.cursorContainer.querySelector('.dot')
  this.ring = this.cursorContainer.querySelector('.ring')
  this.innerRing = this.ring.querySelector('.inner')
  this.boundingDot = this.dot.getBoundingClientRect()
  this.boundingRing = this.ring.getBoundingClientRect()

  initInertia(this)
  bind(this)

  // this.mouseTarget = null
  // this.mouse = document.querySelector('.mouse')
  // this.mouseWidth = getComputedStyle(this.mouse).width
  // this.mouseHeight = getComputedStyle(this.mouse).height

  // this.magnetsElements = document.querySelectorAll('.magnet')
}

function bind (ctx) {
  window.addEventListener('mousemove', handleMove.bind(ctx), { passive: true })
  raf.add(updateInertia.bind(ctx))
  setTimeout(() => { bindEls(ctx) }, 1000)
}

function bindEls (ctx) {
  ctx.domElsConcerned = document.querySelectorAll('.magnet')
  ctx.domElsConcerned.forEach((el) => {
    el.addEventListener('mouseenter', handleMouseEnter.bind(ctx, el), { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave.bind(ctx), { passive: true })
  })
}

function unbind () {
  window.removeEventListener('mousemove', this.handleMove, { passive: true })
  this.domElsConcerned.forEach((el) => {
    el.removeEventListener('mouseenter', this.handleMouseEnter, { passive: true })
    el.removeEventListener('mouseleave', this.handleMouseLeave, { passive: true })
  })
  raf.remove(this.updateInertia)
}

function initInertia (ctx) {
  const inrtiaOptions = {
    value: 0,
    friction: 10,
    precision: 5,
    perfectStop: true,
    interpolation: 'linear'
  }
  ctx.inrtia = {
    x: new Inrtia(inrtiaOptions),
    y: new Inrtia(inrtiaOptions)
  }
}

function handleMove (event) {
  this.dot.style.left = (event.clientX - this.boundingDot.width / 2) + 'px'
  this.dot.style.top = (event.clientY - this.boundingDot.height / 2) + 'px'

  let val = 26
  if (this.cursorContainer.classList.contains('reveal')) val = 33
  else if (this.cursorContainer.classList.contains('target')) val = 13
  else if (this.cursorContainer.classList.contains('hold')) val = 10

  const x = event.clientX - val
  const y = event.clientY - val
  this.inrtia.x.to(x)
  this.inrtia.y.to(y)
}

function updateInertia () {
  if (!this.inrtia.x.stopped || !this.inrtia.y.stopped) {
    this.inrtia.y.update()
    this.inrtia.x.update()
    this.ring.style.left = this.inrtia.x.value + 'px'
    this.ring.style.top = this.inrtia.y.value + 'px'
  }
}

function handleMouseEnter (el, event) {
  reveal(this, el)
}

function handleMouseLeave (event) {
  reset(this)
}

function reveal (ctx, el) {
  ctx.cursorContainer.classList.add('reveal')
  console.log(el)
  ctx.elementX = parseInt(el.offsetLeft, 10) - 5
  ctx.elementY = parseInt(el.getBoundingClientRect().top, 10) - 2.5
  ctx.elementWidth = parseInt(getComputedStyle(el).width, 10) + 10
  ctx.elementHeight = parseInt(getComputedStyle(el).height, 10) + 5

  anime({
    targets: ctx.cursorContainer,
    width: ctx.elementWidth,
    height: ctx.elementHeight,
    // left: ctx.elementX,
    // top: ctx.elementY,
    easing: 'easeOutCubic',
    duration: 500
  })
}

function reset (ctx) {
  anime({
    targets: ctx.cursorContainer,
    width: 52,
    height: 52,
    easing: 'easeOutCubic',
    duration: 500
  })

  if (ctx.cursorContainer.classList.contains('hold')) {
    const x = ctx.inrtia.x.targetValue - 16
    const y = ctx.inrtia.y.targetValue - 16
    ctx.inrtia.x.to(x)
    ctx.inrtia.y.to(y)
  }
  ctx.cursorContainer.classList.remove('reveal', 'target', 'hold')
  ctx.innerRing.style.removeProperty('border')
}

/////////////////////////////////////////////////////////////////////

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

      // anime({
      //   targets: this.mouse,
      //   left: [this.mouse.offsetLeft, this.elementX],
      //   top: [this.mouse.offsetTop, this.elementY],
      //   width: [this.mouseWidth, this.elementWidth],
      //   height: [this.mouseHeight, this.elementHeight],
      //   easing: 'easeOutCubic',
      //   duration: 500
      // })

      let that = this

      setTimeout(function () {
        that.magnetDone = true
      }, 800)
    }
  }

  if (this.magnetDone === true) {
    // anime({
    //   targets: this.mouse,
    //   width: [getComputedStyle(this.mouse).width, this.mouseWidth],
    //   height: [getComputedStyle(this.mouse).height, this.mouseHeight],
    //   easing: 'easeOutCubic',
    //   duration: 100
    // })

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

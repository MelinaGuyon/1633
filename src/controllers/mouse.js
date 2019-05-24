import store from '../state/store'
import anime from 'animejs'
import Inrtia from 'inrtia'
import { raf } from '@internet/raf'

let domElsConcerned
let coords = []
let inrtia

let cursorContainer
let dot
let ring
let boundingDot

function init (element) {
  cursorContainer = document.querySelector('.cursor-container')
  dot = cursorContainer.querySelector('.dot')
  ring = cursorContainer.querySelector('.ring')
  boundingDot = dot.getBoundingClientRect()

  initInertia()
  bind()
  bindEls()
}

function bind () {
  window.addEventListener('mousemove', handleMove, { passive: true })
  raf.add(updateInertia)
}

function bindEls () {
  domElsConcerned = document.querySelectorAll('.magnet')
  domElsConcerned.forEach((el, index) => {
    const coord = el.getBoundingClientRect()
    coords[index] = { el: el, left: coord.left, top: coord.top, centerX: coord.left + coord.width / 2, centerY: coord.top + coord.height / 2 }
  })
}

function unbind () {
  window.removeEventListener('mousemove', handleMove, { passive: true })
  raf.remove(updateInertia)
}

function initInertia () {
  const inrtiaOptions = {
    value: 0,
    friction: 10,
    precision: 5,
    perfectStop: true,
    interpolation: 'linear'
  }
  inrtia = {
    x: new Inrtia(inrtiaOptions),
    y: new Inrtia(inrtiaOptions)
  }
}

function handleMove (event) {
  let magnet = false
  dot.style.left = (event.clientX - boundingDot.width / 2) + 'px'
  dot.style.top = (event.clientY - boundingDot.height / 2) + 'px'

  let val = 26
  if (cursorContainer.classList.contains('reveal')) val = 33

  const x = event.clientX - val
  const y = event.clientY - val

  for (let i = 0; i < coords.length; i++) {
    let dx = Math.abs(coords[i].centerX - event.clientX)
    let dy = Math.abs(coords[i].centerY - event.clientY)

    if (dx < 20 && dy < 20) {
      magnet = true
      inrtia.x.to(coords[i].centerX - val)
      inrtia.y.to(coords[i].centerY - val)
      cursorContainer.classList.add('reveal')
    }
  }

  if (!magnet) {
    inrtia.x.to(x)
    inrtia.y.to(y)
    cursorContainer.classList.remove('reveal')
  }
}

function updateInertia () {
  if (!inrtia.x.stopped || !inrtia.y.stopped) {
    inrtia.y.update()
    inrtia.x.update()
    ring.style.left = inrtia.x.value + 'px'
    ring.style.top = inrtia.y.value + 'px'
  }
}

export default {
  init
}

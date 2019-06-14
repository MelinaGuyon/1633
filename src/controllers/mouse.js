import store from '../state/store'
import Inrtia from 'inrtia'
import { raf } from '@internet/raf'
import signals from 'state/signals'

let domElsConcerned
let coords = []
let inrtia

let cursorContainer
let dot
let ring
let boundingDot

let customListen = {}

let holdingPercent = 0
let holding
let holdingCb = null
let intervalHolding

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
  customListen['mouse'] = store['mouse'].listen(handleMove)
  signals.newDom.listen(bindEls)
  raf.add(updateInertia)
}

function bindHolding (cb) {
  document.addEventListener('mousedown', mousedown)
  document.addEventListener('mouseup', mouseup)
  intervalHolding = window.setInterval(checkHolding, 10)
  holdingCb = cb
}

function bindEls () {
  domElsConcerned = document.querySelectorAll('.magnet')
  domElsConcerned.forEach((el, index) => {
    const coord = el.getBoundingClientRect()
    const noMagnetism = el.classList.contains('no-magnetism')
    coords[index] = { el: el, left: coord.left, top: coord.top, centerX: coord.left + coord.width / 2, centerY: coord.top + coord.height / 2, noMagnetism: noMagnetism }
  })
}

function unbind () {
  store['mouse'].unlisten(customListen['mouse'])
  signals.newDom.unlisten(bindEls)
  raf.remove(updateInertia)
}

function unbindHolding () {
  document.removeEventListener('mousedown', mousedown)
  document.removeEventListener('mouseup', mouseup)
  clearInterval(intervalHolding)
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

function handleMove (mouse) {
  let magnet = false
  dot.style.left = (mouse.x - boundingDot.width / 2) + 'px'
  dot.style.top = (mouse.y - boundingDot.height / 2) + 'px'

  let val = 26
  if (cursorContainer.classList.contains('reveal')) val = 33
  if (cursorContainer.classList.contains('reveal-big')) val = 48

  const x = mouse.x - val
  const y = mouse.y - val

  for (let i = 0; i < coords.length; i++) {
    let dx = Math.abs(coords[i].centerX - mouse.x)
    let dy = Math.abs(coords[i].centerY - mouse.y)

    if (dx < 20 && dy < 20 && !coords[i].noMagnetism) {
      magnet = true
      inrtia.x.to(coords[i].centerX - val)
      inrtia.y.to(coords[i].centerY - val)
      cursorContainer.classList.add('reveal')
    }

    if (dx < 150 && dy < 270 && coords[i].noMagnetism) {
      magnet = true
      inrtia.x.to(x)
      inrtia.y.to(y)
      cursorContainer.classList.add('reveal-big')
    }
  }

  if (!magnet) {
    inrtia.x.to(x)
    inrtia.y.to(y)
    cursorContainer.classList.remove('reveal')
    cursorContainer.classList.remove('reveal-big')
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

function mousedown () {
  holding = true
  cursorContainer.classList.add('hold')
  handleMove(store.mouse.get())
}

function mouseup () {
  holding = false
  cursorContainer.classList.remove('hold')
  handleMove(store.mouse.get())
}

function checkHolding () {
  if (holding) holdingPercent += 1
  else holdingPercent = 0
  holdingPercent = Math.max(0, Math.min(100, holdingPercent))

  if (holdingPercent === 100) {
    unbindHolding()
    mouseup()
    holdingCb()
  }
}

export default {
  init,
  bindHolding
}

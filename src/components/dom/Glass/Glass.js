import { DomComponent } from 'abstractions/DomComponent'
import { h } from '@internet/dom'
import { raf } from '@internet/raf'
import anime from 'animejs'
import Inrtia from 'inrtia'
import after from 'lodash/after'
import delay from 'lodash/delay'
import signals from 'state/signals'

import './Glass.styl'
import store from 'state/store'

const transformValues = [
  [-450, -200, 0],
  [180, 220, 10],
  [-90, -250, 200],
  [-40, 30, 10],
  [320, 10, 0],
  [-350, 220, 40],
  [380, 240, 0]
]

// const realValues = [
//   [-159, -150, 0],
//   [-32, -282, 0],
//   [138, -248, 0],
//   [-55, -39, 0],
//   [140, 82, 0],
//   [-46, 252, 0],
//   [0, 312, 0]
// ]

const realValues = [
  [-163, -148, 0],
  [15, -285, 0],
  [140, -201, 0],
  [-61, -27, 0],
  [141, 90, 0],
  [-53, 268, 0],
  [-10, 331, 0]
]

class SingleGlass extends DomComponent {
  template (props) {
    this.id = props.id

    return (
      <img src={`assets/img/${props.path}/glass-` + props.id + '.png'} alt='' />
    )
  }

  componentDidMount () {
    this.matrix = window.getComputedStyle(this.base).transform.replace(/[^0-9\-.,]/g, '').split(',')
    this.initialX = Number(this.matrix[12]) || Number(this.matrix[4])
    this.initialY = Number(this.matrix[13]) || Number(this.matrix[5])

    this.initInertia()
  }

  initInertia () {
    const inrtiaOptions = {
      value: 0,
      friction: 16,
      precision: 5,
      perfectStop: true,
      interpolation: 'linear'
    }
    this.inrtia = {
      x: new Inrtia(inrtiaOptions),
      y: new Inrtia(inrtiaOptions)
    }
    this.inrtia.x.value = transformValues[this.id][0]
    this.inrtia.y.value = transformValues[this.id][1]
  }
}

export default class Glass extends DomComponent {
  template (props) {
    this.autostart = props.autostart
    this.parrent = props.parrent
    this.moovingCb = props.moovingCb

    this.number = 7
    this.singleGlass = Array(this.number)
    this.coords = []

    const singleGlass = []
    const refSingleGlass = i => el => {
      this.singleGlass[i] = el
    }
    for (let i = 0; i < this.number; i++) {
      singleGlass.push(<SingleGlass ref={refSingleGlass(i)} id={i} path={props.path}/>)
    }

    return (
      <div class='glass'>
        {singleGlass}
      </div>
    )
  }

  componentDidMount () {
    if (this.autostart) delay(this.setPosition.bind(this), 500) // better anim perf
    this.construct = this.construct.bind(this)
    this.updateInertia = this.updateInertia.bind(this)
  }

  start () {
    this.setPosition()
  }

  bind () {
    this.binded = true
    this.listenStore('mouse', this.handleMoove)
    raf.add(this.updateInertia)
  }

  unbind () {
    this.binded = false
    this.unlistenStore('mouse', this.handleMoove)
    raf.remove(this.updateInertia)
  }

  setPosition () {
    const callback = after(this.number, () => {
      if (!this.parrent) this.bind()
    })

    this.singleGlass.forEach((el, index) => {
      anime({
        targets: el.base,
        translateX: [0, transformValues[index][0]],
        translateY: [0, transformValues[index][1]],
        rotate: [0, transformValues[index][2]],
        opacity: [0, 1],
        duration: 900,
        easing: 'easeInOutQuad',
        complete: () => {
          const coord = el.base.getBoundingClientRect()
          this.coords[index] = { el: el.base, left: coord.left, top: coord.top, centerX: coord.left + el.base.offsetWidth / 2, centerY: coord.top + el.base.offsetHeight / 2 }
          callback()
        }
      })
    })
  }

  construct () {
    if (this.isConstructed) return
    this.isConstructed = true
    if (!this.parrent) {
      this.unbind()
      signals.newIndication.dispatch(0)
    }
    this.singleGlass.forEach((el, index) => {
      anime({
        targets: el.base,
        translateX: el.initialX,
        translateY: el.initialY,
        rotate: '0deg',
        duration: 900,
        easing: 'easeInOutQuart',
        complete: () => {
          if (!this.parrent) {
            delay(() => store.started.set(true), 600)
          } else {
            const coord = el.base.getBoundingClientRect()
            this.coords[index] = { el: el.base, left: coord.left, top: coord.top, centerX: coord.left + el.base.offsetWidth / 2, centerY: coord.top + el.base.offsetHeight / 2 }
            this.handleMoove(store.mouse.get(), true)
          }
        }
      })
    })
  }

  getCoords () {
    this.singleGlass.forEach((el, index) => {
      const coord = el.base.getBoundingClientRect()
      this.coords[index] = { el: el.base, left: coord.left, top: coord.top + store.chronologieOffset.get().y, centerX: coord.left + el.base.offsetWidth / 2, centerY: (coord.top + el.base.offsetHeight / 2) + store.chronologieOffset.get().y }
    })
  }

  handleMoove (mouse, force) {
    let values = this.isConstructed ? realValues : transformValues
    let distToCheck = this.isConstructed ? 120 : 180
    let disvision = this.isConstructed ? 6 : 4

    let mooving = false

    this.singleGlass.forEach((el, index) => {
      if (!this.coords[index]) return
      let offsetX = 0
      let offsetY = 0
      if (this.parrent) {
        // offsetX = store.chronologieOffset.get().x
        offsetY = store.chronologieOffset.get().y
      }
      let dx = this.coords[index].centerX - mouse.x - offsetX
      let dy = this.coords[index].centerY - mouse.y - offsetY

      // if (dx < 180 && dx > -180 && dy < 180 && dy > -180) {
      if (dx < distToCheck && dx > -distToCheck && dy < distToCheck && dy > -distToCheck) {
        let x = values[index][0] + dx / disvision
        let y = values[index][1] + dy / disvision

        mooving = true

        if (!force) {
          el.inrtia.x.to(x)
          el.inrtia.y.to(y)
        } else {
          el.inrtia.x.value = x
          el.inrtia.y.value = y
          el.base.style.transform = `translateX(${el.inrtia.x.value}px) translateY(${el.inrtia.y.value}px) rotate(${values[index][2]}deg)`
        }
      } else {
        if (!force) {
          el.inrtia.x.to(values[index][0])
          el.inrtia.y.to(values[index][1])
        } else {
          el.inrtia.x.value = values[index][0]
          el.inrtia.y.value = values[index][1]
          el.base.style.transform = `translateX(${el.inrtia.x.value}px) translateY(${el.inrtia.y.value}px) rotate(${values[index][2]}deg)`
        }
      }
    })

    this.moovingCb && this.moovingCb(mooving)
  }

  updateInertia () {
    let values = this.isConstructed ? realValues : transformValues
    this.singleGlass.forEach((el, index) => {
      if (!el.inrtia.x.stopped || !el.inrtia.y.stopped) {
        el.inrtia.y.update()
        el.inrtia.x.update()

        el.base.style.transform = `translateX(${el.inrtia.x.value}px) translateY(${el.inrtia.y.value}px) rotate(${values[index][2]}deg)`
      }
    })
  }
}

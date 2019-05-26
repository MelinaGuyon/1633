import { DomComponent } from 'abstractions/DomComponent'
import { h } from '@internet/dom'
import { raf } from '@internet/raf'
import anime from 'animejs'
import Inrtia from 'inrtia'
import after from 'lodash/after'

import './Glass.styl'

const transformValues = [
  [-450, -200, 0],
  [180, 220, 10],
  [-90, -250, 200],
  [-40, 30, 10],
  [320, 10, 0],
  [-350, 220, 40],
  [380, 240, 0]
]

class SingleGlass extends DomComponent {
  template (props) {
    this.id = props.id

    return (
      <img src={'assets/img/glass/glass-' + props.id + '.png'} alt='' />
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
  template ({ base }) {
    this.number = 7
    this.singleGlass = Array(this.number)
    this.coords = []

    const singleGlass = []
    const refSingleGlass = i => el => {
      this.singleGlass[i] = el
    }
    for (let i = 0; i < this.number; i++) {
      singleGlass.push(<SingleGlass ref={refSingleGlass(i)} id={i} />)
    }

    return (
      <div class='glass'>
        {singleGlass}
      </div>
    )
  }

  componentDidMount () {
    setTimeout(this.setPosition.bind(this), 1000)
    setTimeout(this.construct.bind(this), 5000) // temp
  }

  bind () {
    this.listenStore('mouse', this.handleMoove)
    raf.add(this.fastbind('updateInertia'))
  }

  unbind () {
    // TODO : do the unbind
    this.unlistenStore('mouse', this.handleMoove)
    raf.remove(this.updateInertia)
  }

  setPosition () {
    const callback = after(this.number, () => {
      this.bind()
    })

    this.singleGlass.forEach((el, index) => {
      anime({
        targets: el.base,
        translateX: [0, transformValues[index][0]],
        translateY: [0, transformValues[index][1]],
        rotate: [0, transformValues[index][2]],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
        complete: () => {
          const coord = el.base.getBoundingClientRect()
          this.coords[index] = { el: el.base, left: coord.left, top: coord.top, centerX: coord.left + el.base.offsetWidth / 2, centerY: coord.top + el.base.offsetHeight / 2 }
          callback()
        }
      })
    })
  }

  construct () {
    this.unbind()
    this.singleGlass.forEach((el) => {
      anime({
        targets: el.base,
        translateX: el.initialX,
        translateY: el.initialY,
        rotate: '0deg',
        duration: 900,
        easing: 'easeInOutQuart'
      })
    })
  }

  handleMoove (mouse) {
    this.singleGlass.forEach((el, index) => {
      let dx = this.coords[index].centerX - mouse.x
      let dy = this.coords[index].centerY - mouse.y

      if (dx < 140 && dx > -140 && dy < 140 && dy > -140) {
        let x = transformValues[index][0] + dx / 3
        let y = transformValues[index][1] + dy / 3

        el.inrtia.x.to(x)
        el.inrtia.y.to(y)
      } else {
        el.inrtia.x.to(transformValues[index][0])
        el.inrtia.y.to(transformValues[index][1])
      }
    })
  }

  updateInertia () {
    this.singleGlass.forEach((el, index) => {
      if (!el.inrtia.x.stopped || !el.inrtia.y.stopped) {
        el.inrtia.y.update()
        el.inrtia.x.update()

        el.base.style.transform = `translateX(${el.inrtia.x.value}px) translateY(${el.inrtia.y.value}px) rotate(${transformValues[index][2]}deg)`
      }
    })
  }
}

import { DomComponent } from 'abstractions/DomComponent'
import { h } from '@internet/dom'
import anime from 'animejs'

import './Glass.styl'

class SingleGlass extends DomComponent {
  template (props) {
    console.log('je passe')
    return (
      <img src={'assets/img/glass/glass-' + props.id + '.png'} alt='' />
    )
  }

  componentDidMount () {
    this.matrix = window.getComputedStyle(this.base).transform.replace(/[^0-9\-.,]/g, '').split(',')
    this.initialX = Number(this.matrix[12]) || Number(this.matrix[4])
    this.initialY = Number(this.matrix[13]) || Number(this.matrix[5])
  }
}

export default class Glass extends DomComponent {
  template ({ base }) {
    this.number = 7
    this.singleGlass = Array(this.number)

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
    this.setPosition()
    setTimeout(this.construct.bind(this), 2000) // temp
  }

  setPosition () {
    this.singleGlass.forEach((el) => {
      let randomX = Math.floor(Math.random() * 1001) - 500
      let randomY = Math.floor(Math.random() * 601) - 300
      let randomRotate = Math.floor(Math.random() * 200) - 100

      el.base.style.transform = `translateX(${(randomX)}px) translateY(${(randomY)}px) rotate(${randomRotate}deg)`
    })
  }

  construct () {
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
}

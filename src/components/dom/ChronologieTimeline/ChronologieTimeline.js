import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import delay from 'lodash/delay'

import './ChronologieTimeline.styl'

class Stick extends DomComponent {
  template (props) {

    return (
      <div class='stick-container' ref={addRef(this, 'stick-container')}>
        <div class='stick' ref={addRef(this, 'stick')} />
      </div>
    )
  }
}

export default class ChronologieTimeline extends DomComponent {
  template ({ base }) {
    this.stickNumber = 65
    this.currentStick = 33
    this.refCurrentStick = 33
    this.plageAround = 18
    this.currentIndex = 0
    this.sticks = Array(this.stickNumber)

    const sticks = []
    const refSticks = i => el => {
      this.sticks[i] = el
    }
    for (let i = 0; i < this.stickNumber; i++) {
      sticks.push(<Stick ref={refSticks(i)} id={i} />)
    }

    return (
      <div class='chrono-timeline' ref={addRef(this, 'chronoTimeline')}>
        <div class='container'>
          <div class='span-container'>
            <span ref={addRef(this, 'span')}>1253</span>
          </div>
          <div class='stick-global-container'>
            {sticks}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.updateStick()
    this.bind()
  }

  bind () {
    this.listenStore('chronologieCurrent', this.updateCurrent)
  }

  updateCurrent (infos) {
    let halfHeight = store.size.get().h / 2
    let ratio = infos.dist / halfHeight
    let stick = this.refCurrentStick + Math.round(ratio * this.plageAround)
    let opacity = 1 - Math.abs(ratio)

    this.currentStick = stick
    this.updateStick(infos.el.date, opacity)
  }

  updateStick (text, opacity) {
    this.sticks.forEach((el) => {
      el.stick.style.transform = 'scaleX(0.22)'
    })

    this.sticks[this.currentStick - 2].stick.style.transform = 'scaleX(0.5)'
    this.sticks[this.currentStick - 1].stick.style.transform = 'scaleX(0.7)'

    this.sticks[this.currentStick].stick.style.transform = 'scaleX(1)'
    this.span.style.transform = `translateY(calc(-220% + ${this.sticks[this.currentStick].base.offsetTop - this.chronoTimeline.offsetTop / 2}px))`
    this.span.innerText = text
    this.span.style.opacity = opacity

    this.sticks[this.currentStick + 1].stick.style.transform = 'scaleX(0.7)'
    this.sticks[this.currentStick + 2].stick.style.transform = 'scaleX(0.5)'
  }
}

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'

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
    this.startDate = 1200
    this.endDate = 2020
    this.yearsPlage = 20

    this.stickNumber = (this.endDate - this.startDate) / this.yearsPlage
    this.currentStick = 0
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
          <span ref={addRef(this, 'span')}>1253</span>
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
    this.listenStore('chronologieTimelineVisible', this.updateTimeline)
  }

  updateTimeline (visible) {
    if (visible) this.chronoTimeline.classList.add('visible')
    else this.chronoTimeline.classList.remove('visible')
  }

  updateCurrent (infos) {

    // if (this.currentIndex !== infos.index) {
    //   console.log(infos)
    // }

    // console.log(infos.date)
    let dateCompteur = this.startDate
    let date
    let index
    for (let i = 0; i < this.stickNumber; i++) {
      dateCompteur = this.startDate + this.yearsPlage * i
      if (infos.date > dateCompteur) {
        date = dateCompteur
        index = i
      }
    }

    console.log(date, index)
    this.currentStick = index

    // let halfHeight = store.size.get().h / 2
    // let ratio = infos.dist / halfHeight
    // let stick = this.refCurrentStick + Math.round(ratio * this.plageAround)
    // let opacity = 1 - Math.abs(ratio)

    // this.currentStick = stick
    this.updateStick(date)
  }

  updateStick (text, opacity) {
    this.sticks.forEach((el) => {
      el.stick.style.transform = 'scaleX(0.22)'
    })

    if (this.sticks[this.currentStick - 2]) this.sticks[this.currentStick - 2].stick.style.transform = 'scaleX(0.5)'
    if (this.sticks[this.currentStick - 1]) this.sticks[this.currentStick - 1].stick.style.transform = 'scaleX(0.7)'

    this.sticks[this.currentStick].stick.style.transform = 'scaleX(1)'
    this.span.style.transform = `translateY(calc(-51% + ${this.sticks[this.currentStick].base.offsetTop}px))`
    this.span.innerText = text
    // this.span.style.opacity = opacity

    if (this.sticks[this.currentStick + 1]) this.sticks[this.currentStick + 1].stick.style.transform = 'scaleX(0.7)'
    if (this.sticks[this.currentStick + 2]) this.sticks[this.currentStick + 2].stick.style.transform = 'scaleX(0.5)'
  }
}

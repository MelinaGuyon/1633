import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import sortBy from 'lodash/sortBy'

import './ChronologieTimeline.styl'

const chrono = sortBy(store.chronologie.get().chrono, [(d) => { return d.date }])
const startDate = 1200
const endDate = 2020
const yearsPlage = 20

class Stick extends DomComponent {
  template (props) {
    return (
      <div class='stick-container' data-id={props.id} ref={addRef(this, 'stickContainer')}>
        <div class='stick ' ref={addRef(this, 'stick')} />
      </div>
    )
  }

  componentDidMount () {
    this.date = startDate + yearsPlage * this.props.id
    chrono.forEach((el) => {
      const dist = Math.abs(el.date - this.date)
      if (this.date < el.date && dist <= 20) {
        this.clickable = true
        this.base.classList.add('clickable')
      }
    })
  }
}

export default class ChronologieTimeline extends DomComponent {
  template ({ base }) {
    this.stickNumber = (endDate - startDate) / yearsPlage
    this.currentStick = 0
    this.currentIndex = null

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
          <span ref={addRef(this, 'span')} />
          <div class='stick-global-container'>
            {sticks}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.reset = this.reset.bind(this)
    this.stickMousehover = this.stickMousehover.bind(this)
    this.stickClick = this.stickClick.bind(this)

    this.updateStick()
    this.bind()
  }

  bind () {
    this.listenStore('chronologieCurrent', this.updateCurrent)
    this.listenStore('chronologieTimelineVisible', this.updateTimeline)
  }

  internalBind () {
    this.chronoTimeline.addEventListener('mouseleave', this.reset)
    this.sticks.forEach((el) => {
      if (el.clickable) {
        el.base.addEventListener('mouseover', this.stickMousehover)
        el.base.addEventListener('click', this.stickClick)
      }
    })
  }

  internalUnbind () {
    this.chronoTimeline.removeEventListener('mouseleave', this.reset)
    this.sticks.forEach((el) => {
      if (el.clickable) {
        el.base.removeEventListener('mouseover', this.stickMousehover)
        el.base.removeEventListener('click', this.stickClick)
      }
    })
  }

  updateTimeline (visible) {
    if (visible) {
      this.chronoTimeline.classList.add('visible')
      this.internalBind()
    } else {
      this.chronoTimeline.classList.remove('visible')
      this.internalUnbind()
    }
  }

  updateCurrent (infos) {
    if (this.currentIndex !== infos.index) {
      let dateCompteur = startDate
      let date
      let index
      for (let i = 0; i < this.stickNumber; i++) {
        dateCompteur = startDate + yearsPlage * i
        if (infos.date >= dateCompteur) {
          date = dateCompteur
          index = i
        }
      }
      this.currentStick = index
      this.currentIndex = infos.index
      this.updateStick(date)
    }
  }

  updateStick (text, hovering) {
    this.sticks.forEach((el) => {
      if (!hovering) {
        if (el.clickable) el.stick.style.transform = 'scaleX(0.2) translateY(-50%)'
        else el.stick.style.transform = 'scaleX(0.09) translateY(-50%)'
      }
    })

    if (this.sticks[this.currentStick - 2]) this.sticks[this.currentStick - 2].stick.style.transform = 'scaleX(0.5) translateY(-50%)'
    if (this.sticks[this.currentStick - 1]) this.sticks[this.currentStick - 1].stick.style.transform = 'scaleX(0.7) translateY(-50%)'

    this.sticks[this.currentStick].stick.style.transform = 'scaleX(1) translateY(-50%)'
    if (!hovering) {
      this.span.style.transform = `translateY(calc(-25% + ${this.sticks[this.currentStick].base.offsetTop}px))`
      this.span.innerText = text
      this.text = text
    }

    if (this.sticks[this.currentStick + 1]) this.sticks[this.currentStick + 1].stick.style.transform = 'scaleX(0.7) translateY(-50%)'
    if (this.sticks[this.currentStick + 2]) this.sticks[this.currentStick + 2].stick.style.transform = 'scaleX(0.5) translateY(-50%)'
  }

  stickMousehover (e) {
    let id = Number(e.target.closest('.stick-container').getAttribute('data-id'))
    this.updateStickHover(id)
  }

  updateStickHover (id) {
    this.sticks.forEach((el, index) => {
      if (index <= this.currentStick + 2 && index >= this.currentStick - 2) return
      if (el.clickable) el.stick.style.transform = 'scaleX(0.22) translateY(-50%)'
      else el.stick.style.transform = 'scaleX(0.09) translateY(-50%)'
    })
    this.updateStick('', true)

    if (this.sticks[id - 2]) this.sticks[id - 2].stick.style.transform = 'scaleX(0.5) translateY(-50%)'
    if (this.sticks[id - 1]) this.sticks[id - 1].stick.style.transform = 'scaleX(0.7) translateY(-50%)'

    this.sticks[id].stick.style.transform = 'scaleX(1) translateY(-50%)'
    this.span.style.transform = `translateY(calc(-25% + ${this.sticks[id].base.offsetTop}px))`
    this.span.innerText = startDate + yearsPlage * id

    if (this.sticks[id + 1]) this.sticks[id + 1].stick.style.transform = 'scaleX(0.7) translateY(-50%)'
    if (this.sticks[id + 2]) this.sticks[id + 2].stick.style.transform = 'scaleX(0.5) translateY(-50%)'
  }

  stickClick (e) {
    let id = Number(e.target.closest('.stick-container').getAttribute('data-id'))
    let date = startDate + yearsPlage * id
    store.chronologieDate.set(date)
  }

  reset () {
    this.updateStick(this.text)
  }
}

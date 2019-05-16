import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import anime from 'animejs'

import './Timeline.styl'

class Point extends DomComponent {
  template (props) {
    const loc = store.loc.get()
    this.newPos = 0

    return (
      <button class='point' id={'point' + props.id + ''} />
    )
  }

  componentDidMount () {
    this.bind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  onClick (e) {
    const id = Number(e.target.getAttribute('data-id'))
    if (store.chronologieStatus.get() === 'appearing' && store.chapterId.get(id) !== id) {
      document.querySelector('#chronologie').scrollTo(0, document.querySelector('#fact' + id + '').offsetTop)
    } else {
      if (store.chronologieStatus.get() !== 'appearing') {
        store.chronologieStatus.set('appearing')
      } else {
        store.chronologieStatus.set('disappearing')
      }
    }
    store.chapterId.set(id)
  }
}

export default class Timeline extends DomComponent {
  template ({ base }) {
    return (
      <section class='timeline'>
        <div class='checkCircle' />
        <div class='points'>
          <Point type={'university'} id={0} />
          <Point type={'university'} id={1} />
          <Point type={'university'} id={2} />
          <Point type={'university'} id={3} />
          <Point type={'university'} id={4} />
          <Point type={'university'} id={5} />
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.onLvlChange(0)
    this.bind()
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
    signals.moving.listen(this.updateState, this)
  }

  onLvlChange (id) {
    let previousId = id - 1

    let currentLevelX = 500
    let nextLevelX = 1900
    let heroDistance = nextLevelX - currentLevelX

    this.currentPoint = document.querySelector('#point' + id + '')
    let previousPoint = document.querySelector('#point' + previousId + '')

    if (id === 0) {
      this.pointDistance = window.innerWidth
    } else {
      // Erreur ici
      // this.pointDistance = parseInt(window.getComputedStyle(this.currentPoint).left, 10) - parseInt(window.getComputedStyle(previousPoint).left, 10)
    }

    this.ratio = heroDistance / this.pointDistance
  }

  updateState (displacement) {
    // console.log('anim left', displacement / this.ratio)

    if (this.currentPoint) {
      this.currentPoint.style.left = -(displacement / this.ratio) + 'px'
    }
  }
}

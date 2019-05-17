import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import scene from 'controllers/scene'


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
          <Point type={'university'} id={6} />
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
    this.oldDisplacement = 0
    this.updateLevel = true

    this.id = id
    let previousId = id - 1

    let currentLevelX = scene.offsets[id + 1]
    let nextLevelX = scene.offsets[id + 2]
    let heroDistance
    id !== 0 ? heroDistance = nextLevelX - currentLevelX : heroDistance = 700
    // console.log('level distance', heroDistance)

    this.checkCircleX = 400 + heroDistance / 2 // définir de vraies positions (correspondant aux pts d'intérêt)
    document.querySelector('.checkCircle').style.left = this.checkCircleX + 'px'

    this.currentPoint = document.querySelector('#point' + id + '')
    this.currentPoint.style.background = 'red'
    // eslint-disable-next-line no-unused-expressions
    id !== 0 ? this.previousPoint = document.querySelector('#point' + previousId + '') : ''
    id !== 0 ? this.currentPointX = parseInt(window.getComputedStyle(this.currentPoint).left, 10) : this.currentPointX = window.innerWidth
    id !== 0 ? this.previousPointX = parseInt(window.getComputedStyle(this.previousPoint).left, 10) : this.previousPointX = 0
    // console.log('current point x', this.currentPointX)
    // console.log('previous point x', this.previousPointX)

    if (this.currentPoint) {
      this.pointDistance = this.currentPointX - this.previousPointX
    }
    // console.log('point distance', this.pointDistance)

    this.ratio = heroDistance / this.pointDistance
    // console.log('ratio', this.ratio)
  }

  updateState (displacement) {
    if (this.updateLevel === true) {
      this.oldDisplacement = displacement
      // console.log('old displacement', this.oldDisplacement)
      this.updateLevel = false
    }
    this.displacement = displacement - this.oldDisplacement

    // console.log('displacement', this.displacement)

    if (this.currentPoint) {
      this.currentPoint.style.left = -(this.displacement / this.ratio) + 100 + 'px'
    }
  }
}

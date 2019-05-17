import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import scene from 'controllers/scene'


import './Timeline.styl'

class Point extends DomComponent {
  template (props) {
    const loc = store.loc.get()

    return (
      <button class='point' id={'point' + props.id + ''} data-id={props.id} />
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
    this.setup()
    this.onLvlChange(0)
    this.bind()
  }

  setup () {
    this.timeline = document.querySelector('.timeline')
    // this.timeline.style.width = longueur totale de l'xp

    this.pointsPositions = [280, 1180, 2080, 2980, 3880, 4780, 5680]
    console.log(this.pointsPositions)
    // this.offsetinterests
    this.points = document.querySelectorAll('.point')

    for (let i = 0; i < this.points.length; i++) {
      this.points[i].style.left = this.pointsPositions[i] + 'px'
    }
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
    signals.moving.listen(this.updateState, this)
  }

  onLvlChange (id) {
    this.id = id
    this.currentPoint = document.querySelector('#point' + id + '')
    this.currentPoint.style.background = 'red'
  }

  updateState (displacement) {
    document.querySelector('.timeline').style.left = -displacement + 'px'

    console.log('displacement', displacement)
    console.log('point position', this.pointsPositions[this.id])

    if (displacement >= this.pointsPositions[this.id]) {
      this.currentPoint.style.background = 'green'
    }
  }
}

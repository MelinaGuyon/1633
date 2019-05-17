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
    let that = this
    setTimeout(function () {
      that.onLvlChange(0)
      that.bind()
    }, 1000)
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
    signals.moving.listen(this.updateState, this)
  }

  onLvlChange (id) {
    this.id = id
    this.oldDisplacement = 0
    this.updateLevel = true
    this.currentPoint = document.querySelector('#point' + id + '')
    this.currentPoint.style.background = 'red'

    this.chapterSize = scene.offsets[id + 2] - scene.offsets[id + 1]
    // console.log('chapter size', this.chapterSize)

    this.timelineSize = parseInt(window.getComputedStyle(document.querySelector('.timeline')).width, 10)
    // console.log('timeline size', this.timelineSize)
  }

  updateState (displacement) {
    if (this.updateLevel === true) {
      this.oldDisplacement = displacement
      this.updateLevel = false
    }

    this.displacement = (displacement - this.oldDisplacement) * this.chapterSize / this.timelineSize
    console.log('displacement', this.displacement)

    if (this.currentPoint) {
      let margin = 30 * this.id
      this.currentPoint.style.right = this.displacement - margin + 'px'
    }
  }
}

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
      <button class='point magnet' id={'point' + props.id + ''} data-id={props.id} />
    )
  }

  componentDidMount () {
    this.bind()
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    this.base.addEventListener('click', this.fastbind('onClick', 1)) // 1 to pass the event
  }

  unbind () {
    this.base.removeEventListener('click', this.onClick)
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
    // let that = this
    // setTimeout(function () {
    //   that.onLvlChange(0)
    //   that.bind()
    // }, 2000)
    this.bind()
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
    signals.moving.listen(this.mooving, this)
  }

  onLvlChange (id) {
    // console.log('here')

    // this.reboot = true
    // this.id = id
    // this.oldDisplacement = 0
    // this.updateLevel = true
    // this.currentPoint = document.querySelector('#point' + id + '')
    // this.currentPoint.style.background = 'red'

    // this.distanceToEnd = scene.interestOffsets[id + 1] - scene.offsets[id + 1]
    // this.distanceToPoint = scene.offsets[id + 2] - scene.interestOffsets[id + 1]

    // this.timelineSize = parseInt(window.getComputedStyle(document.querySelector('.timeline')).width, 10) / 2
  }

  mooving (displacement) {
    // console.log(displacement)

    // console.log(scene.offsets)

    // if (this.updateLevel === true) {
    //   this.oldDisplacement = displacement
    //   this.updateLevel = false
    // }

    // if (this.reboot === true) {
    //   // console.log('go to point')
    //   this.distanceToDo = this.distanceToPoint
    //   this.reboot = false
    // } else if (this.reboot === false) {
    //   // console.log('go to end')
    //   this.distanceToDo = this.distanceToEnd
    // }

    // this.displacement = (displacement - this.oldDisplacement) * this.distanceToDo / this.timelineSize
    // // console.log('displacement', this.displacement)

    // if (this.currentPoint) {
    //   let margin = 30 * this.id
    //   this.currentPoint.style.right = this.displacement - margin + 'px'
    // }

  }
}

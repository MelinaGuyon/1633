import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import scene from 'controllers/scene'

import './Timeline.styl'

class Point extends DomComponent {
  template (props) {
    this.x = 0

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
    this.levelsLength = Object.keys(store.levelDict.get()).length
    this.points = Array(this.levelsLength)

    const points = []
    const refPoint = i => el => {
      this.points[i] = el
    }
    for (let i = 0; i < this.levelsLength; i++) {
      points.push(<Point ref={refPoint(i)} id={i} />)
    }

    return (
      <section class='timeline' ref={addRef(this, 'timeline')}>
        <div class='checkCircle' />
        <div class='points'>
          {points}
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.bind()
    this.initParams()
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    this.listenStore('levelId', this.onLvlChange)
    signals.moving.listen(this.mooving, this)
  }

  unbind () {
    // check how to unlisten
    // this.unlistenStore('levelId', this.onLvlChange)
    // signals.moving.unlisten(this.mooving, this)
  }

  initParams () {
    /// need to be called at resize also
    this.size = this.timeline.offsetWidth
  }

  onLvlChange (id) {
    console.log('LEVEL CHANGE', id)

    this.currenPointId = id + 1
    this.currentPoint = this.points[id]
    this.pointDist = this.size / 2

    this.persoDist = 600


    // this.reboot = true
    // this.oldDisplacement = 0
    // this.updateLevel = true
    // this.currentPoint = document.querySelector('#point' + id + '')
    // this.currentPoint.style.background = 'red'

    // this.distanceToEnd = scene.interestOffsets[id + 1] - scene.offsets[id + 1]
    // this.distanceToPoint = scene.offsets[id + 2] - scene.interestOffsets[id + 1]

    // this.timelineSize = parseInt(window.getComputedStyle(document.querySelector('.timeline')).width, 10) / 2
  }

  mooving (displacement) {

    if (!this.currentPoint) return

    let dist
    if (this.currenPointId === 1) dist = (scene.interestOffsets[this.currenPointId] - scene.offsets[this.currenPointId])
    else dist = (scene.interestOffsets[this.currenPointId] - scene.offsets[this.currenPointId]) + scene.sizes[this.currenPointId] / 2

    let actualMoove
    if (this.currenPointId === 1) actualMoove = displacement
    else actualMoove = displacement - scene.offsets[this.currenPointId - 1] - scene.sizes[1] / 2

    const ratio = actualMoove / dist

    const x = this.pointDist * ratio
    this.currentPoint.base.style.transform = `translateX(-${x}px)`


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

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import scene from 'controllers/scene'

import './Timeline.styl'

class Point extends DomComponent {
  template (props) {
    this.initialX = 60 * props.initialX
    this.endingX = 60 * props.endingX

    return (
      <button class='point magnet' id={'point' + props.id + ''} data-id={props.id} />
    )
  }

  componentDidMount () {
    this.bind()
    this.setPosition()
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

  setPosition () {
    this.base.style.transform = `translateX(-${this.initialX}px)`
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
      points.push(<Point ref={refPoint(i)} initialX={this.levelsLength - 1 - i} endingX={i} />)
    }

    return (
      <section class='timeline' ref={addRef(this, 'timeline')}>
        <div class='whiteCircle' />
        <div class='redCircleWrapper' ref={addRef(this, 'circleWrapper')}>
          <div class='redCircle' />
        </div>
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
    this.unlistenStore('levelId', this.onLvlChange)
    signals.moving.unlisten(this.mooving)
  }

  initParams () {
    /// need to be called at resize also
    this.size = this.timeline.offsetWidth
    this.pointSize = this.points[0].base.offsetWidth
    this.circleSize = this.circleWrapper.offsetWidth
  }

  onLvlChange (id) {
    this.currenPointId = id + 1
    this.currentPoint = this.points[id]
    this.pointDist = this.size / 2
  }

  mooving (displacement) {
    if (!this.currentPoint) return

    // points
    let distStart
    let actualMooveStart
    let distEnd
    let actualMooveEnd
    let ratio
    let x

    if (this.currenPointId === 1) distStart = (scene.interestOffsets[this.currenPointId] - scene.offsets[this.currenPointId])
    else distStart = (scene.interestOffsets[this.currenPointId] - scene.offsets[this.currenPointId]) + scene.sizes[this.currenPointId] / 2

    if (this.currenPointId === 1) actualMooveStart = displacement
    else actualMooveStart = displacement - scene.offsets[this.currenPointId - 1] - scene.sizes[this.currenPointId - 1] / 2

    if (actualMooveStart > distStart) {
      if (this.currenPointId === 1) distEnd = scene.sizes[this.currenPointId] / 2 - distStart
      else distEnd = scene.sizes[this.currenPointId] - distStart

      if (this.currenPointId === 1) actualMooveEnd = displacement - distStart
      else actualMooveEnd = displacement - scene.offsets[this.currenPointId - 1] - scene.sizes[this.currenPointId - 1] / 2 - distStart
    }

    if (!distEnd && !actualMooveEnd) {
      ratio = actualMooveStart / distStart
      ratio = Math.max(0, Math.min(1, ratio))
      x = (this.pointDist - this.currentPoint.initialX) * ratio + this.currentPoint.initialX
    } else {
      ratio = actualMooveEnd / distEnd
      ratio = Math.max(0, Math.min(1, ratio))
      x = ((this.pointDist - this.currentPoint.endingX - this.pointSize) * ratio) + this.pointDist
    }

    console.log(actualMooveStart, distStart)

    this.currentPoint.base.style.transform = `translateX(-${x}px)`

    // circle
    let range
    let distCircle
    let actualMooveCircle
    let ratioCircle
    let width

    range = [this.size / 2 - this.circleSize / 2 - this.pointSize, this.size / 2 + this.circleSize / 2 - this.pointSize]
    distCircle = range[1] - range[0]
    actualMooveCircle = x - range[0]
    ratioCircle = actualMooveCircle / distCircle
    ratioCircle = Math.max(0, Math.min(1, ratioCircle))
    width = this.circleSize * (1 - ratioCircle)

    if (ratioCircle === 0 || ratioCircle === 1) this.circleWrapper.classList.add('transition')
    else this.circleWrapper.classList.remove('transition')

    if (ratioCircle > 0 && ratioCircle < 1) this.currentPoint.base.classList.add('hidden')
    else this.currentPoint.base.classList.remove('hidden')

    this.circleWrapper.style.width = `${width}px`
  }
}

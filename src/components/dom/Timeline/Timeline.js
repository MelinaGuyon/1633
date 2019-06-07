import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import scene from 'controllers/scene'

import './Timeline.styl'

class Point extends DomComponent {
  template (props) {
    this.initialX = 36 * props.initialX
    this.endingX = 36 * props.endingX

    this.id = store.chronologieIdsTable.get()[props.id]
    this.inCircle = false

    return (
      <div class='point magnet' data-id={this.id}>
        <div class='point-inner' />
      </div>
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
    store.chronologieId.set(this.id)
    store.chronologieStatus.set('appearing')
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
      points.push(<Point ref={refPoint(i)} id={i} initialX={this.levelsLength - 1 - i} endingX={i} />)
    }

    return (
      <section class='timeline' ref={addRef(this, 'timeline')}>
        <div class='whiteCircle' ref={addRef(this, 'whiteCircle')}/>
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
    this.whiteCircle.addEventListener('click', this.fastbind('onClick', 1))
    this.listenStore('levelId', this.onLvlChange)
    signals.moving.listen(this.mooving, this)
  }

  unbind () {
    this.whiteCircle.removeEventListener('click', this.onClick)
    this.unlistenStore('levelId', this.onLvlChange)
    signals.moving.unlisten(this.mooving)
  }

  initParams () {
    /// need to be called at resize also + place passed points
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

    if (this.currenPointId === 1) distStart = (scene.interestOffsets[this.currenPointId] - scene.offsets[this.currenPointId]) + scene.sizes[1] / 2
    else distStart = (scene.interestOffsets[this.currenPointId] - scene.offsets[this.currenPointId]) + scene.sizes[this.currenPointId] / 2

    if (this.currenPointId === 1) actualMooveStart = displacement - scene.sizes[1] / 2
    else actualMooveStart = displacement - scene.offsets[this.currenPointId - 1] - scene.sizes[this.currenPointId - 1] / 2

    if (actualMooveStart > distStart) {
      if (this.currenPointId === 1) distEnd = scene.sizes[this.currenPointId] / 2 - distStart + scene.sizes[1] / 2
      else distEnd = scene.sizes[this.currenPointId] - distStart

      if (this.currenPointId === 1) actualMooveEnd = displacement - distStart - scene.sizes[1] / 2
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

    this.currentPoint.base.style.transform = `translateX(-${x}px)`
    signals.newDom.dispatch()

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

    if (ratioCircle > 0 && ratioCircle < 1) {
      if (!this.currentPoint.inCircle) {
        this.currentPoint.base.classList.add('hidden')
        this.currentPoint.base.classList.remove('magnet')
        this.whiteCircle.classList.add('magnet')
        this.currentPoint.inCircle = true
        this.circleClickable = true
        signals.newDom.dispatch()
      }
    } else {
      if (this.currentPoint.inCircle) {
        this.currentPoint.base.classList.remove('hidden')
        this.currentPoint.base.classList.add('magnet')
        this.whiteCircle.classList.remove('magnet')
        this.currentPoint.inCircle = false
        this.circleClickable = false
        signals.newDom.dispatch()
      }
    }

    this.circleWrapper.style.width = `${width}px`
  }

  onClick () {
    if (this.circleClickable) {
      store.chronologieId.set(this.currentPoint.id)
      store.chronologieStatus.set('appearing')
    }
  }
}

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import scene from 'controllers/scene'
import anime from 'animejs'

import './Timeline.styl'

class SceneTitle extends DomComponent {
  template (props) {
    return (
      <div class='scene-title'>
        <p class='number' ref={addRef(this, 'sceneContainer')}><span class='span1' ref={addRef(this, 'scene')} /><span class='span2' ref={addRef(this, 'number')} /></p>
        <p class='title' ref={addRef(this, 'title')} />
        <p class='date' ref={addRef(this, 'date')} />
      </div>
    )
  }

  componentDidMount () {
    this.preventFirstTime()
  }

  preventFirstTime () {
    this.prevented = true
  }

  update (id) {
    if (this.prevented) {
      this.prevented = false
      return
    }
    if (id === undefined) return
    const loc = store.loc.get()

    let infos = store.levelDict.get()[id]
    if (!infos || this.id === id) return
    this.id = id
    this.sceneText = loc['sceneTitle.text']
    this.numberText = (id + 1) + ''
    if (this.numberText.length === 1) this.numberText = '0' + this.numberText
    this.titleText = infos.title
    this.dateText = infos.date

    this.animateIn()
  }

  animateIn () {
    const wrappers = this.base.querySelectorAll('.wrapper')
    let spans = []
    for (let i = 0; i < wrappers.length; i++) {
      let spansinwrapper = wrappers[i].querySelectorAll('.animated-span')
      spans.push(spansinwrapper)
    }

    if (spans.length === 0) return this.animateOut()

    for (let i = 0; i < spans.length; i++) {
      anime({
        targets: spans[i],
        translateY: '100%',
        duration: 400,
        delay: (el, i) => { return 20 * i },
        easing: 'easeInOutQuad',
        complete: () => {
          if (i !== spans.length - 1) return
          this.animateOut()
        }
      })
    }

    anime({
      targets: this.date,
      translateY: ['0', '100%'],
      opacity: [1, 0],
      duration: 400,
      easing: 'easeInOutQuad'
    })

    anime({
      targets: this.number,
      opacity: [1, 0],
      duration: 400,
      easing: 'easeInOutQuad'
    })
  }

  animateOut () {
    this.scene.innerText = this.sceneText
    this.number.innerText = this.numberText
    this.date.innerText = this.dateText
    this.title.innerHTML = null
    this.sceneContainer.classList.add('visible')

    let text = this.titleText.split('<br>')
    for (let i = 0; i < text.length; i++) {
      let span = document.createElement('span')
      span.classList.add('wrapper')

      let splitted = text[i].split('')

      for (let j = 0; j < splitted.length; j++) {
        let innerSpan = document.createElement('span')
        innerSpan.innerText = splitted[j]
        innerSpan.classList.add('animated-span')
        if (splitted[j] === ' ') innerSpan.classList.add('space')
        span.appendChild(innerSpan)
      }

      this.title.appendChild(span)
    }

    const wrappers = this.base.querySelectorAll('.wrapper')
    let spans = []
    for (let i = 0; i < wrappers.length; i++) {
      let spansinwrapper = wrappers[i].querySelectorAll('.animated-span')
      spans.push(spansinwrapper)
    }

    for (let i = 0; i < spans.length; i++) {
      anime({
        targets: spans[i],
        translateY: ['100%', '0'],
        duration: 400,
        delay: (el, i) => { return 20 * i },
        easing: 'easeInOutQuad'
      })
    }

    anime({
      targets: this.date,
      translateY: ['100%', '0'],
      opacity: [0, 1],
      duration: 400,
      easing: 'easeInOutQuad'
    })
    anime({
      targets: this.number,
      opacity: [0, 1],
      duration: 400,
      easing: 'easeInOutQuad'
    })
  }
}

class Point extends DomComponent {
  template (props) {
    this.initialX = 36 * props.initialX
    this.endingX = 36 * props.endingX

    this.id = store.chronologieIdsTable.get()[props.id]
    this.inCircle = false

    let span = (props.id + 1) + ''
    if (span.length === 1) span = '0' + span

    return (
      <div class='point magnet' data-id={this.id}>
        <span class='point-number'>{span}</span>
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
        <SceneTitle ref={addRef(this, 'sceneTitle')} />
        <div class='whiteCircle' ref={addRef(this, 'whiteCircle')}>
          <div class='halo' ref={addRef(this, 'halo')}/>
        </div>
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
    this.onFactUnlocked = this.onFactUnlocked.bind(this)
    this.onClick = this.onClick.bind(this)
    this.mooving = this.mooving.bind(this)
    this.resize = this.resize.bind(this)

    this.bind()
    this.initParams(true)
  }

  componentWillUnmount () {
    this.unbind()
  }

  bind () {
    signals.factUnlock.listen(this.onFactUnlocked)
    this.whiteCircle.addEventListener('click', this.onClick)
    this.listenStore('levelId', this.onLvlChange)
    signals.moving.listen(this.mooving)
    this.listenStore('size', this.resize)
  }

  unbind () {
    signals.factUnlock.unlisten(this.onFactUnlocked)
    this.whiteCircle.removeEventListener('click', this.onClick)
    this.unlistenStore('levelId', this.onLvlChange)
    signals.moving.unlisten(this.mooving)
  }

  initParams (first) {
    this.size = this.timeline.offsetWidth
    this.pointSize = this.points[0].base.offsetWidth
    if (first) this.circleSize = this.circleWrapper.offsetWidth
  }

  onLvlChange (id) {
    this.sceneTitle.update(id)
    this.currenPointId = id + 1
    this.currentPoint = this.points[id]
    this.pointDist = this.size / 2

    if (this.circleClickable) return
    this.circleClickable = true
    this.whiteCircle.classList.add('magnet')
  }

  mooving (displacement) {
    if (!this.currentPoint) return

    if (displacement) this.displacement = displacement
    else displacement = this.displacement

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
        this.currentPoint.inCircle = true
        signals.newDom.dispatch()
      }
    } else {
      if (this.currentPoint.inCircle) {
        this.currentPoint.base.classList.remove('hidden')
        this.currentPoint.base.classList.add('magnet')
        this.currentPoint.inCircle = false
        this.resetHalo()
        signals.factUnlockEnd.dispatch()
        signals.newDom.dispatch()
      }
    }

    this.circleWrapper.style.width = `${width}px`
  }

  onClick () {
    if (!this.currentPoint && this.circleClickable) return
    store.chronologieId.set(this.currentPoint.id)
    store.chronologieStatus.set('appearing')
  }

  onFactUnlocked () {
    this.currentPoint.base.classList.add('validated')

    const tl = anime.timeline({
      easing: 'easeOutQuad',
      duration: 600
    })

    tl
      .add({
        targets: this.halo,
        opacity: 1,
        width: ['110%', '125%'],
        height: ['110%', '125%'],
        duration: 300
      })
      .add({
        targets: this.halo,
        opacity: 0,
        width: '155%',
        height: '155%'
      })
      .add({
        targets: this.halo,
        opacity: 1,
        width: ['110%', '125%'],
        height: ['110%', '125%'],
        duration: 300
      })
      .add({
        targets: this.halo,
        opacity: 0,
        width: '155%',
        height: '155%'
      })
      .add({
        targets: this.halo,
        opacity: 1,
        width: ['110%', '125%'],
        height: ['110%', '125%'],
        duration: 300,
        complete: () => {
          if (!this.currentPoint.inCircle) this.resetHalo()
        }
      })
  }

  resetHalo () {
    anime({
      targets: this.halo,
      opacity: 0,
      duration: 600,
      easing: 'easeOutQuad'
    })
  }

  resize () {
    this.initParams()
    this.onLvlChange(this.currenPointId - 1)
    this.replacePoints()
  }

  replacePoints () {
    this.points.forEach((el, index) => {
      if (index < this.currenPointId - 1) {
        let x = this.size - el.endingX - this.pointSize
        el.base.style.transform = `translateX(-${x}px)`
      } else if (index === this.currenPointId - 1) {
        this.mooving()
      }
    })
  }
}

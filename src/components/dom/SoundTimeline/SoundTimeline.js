import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import sound from 'controllers/sound'
import signals from 'state/signals'
import logger from 'utils/logger'
import delay from 'lodash/delay'
import Inrtia from 'inrtia'
import anime from 'animejs'
import { raf } from '@internet/raf'

import './SoundTimeline.styl'

export default class SoundTimeline extends DomComponent {
  template ({ base }) {
    return (
      <section class='sound-timeline' ref={addRef(this, 'timeline')}>
        <div class='wrapper'>
          <div class='inner' ref={addRef(this, 'inner')} />
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.updateInertia = this.updateInertia.bind(this)
    this.updateTimeline = this.updateTimeline.bind(this)

    logger('SoundTimeline did mount', '#47b342').log()
    this.bind()
    this.initInertia()
  }

  bind () {
    signals.soundSeeked.listen(this.updateTimeline)
    raf.add(this.updateInertia)
  }

  unbind () {
    signals.soundSeeked.unlisten(this.updateTimeline)
    raf.remove(this.updateInertia)
  }

  initInertia () {
    const inrtiaOptions = {
      value: 0,
      friction: 24,
      precision: 5,
      perfectStop: true,
      interpolation: 'linear'
    }
    this.inrtia = {
      percent: new Inrtia(inrtiaOptions)
    }
  }

  updateTimeline (state) {
    if (state.end) {
      this.inrtia.percent.stopped = true
      anime({
        targets: this.inner,
        scaleX: 0,
        duration: 1200,
        easing: 'easeInOutQuad',
        delay: 600,
        complete: () => {
          if (this.inrtia.percent.stopped) this.inrtia.percent.value = 0
        }
      })
      return
    }
    this.inrtia.percent.stopped = false
    const ratio = state.seek / state.duration
    if (ratio === 0) return
    this.inrtia.percent.to(ratio)
  }

  updateInertia () {
    if (!this.inrtia.percent.stopped) {
      this.inrtia.percent.update()
      this.inner.style.transform = `scaleX(${this.inrtia.percent.value})`
    }
  }
}

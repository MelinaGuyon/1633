import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import store from 'state/store'
import signals from 'state/signals'
import anime from 'animejs'
import { map, delay } from 'lodash'
import { raf } from '@internet/raf'

import './Subtitles.styl'

export default class Subtitles extends DomComponent {
  template (props) {
    this.actualLength = 0
    this.globalIndex = 0
    this.actualReading = 0

    return (
      <section class='subtitles' ref={addRef(this, 'subtiltles')} >
        <div class='subtitles-content' ref={addRef(this, 'subtiltlesContent')} />
      </section>
    )
  }

  componentDidMount () {
    this.initWritting = this.initWritting.bind(this)
    this.update = this.update.bind(this)
    this.pause = this.pause.bind(this)

    this.bind()
  }

  bind () {
    this.listenStore('pause', this.pause)
    signals.writeSubtitles.listen(this.initWritting)
  }

  bindRaf () {
    if (this.binded) return
    this.binded = true
    raf.add(this.update)
  }

  unbindRaf () {
    if (!this.binded) return
    this.binded = false
    raf.remove(this.update)
  }

  update (dt) {
    dt = dt * 1
    this.time += dt

    let text
    this.currentSubtiltles.forEach(el => {
      const time = el[1]
      if (time < this.time) text = el[0]
    })

    if (this.text === text) return
    this.write(text)
  }

  initWritting (index) {
    this.time = 0
    if (!this.binded) this.bindRaf()
    this.currentSubtiltles = store.subtitles.get()[index]
  }

  write (text) {
    this.text = text
    this.subtiltlesContent.innerHTML = text
  }

  remove () {
    this.subtiltlesContent.innerHTML = ''
  }

  pause (pause) {
    if (pause.paused) this.unbindRaf()
    else this.bindRaf()
  }
}

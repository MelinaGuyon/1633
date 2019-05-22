import { RafTimer } from '@internet/raf'
import store from 'state/store'

export default class Timeline {
  constructor (timeline, opts) {
    this.setTimeline(timeline, opts)

    this.currentFrame = 0
    this.finished = true

    const self = this
    this.nextFrame = function (restart) {
      if (!self.timeline[self.currentFrame + 1] && !self.loop) { self.finished = true; return }
      self.currentFrame = (self.currentFrame + 1) % self._frameCount
      const duration = self.timeline[self.currentFrame][0]()
      if (self.finished) return
      if (!self.timeline[self.currentFrame + 1] && !self.loop) self.finished = true
      else restart(self.getFrameDuration(duration || self.timeline[self.currentFrame][1]))
    }

    this.timer = new RafTimer(this.getFrameDuration(), this.nextFrame, false)
  }

  getFrameDuration (duration) {
    return duration || store.frameDuration.get()
  }

  setTimeline (timeline = [], opts = {}) {
    this.loop = opts.loop
    this._frameCount = timeline.length
    this.timeline = timeline
  }

  anim (frame = 0, stop = false) {
    this.currentFrame = frame - 1
    this.finished = stop
    this.nextFrame(this.timer.restart)
    if (this.finished) this.timer.stop()
  }

  frame (frame = 0) {
    if (frame === this.currentFrame) return
    this.anim(frame, true)
  }

  play (frame) {
    if (frame === undefined) frame = this.currentFrame
    this.anim(frame, false)
  }

  stop () {
    this.finished = true
    this.timer.stop()
  }

  update (dt) {
    this.timer.update(dt)
  }
}

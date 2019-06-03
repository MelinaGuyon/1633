import { RafTimer } from '@internet/raf'
import store from 'state/store'

export default class Animator {
  constructor (sprite) {
    this.sprite = sprite
    this._anim = undefined
    this.loop = false
    this.current = undefined
    this.currentSplit = undefined
    this.currentFrame = 0
    this.finished = true
    this.frameDuration = store.frameDuration.get()

    const self = this
    this.nextFrame = function (restart) {
      if (!self._anim[self.currentFrame + 1] && !self.loop) { self.finished = true; return }
      self.currentFrame = (self.currentFrame + 1) % self._frameCount
      self.sprite.texture = self._anim[self.currentFrame]
      if (!self._anim[self.currentFrame + 1] && !self.loop) self.finished = true
      else restart(self.frameDuration)
    }

    this.timer = new RafTimer(this.frameDuration, this.nextFrame, false)
  }

  is (segment) {
    return this.currentSplit === segment
  }

  dispose () {
    this._anim = undefined
    this.finished = true
    this.sprite = undefined
    this.current = undefined
    this.currentSplit = undefined
  }

  switchAnim (anim, frame = 0, stop = false, loop = false) {
    this.current = anim
    this.currentSplit = anim.split('/')[1]
    this._anim = store.animations.get()[anim]
    this._frameCount = this._anim.length
    this.currentFrame = frame
    this.sprite.texture = this._anim[frame]
    this.loop = loop

    if (this._anim.length < 2 || stop) {
      this.finished = true
      this.timer.stop()
    } else {
      this.finished = false
      this.timer.restart(this.frameDuration, false)
    }
  }

  frame (anim, frame = 0) {
    if (anim === this.current && frame === this.currentFrame) return
    this.switchAnim(anim, frame, true, false)
  }

  play (anim, opts = {}) {
    this.frameDuration = opts.frameDuration || store.frameDuration.get()
    this.switchAnim(anim, opts.firstFrame, false, opts.loop)
  }

  stop () {
    this.loop = false
  }

  update (dt) {
    this.timer.update(dt)
  }
}

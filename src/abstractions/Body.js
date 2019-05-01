import signals from 'state/signals'
import { clamp } from '@internet/maths'

export default class Body {
  constructor (props) {
    this.group = props.group
    this.gravity = props.gravity ? 1 : 0

    this.ax = this.ay = 0
    this.vx = this.vy = 0
    this.vxMax = this.vyMax = 1
    this.y = 0
    this.x = 0

    this.dir = null
    this.bind()
  }

  bind () {
    signals.goLeft.listen(this.updateState, this)
    signals.goRight.listen(this.updateState, this)
    signals.stop.listen(this.updateState, this)
  }

  updateState (dir) {
    this.dir = dir
  }

  attach (obj) {
    // fakeX and fakeY for perso because we don't really moove it
    if (obj._pixicomponent) this.component = obj
    this.attachment = this.component ? obj.base : obj
    this.attachment.px = obj.fakeX || obj.x
    this.attachment.py = obj.fakeY || obj.y
    this.attachOffX = obj.fakeX || obj.x
    this.attachOffY = obj.fakeY || obj.y
  }

  updateAttachment () {
    this.attachment.px = this.attachment.fakeX || this.attachment.x
    this.attachment.py = this.attachment.fakeY || this.attachment.y
    this.attachment.fakeX = this.x + this.attachOffX
    this.attachment.fakeY = this.y + this.attachOffY
  }

  update (dt) {
    if (this.group !== 'hero') return

    dt = Math.min(dt, 35)

    if (this.dir === 1) {
      this.vx += (this.ax + this.gravity) * 0.0008 * dt
      this.vy += this.ay * 0.0008 * dt
      this.vx = clamp(this.vx, -this.vxMax, this.vxMax)
      this.vy = clamp(this.vy, -this.vyMax, this.vyMax)

      this.x += this.vx * dt
      this.y += this.vy * dt
    } else if (this.dir === 0) {
      this.vx -= (this.ax + this.gravity) * 0.0008 * dt
      this.vy -= this.ay * 0.0008 * dt
      this.vx = clamp(this.vx, -this.vxMax, this.vxMax)
      this.vy = clamp(this.vy, -this.vyMax, this.vyMax)

      this.x += this.vx * dt
      this.y += this.vy * dt
    } else {
      if (this.vx > 0) {
        this.vx -= (this.ax + this.gravity) * 0.0008 * dt
        this.vy -= this.ay * 0.0008 * dt
        this.vx = clamp(this.vx, -0, 1)
        this.vy = clamp(this.vy, -0, 1)
      } else {
        this.vx += (this.ax + this.gravity) * 0.0008 * dt
        this.vy += this.ay * 0.0008 * dt
        this.vx = clamp(this.vx, -1, 0)
        this.vy = clamp(this.vy, -1, 0)
      }

      this.x += this.vx * dt
      this.y += this.vy * dt
    }
  }
}

// idée anim perso : http://inspacewetrust.org/en/

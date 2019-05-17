import signals from 'state/signals'
import { clamp } from '@internet/maths'
import scene from 'controllers/scene'
import store from 'state/store'

export default class Body {
  constructor (props) {
    this.group = props.group
    this.gravity = props.gravity ? 1 : 0

    this.scale = props.scale || 1
    this.width = props.width * this.scale || 1
    this.height = props.height * this.scale || 1
    this.ax = this.ay = 0
    this.vx = this.vy = 0
    this.vxMax = this.vyMax = 1
    this.y = props.y || 0
    this.x = props.x || 0
    this.px = this.x
    this.py = this.y

    // use to focus camera
    if (this.group === 'hero') {
      this.dir = null
      this.minX = this.getMin() // peut reculer d'un demi écran
      this.maxX = this.getMax()
      this.bind()
    }

    // all variables bellow is used by the physics controller
    this.container = props.container || null

    this.hasMoved = false
    this.hasColliders = false
    this.colliders = []
    this.cb = props.cb || null

    this.anchor = props.anchor || [0.5, 0.5]
    this.anchOffX = -this.width * this.anchor[0]
    this.anchOffY = -this.height * this.anchor[1]

    this.hw = this.width * 0.5
    this.hh = this.height * 0.5
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
    this.attachment.hasMoved = this.hasMoved
  }

  update (dt) {
    if (this.group !== 'hero') return

    this.px = this.x
    this.py = this.y

    dt = Math.min(dt, 35)

    if (this.dir === 1 && this.x < this.maxX) {
      this.vx += (this.ax + this.gravity) * 0.0008 * dt
      this.vy += this.ay * 0.0008 * dt
      this.vx = clamp(this.vx, -this.vxMax, this.vxMax)
      this.vy = clamp(this.vy, -this.vyMax, this.vyMax)

      this.x += this.vx * dt
      this.y += this.vy * dt
    } else if (this.dir === 0 && this.x > this.minX) {
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

    this.x = Math.min(this.maxX, Math.max(this.minX, this.x))

    if (this.x !== this.px || this.y !== this.py) {
      this.hasMoved = true
      this.minX = this.getMin()
      this.maxX = this.getMax()
    } else {
      this.hasMoved = false
    }
  }

  getMin () {
    return -store.size.get().w / 2
  }

  getMax () {
    let max = 0
    scene.sizes.forEach((size) => {
      max += size
    })
    if (max < store.size.get().w * 2) max = store.size.get().w * 2
    return max
  }

  collideWith (group, cb = null) {
    this.hasColliders = true
    this.colliders.push([group, cb, { collide: false }])
  }

  destroy () {
    this.destroyed = true
    this.rect && this.rect.destroy()
    this.hasColliders = false
    this.colliders = undefined
    this.component = undefined
    this.attachment = undefined
    this.rect = undefined
  }
}

// idée anim perso : http://inspacewetrust.org/en/

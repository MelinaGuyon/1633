export default class Body {
  constructor (props) {
    console.log('body')
    this.group = props.group
    this.gravity = props.gravity ? 1 : 0

    this.ax = this.ay = 0
    this.vx = this.vy = 0
    this.y = 0
    this.x = 0

    // temps
    this.haut = false
    this.bas = false
  }

  attach (obj) {
    if (obj._pixicomponent) this.component = obj
    this.attachment = this.component ? obj.base : obj
    this.attachment.px = obj.fakeX
    this.attachment.py = obj.fakeY
    this.attachOffX = obj.fakeX
    this.attachOffY = obj.fakeY
    console.log(obj)
  }

  updateAttachment () {
    this.attachment.px = this.attachment.x
    this.attachment.py = this.attachment.y
    this.attachment.fakeX = this.x + this.attachOffX
    this.attachment.fakeY = this.y + this.attachOffY
  }

  update (dt) {
    if (this.group !== 'hero') return

    dt = Math.min(dt, 35)

    if (this.haut) {
      this.vx += (this.ay + this.gravity) * 0.0008 * dt
      this.vy += this.ax * 0.0008 * dt

      this.y += this.vy * dt
      this.x += this.vx * dt
    }
    if (this.bas) {
      this.vx -= (this.ay + this.gravity) * 0.0008 * dt
      this.vy -= this.ax * 0.0008 * dt

      this.y += this.vy * dt
      this.x += this.vx * dt
    }
  }
}

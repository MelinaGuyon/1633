import PixiComponent from 'abstractions/PixiComponent'
import { Graphics } from 'pixi.js'
import physics from 'controllers/physics'
import scene from 'controllers/scene'

export default class Colliders extends PixiComponent {
  setup (props) {
    this.state = {}
    this.type = props.type || 'a'
    this.name = props.name || null
    this.base = new Graphics()
    this.base.tint = props.tint || 0xff00ff
    this.base.alpha = props.alpha < 1 ? props.alpha : 1
    this.base.lineStyle(4, this.base.tint, 1)
    this.base.beginFill(this.base.tint)
    this.base.drawCircle(14, 14, 14)
    this.base.endFill()

    this.base.x = props.x || 0
    this.base.y = props.y || 0
    this.width = this.base.width
    this.height = this.base.height
    this.collide = props.collide
    this.group = props.group
    this.levelId = props.levelId || null

    this.cb = props.cb

    if (this.collide && this.group) {
      this.body = physics.addBody({
        group: this.group,
        container: scene[props.layer],
        width: this.base.width,
        height: this.base.height,
        x: this.base.x,
        y: this.base.y,
        anchor: [0.5, 0.5],
        scale: 1
      })
      this.body.attach(this.base)

      this.body.collideWith('hero', (state) => {
        if (this.group === 'interests' && this.levelId) this.calcInterestOffset()
        this.state.collide = state.collide
        this.cb(state)
      })
    }
  }

  calcInterestOffset () {
    // TODO :: calcul is always done ! To remove
    scene.interestOffsets[this.levelId] = scene.offsets[this.levelId] + this.base.x
  }

  componentWillUnmount () {
    if (this.collide) {
      this.removeBody()
    }
  }

  removeBody () {
    physics.removeBody(this.body)
    this.body = undefined
  }
}

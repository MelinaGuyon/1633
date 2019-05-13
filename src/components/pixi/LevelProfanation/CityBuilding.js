import PixiComponent from 'abstractions/PixiComponent'
import { Sprite } from 'pixi.js'
import physics from 'controllers/physics'

import store from 'state/store'

export default class CityBuilding extends PixiComponent {
  setup (props) {
    this.type = props.type || 'b'

    this.base = new Sprite(store.animations.get()['profanation-' + this.type + '.png'][0])
    if (props.tint) this.base.tint = props.tint
    this.base.x = props.x || 0
    this.base.y = props.y || 0
    this.base.scale.y = props.scale || 1
    this.base.scale.x = props.scale || 1
    this.width = this.base.width
    this.height = this.base.height

    console.log('here', this.width)

    if (props.collide) {
      this.body = physics.addBody({
        group: 'obstacles',
        width: this.base.width,
        height: this.base.height,
        // anchor: [0.5, 0.5],
        scale: 1
      })
      this.body.attach(this.base)
    }
  }
}

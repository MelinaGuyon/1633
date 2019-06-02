import PixiComponent from 'abstractions/PixiComponent'
import { Sprite } from 'pixi.js'

import store from 'state/store'

export default class CityBuilding extends PixiComponent {
  setup (props) {
    this.type = props.type || 'b'

    this.base = new Sprite(store.animations.get()['photo-' + this.type + '.png'][0])
    if (props.tint) this.base.tint = props.tint
    this.base.x = props.x || 0
    this.base.y = props.y || 0
    this.base.scale.y = props.scale || 1
    this.base.scale.x = props.scale || 1
    this.width = this.base.width
    this.height = this.base.height
  }
}

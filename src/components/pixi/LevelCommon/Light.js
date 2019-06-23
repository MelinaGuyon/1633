/* eslint-disable no-mixed-spaces-and-tabs,no-tabs */
import PixiComponent from 'abstractions/PixiComponent'
import { Sprite, Container } from 'pixi.js'
import store from 'state/store'
import rgbToDec from 'utils/rgbToDec'
import decToRgb from 'utils/decToRgb'
import scene from 'controllers/scene'

function premultiplyAlpha (c, a) {
  const rgb = decToRgb(c)
  rgb[0] *= a
  rgb[1] *= a
  rgb[2] *= a
  const dec = rgbToDec(rgb)
  // console.log(dec)
  return dec
}

class MockedTarget extends PixiComponent {
  setup (props) {
    this.base = new Container()
    this.base.scale = [1, 1]
    this.base.anchor = [0.5, 0.5]
    this.base.y = 0
    this.base.x = props.x || 0
    this.lastScreenOffset = [0, 0]
    this.screenRelative = props.screenRelative || false
    this.screenAnchor = props.screenAnchor || [0, 0]
    this.screenOffset = props.screenOffset || [0, 0]
  }
}

export default class Light extends PixiComponent {
  constructor (props) {
    super(props)
    const targetLayer = props.layer
    this.props.layer = props.layer
    this.layer = props.layer
	  this.form = props.form // correspond a l url vers l'image de la forme que dois prendre la lumière
    this.targetLayer = targetLayer || props.layer
    this.animation = props.animation
  }

  setup (props = {}) {
    this.base = new Sprite(store.animations.get()[this.form + '.png'][0])

    if (!props.scale) props.scale = [1, 1]

    this.oscale = props.scale.slice()
    this.base.scale.set(props.scale[0] || 1, props.scale[1] || 1)
    this.base.x = props.x || 0
    this.base.y = 0
    this.base.blendMode = 3

    console.log(props.x)

    this.x = props.x || 0
    this.y = props.y || 0
    this.target = props.target || props.follow

    // Only to avoid deprecation
    if (props.followLayer) {
      this.targetLayer = props.followLayer
    }

    // Only to avoid deprecation
    if (props.followOffset) {
      this.x += props.followOffset[0]
      this.y += props.followOffset[1]
    }

    const tint = props.tint || 0x550066
    this.alpha = props.alpha !== undefined ? props.alpha : 1
    delete props.alpha

    super.setup(props)
    this.setTint(tint)

    if (!this.target) {
      this.refs.mock = this.addComponent(MockedTarget, Object.assign({}, props, { layer: this.targetLayer, x: 0, y: 0 }))
      this.target = this.refs.mock.base
      this.targetLayer = this.refs.mock.layer
    }
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    this.target = null
  }

  setTint (tint) {
    this.tint = tint
    this.base.tint = (this.alpha === 0) ? 0x000000 : premultiplyAlpha(tint, this.alpha)
  }

  setAlpha (alpha) {
    this.alpha = alpha
    this.setTint(this.tint)
  }

  update () {
    if (this.target) {
      const l = scene[this.targetLayer].toScreen(this.target.x + this.x, this.target.y + this.y)
      const scale = scene[this.targetLayer].scale / scene[this.layer].scale
      this.updatePos(l, scale)
    }
  }

  updatePos (screenPos, scaleMult = 1) {
    this.base.x = this.x
    this.base.y = this.y
    this.base.scale.x = this.oscale[0] * scaleMult
    this.base.scale.y = this.oscale[1] * scaleMult
  }
}

import Level from 'abstractions/Level'
import Animations from './Animations'
import Interests from './Interests'
import Buildings from './CityBuildings'
import SoundCheck from "./SoundChecks";
import Glass from 'components/pixi/LevelCommon/Glass'

export default class LevelPharmacist extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.createGlass()
    this.addColliders()
  }

  createLand () {
    this.addComponent(Buildings)
    this.animations = this.addComponent(Animations)
  }

  createGlass () {
    this.glass = this.addComponent(Glass, { layer: '5bg200', x: 30, y: -50, scale: 0.55 })
  }

  addColliders () {
    this.addComponent(Interests, { onCollide: this.glass.updateVisibility, unlock: this.glass.construct })
    this.addComponent(SoundCheck)
  }
}

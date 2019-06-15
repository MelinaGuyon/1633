import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import SoundCheck from './SoundChecks'
import Glass from 'components/pixi/LevelCommon/Glass'

export default class LevelProfanation extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.createGlass()
    this.addColliders()
  }

  createLand () {
    this.addComponent(Buildings)
  }

  createGlass () {
    this.glass = this.addComponent(Glass, { layer: '3bg200', x: 30, y: -50, scale: 0.55 })
  }

  addColliders () {
    this.addComponent(Interests, { onCollide: this.glass.updateVisibility, unlock: this.glass.construct })
    this.addComponent(SoundCheck)
  }
}

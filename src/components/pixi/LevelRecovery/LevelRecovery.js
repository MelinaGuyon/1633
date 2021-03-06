import Level from 'abstractions/Level'
import Animations from './Animations'
import Buildings from './CityBuildings'
import SoundChecks from './SoundChecks'
import Interests from './Interests'
import sound from 'controllers/sound'
import Glass from 'components/pixi/LevelCommon/Glass'

export default class LevelRecovery extends Level {
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
    this.glass = this.addComponent(Glass, { layer: '7bg200', x: 30, y: -50, scale: 0.55 })
  }

  addColliders () {
    this.addComponent(Interests, { onCollide: this.glass.updateVisibility, unlock: this.glass.construct })
    this.addComponent(SoundChecks)
  }
}

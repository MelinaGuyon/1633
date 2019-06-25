import Level from 'abstractions/Level'
import Animations from './Animations'
import Buildings from './CityBuildings'
import Interests from './Interests'
import sound from 'controllers/sound'
import SoundChecks from "./SoundChecks"
import Glass from 'components/pixi/LevelCommon/Glass'
import store from 'state/store';

export default class LevelSorbonne extends Level {
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
    if (store.isPrez.get()) {
      this.glass = this.addComponent(Glass, { layer: '7bg200', x: 30, y: -50, scale: 0.55 })
    } else {
      this.glass = this.addComponent(Glass, { layer: '9bg200', x: 30, y: -50, scale: 0.55 })
    }
  }

  addColliders () {
	  this.addComponent(SoundChecks)
    this.addComponent(Interests, { onCollide: this.glass.updateVisibility, unlock: this.glass.construct })
  }
}

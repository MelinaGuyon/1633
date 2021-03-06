import Level from 'abstractions/Level'
import Animations from './Animations'
import Buildings from './CityBuildings'
import Interests from './Interests'
import Glass from 'components/pixi/LevelCommon/Glass'
import sound from 'controllers/sound'
import SoundCheck from "./SoundChecks";
import store from 'state/store';

export default class LevelCeremonie extends Level {
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
      this.glass = this.addComponent(Glass, { layer: '6bg200', x: 30, y: -50, scale: 0.55 })
    } else {
      this.glass = this.addComponent(Glass, { layer: '8bg200', x: 30, y: -50, scale: 0.55 })
    }
  }

  addColliders () {
    this.addComponent(Interests, { onCollide: this.glass.updateVisibility, unlock: this.glass.construct })
    this.addComponent(SoundCheck)
  }
}

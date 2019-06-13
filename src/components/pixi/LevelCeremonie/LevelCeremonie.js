import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import Glass from 'components/pixi/LevelCommon/Glass'
import sound from 'controllers/sound'
import SoundCheck from "./SoundChecks";

export default class LevelCeremonie extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.createGlass()
    this.addColliders()
    sound.play('music_studio')
  }

  createLand () {
    this.addComponent(Buildings)
  }

  createGlass () {
    this.glass = this.addComponent(Glass, { layer: '8bg200', x: 30, y: -50, scale: 0.55 })
  }

  addColliders () {
    this.addComponent(Interests, { onCollide: this.glass.update, unlock: this.glass.construct })
	  this.addComponent(SoundCheck)
  }
}

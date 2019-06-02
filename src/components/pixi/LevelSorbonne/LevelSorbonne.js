import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import sound from 'controllers/sound'
import SoundChecks from "./SoundChecks"

export default class LevelSorbonne extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.addColliders()
    sound.play('music_studio')
  }

  createLand () {
    this.addComponent(Buildings)
  }

  addColliders () {
	  this.addComponent(SoundChecks)
    this.addComponent(Interests)
  }
}

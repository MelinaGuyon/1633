import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import sound from 'controllers/sound'
import SoundCheck from './SoundChecks'

export default class LevelUniversity extends Level {
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
    this.addComponent(Interests)
	  this.addComponent(SoundCheck)
  }
}

import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import SoundChecks from './SoundChecks'
import Interests from './Interests'
import sound from 'controllers/sound'

export default class LevelRecovery extends Level {
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
    this.addComponent(SoundChecks)
  }
}

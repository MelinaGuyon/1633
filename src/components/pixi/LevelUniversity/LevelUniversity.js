import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import LevelChecks from './LevelChecks'
import sound from 'controllers/sound'

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
    // this.addComponent(LevelChecks)
  }
}

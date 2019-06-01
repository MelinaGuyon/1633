import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import sound from 'controllers/sound'

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
    this.addComponent(Interests)
  }
}

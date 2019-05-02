import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import sound from 'controllers/sound'

export default class LevelUniversity extends Level {
  setup () {
    super.setup()
    this.createLand()
    sound.play('music_studio')
  }

  createLand () {
    this.addComponent(Buildings)
  }
}

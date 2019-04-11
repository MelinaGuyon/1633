import Level from 'abstractions/Level'
import Buildings from './CityBuildings'

export default class LevelChurch extends Level {
  setup () {
    super.setup()
    this.createLand()
  }

  createLand () {
    this.addComponent(Buildings)
  }
}

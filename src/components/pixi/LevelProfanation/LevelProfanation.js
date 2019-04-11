import Level from 'abstractions/Level'
import Buildings from './CityBuildings'

export default class LevelProfanation extends Level {
  setup () {
    super.setup()
    this.createLand()
  }

  createLand () {
    this.addComponent(Buildings)
  }
}

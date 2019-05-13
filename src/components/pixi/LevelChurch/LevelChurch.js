import Level from 'abstractions/Level'
import Interests from './Interests'
import Buildings from './CityBuildings'

export default class LevelChurch extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.addInterest()
  }

  createLand () {
    this.addComponent(Buildings)
  }

  addInterest () {
    this.addComponent(Interests)
  }
}

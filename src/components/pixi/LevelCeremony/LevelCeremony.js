import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'

export default class LevelCeremony extends Level {
  setup () {
    super.setup()
    this.createLand()
    this.addColliders()
  }

  createLand () {
    this.addComponent(Buildings)
  }

  addColliders () {
    this.addComponent(Interests)
  }
}

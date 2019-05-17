import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import LevelChecks from './LevelChecks'

export default class LevelProfanation extends Level {
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
    this.addComponent(LevelChecks)
  }
}

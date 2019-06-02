import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
import Interests from './Interests'
import SoundCheck from "./SoundChecks";

export default class LevelNapoleon extends Level {
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
    this.addComponent(SoundCheck)
  }
}

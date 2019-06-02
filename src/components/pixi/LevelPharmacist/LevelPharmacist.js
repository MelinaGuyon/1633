import Level from 'abstractions/Level'
import Interests from './Interests'
import Buildings from './CityBuildings'
import SoundCheck from "./SoundChecks";

export default class LevelPharmacist extends Level {
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

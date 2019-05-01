import Level from 'abstractions/Level'
import Buildings from './CityBuildings'
// import Light from 'components/pixi/LevelCommon/Light'

export default class LevelUniversity extends Level {
  setup () {
    super.setup()
    this.createLand()
    /** test light
    this.toggleLight = this.addComponent(Light, {
      layer: 'bg600',
      y: 10,
      tint: 0x226699,
      scale: [3, 1.2]
    })**/
  }

  createLand () {
    this.addComponent(Buildings)
  }
}

import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '7bg200', x: 0, y: -162, tint: 0x00ff00 }))
    this.mains.push(this.addComponent(Building, { layer: '7bg200', x: 0, type: 'a', y: -150, tint: 0x00ff00 }))
    this.mains.push(this.addComponent(Light, { layer: '7bg200', form: 'light/main', target: this.base, x: 7, y: -63, tint: 0x886600, alpha: 1, scale: [0.3, 0.27] }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '5bg600', x: 0, y: -162, scale: 0.4, tint: 0x77ddff }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: 'bg600', x: -45, y: -162, scale: 0.4, tint: 0x77ddff }))
    this.mains.push(this.addComponent(Building, { layer: 'bg600', type: 'a', scale: 0.4, x: -50, y: -150 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '2bg100', x: 0, y: -162, scale: 0.4, tint: 0x77ddff })) // little
    this.mains.push(this.addComponent(Building, { layer: '2bg200', type: 'a', scale: 0.4, x: 0, y: -150 })) // big
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

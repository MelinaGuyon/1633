import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '2bg100', x: 0, y: -162, tint: 0x77ddff })) // little
    // this.mains.push(this.addComponent(Building, { layer: '2bg200', type: 'a', x: 0, y: -150 })) // big
    this.mains.push(this.addComponent(Building, { layer: '2bg200', x: 0, type: 'd', scale: 0.9, y: -100 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

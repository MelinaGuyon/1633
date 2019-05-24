import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '6bg200', x: 0, y: -162, tint: 0x77ddff }))

    this.mains.push(this.addComponent(Building, { layer: '6bg200', x: 0, y: -162, tint: 0x77ddff }))
    this.mains.push(this.addComponent(Building, { layer: '6bg200', x: 0, type: 'a', y: -150 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

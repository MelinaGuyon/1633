import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '5bg200', x: 0, y: -162, tint: 0xff0000 }))
    this.mains.push(this.addComponent(Building, { layer: '5bg200', x: 0, y: -162, tint: 0xff0000 }))
    this.mains.push(this.addComponent(Building, { layer: '5bg200', x: 0, type: 'a', y: -150, tint: 0xff0000 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

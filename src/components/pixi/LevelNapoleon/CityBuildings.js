import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'a', x: 0, y: -50 }))
    this.mains.push(this.addComponent(Building, { layer: '5bg500', type: 'b', x: 0, y: -50 }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

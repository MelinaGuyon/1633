import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '10bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '10bg700', type: 'b', x: 0, y: -55, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '10bg690', type: 'c', x: 0, y: -50, scale: 0.66 })) // incrustation

    this.mains.push(this.addComponent(Building, { layer: '10bg500', type: 'e', x: 10, y: 0, scale: 0.62 })) // mausolé
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

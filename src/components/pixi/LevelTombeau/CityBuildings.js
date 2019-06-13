import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '10bg700', type: 'c', x: 0, y: 0, scale: 0.66 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '10bg700', type: 'b', x: 10, y: -56, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '10bg700', type: 'a', x: -13, y: -45, scale: 0.66 })) // big

    this.mains.push(this.addComponent(Building, { layer: '10bg700', type: 'd', x: -13, y: -45, scale: 0.66 })) // fenêtres
    this.mains.push(this.addComponent(Building, { layer: '10bg600', type: 'e', x: 10, y: 0, scale: 0.62 })) // mausolé
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

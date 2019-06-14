import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '5bg800', type: 'd', x: -100, y: -40, scale: 0.64 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'c', x: -125, y: -60, scale: 0.64 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '5bg690', type: 'b', x: -115, y: -60, scale: 0.64 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '5bg680', type: 'a', x: -100, y: -40, scale: 0.64 })) // big

    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'e', x: -600, y: -200, scale: 0.64 })) // nuage petit
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'f', x: -510, y: -300, scale: 0.64 })) // nuage plus gros
    this.mains.push(this.addComponent(Building, { layer: '5bg500', type: 'g', x: -460, y: -330, scale: 0.7 })) // maison
    this.mains.push(this.addComponent(Building, { layer: '5bg400', type: 'h', x: -790, y: -410, scale: 0.64 })) // muraille
    this.mains.push(this.addComponent(Building, { layer: '5bg300', type: 'i', x: 50, y: -310, scale: 0.64 })) // arbre
    this.mains.push(this.addComponent(Building, { layer: '5f100', type: 'j', x: -650, y: -290, scale: 0.64 })) // chat
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

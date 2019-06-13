import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'd', x: 0, y: -40, scale: 0.64 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'c', x: -25, y: -60, scale: 0.64 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'b', x: -15, y: -60, scale: 0.64 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'a', x: 0, y: -40, scale: 0.64 })) // big

    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'e', x: -550, y: -190, scale: 0.64 })) // nuage petit
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'f', x: -460, y: -290, scale: 0.64 })) // nuage plus gros
    this.mains.push(this.addComponent(Building, { layer: '5bg500', type: 'g', x: -630, y: -460, scale: 0.64 })) // maison
    this.mains.push(this.addComponent(Building, { layer: '5bg400', type: 'h', x: -750, y: -400, scale: 0.64 })) // muraille
    this.mains.push(this.addComponent(Building, { layer: '5bg300', type: 'i', x: -620, y: -400, scale: 0.64 })) // arbre
    this.mains.push(this.addComponent(Building, { layer: '5f100', type: 'j', x: -570, y: -280, scale: 0.64 })) // chat
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

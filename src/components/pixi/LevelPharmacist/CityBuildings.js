import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '5bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '5bg700', type: 'd', x: 0, y: -55, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '5bg690', type: 'b', x: 0, y: -50, scale: 0.66 })) // fond

    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'e', x: -490, y: -225, scale: 0.64 })) // nuage petit
    this.mains.push(this.addComponent(Building, { layer: '5bg600', type: 'f', x: -300, y: -270, scale: 0.64 })) // nuage plus gros
    this.mains.push(this.addComponent(Building, { layer: '5bg500', type: 'g', x: 20, y: -130, scale: 0.7 })) // maison
    this.mains.push(this.addComponent(Building, { layer: '5bg400', type: 'h', x: -80, y: -80, scale: 0.64 })) // muraille
    this.mains.push(this.addComponent(Building, { layer: '5f100', type: 'j', x: -450, y: -15, scale: 0.64 })) // chat
    this.mains.push(this.addComponent(Building, { layer: '5bg300', type: 'i', x: 315, y: -87, scale: 0.64 })) // arbre
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

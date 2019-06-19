import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '6bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '6bg700', type: 'c', x: 0, y: -55, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '6bg690', type: 'b', x: 0, y: -50, scale: 0.66 })) // fond

    this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'd', x: -390, y: -90, scale: 0.66 })) // fenetre gauche
    this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'e', x: 445, y: -80, scale: 0.66 })) // fenetre droite
    this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'g', x: -170, y: -70, scale: 0.66 })) // bibliothèque
    // this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'j', x: -215, y: -252, scale: 0.66 })) // chat
    // this.mains.push(this.addComponent(Building, { layer: '6bg500', type: 'f', x: 80, y: 30, scale: 0.7 })) // bureau
    this.mains.push(this.addComponent(Building, { layer: '6bg400', type: 'k', x: -40, y: 35, scale: 0.64 })) // armez
    // this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'i', x: 50, y: -220, scale: 0.58 })) // lampe
    this.mains.push(this.addComponent(Building, { layer: '6f100', type: 'h', x: 335, y: 50, scale: 0.64 })) // petit fils
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

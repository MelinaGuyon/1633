import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '6bg800', type: 'a', x: -620, y: -325, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '6bg700', type: 'c', x: -620, y: -350, scale: 0.66 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '6bg690', type: 'b', x: -620, y: -330, scale: 0.66 })) // fond

    this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'd', x: -540, y: -230, scale: 0.66 })) // fenetre gauche
    this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'e', x: 245, y: -280, scale: 0.66 })) // fenetre droite
    this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'g', x: -370, y: -250, scale: 0.66 })) // bibliothèque
    this.mains.push(this.addComponent(Building, { layer: '6bg500', type: 'f', x: -130, y: -130, scale: 0.7 })) // bureau
    this.mains.push(this.addComponent(Building, { layer: '6f100', type: 'h', x: 200, y: -200, scale: 0.64 })) // petit fils
    this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'i', x: -150, y: -310, scale: 0.58 })) // lampe
    this.mains.push(this.addComponent(Building, { layer: '6bg600', type: 'j', x: -350, y: -290, scale: 0.66 })) // chat
    this.mains.push(this.addComponent(Building, { layer: '6bg400', type: 'k', x: -230, y: -116, scale: 0.64 })) // armez
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

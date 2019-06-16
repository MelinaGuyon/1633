import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '2bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '2bg700', type: 'c', x: 0, y: -55, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '2bg690', type: 'b', x: 0, y: -50, scale: 0.66 })) // big

    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'd', x: 0, y: -30, scale: 0.66 })) // immeuble fond
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'e', x: 10, y: -50, scale: 0.66 })) // immeuble droite
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'f', x: -15, y: -50, scale: 0.66 })) // immeuble gauche
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'g', x: -140, y: 0, scale: 0.6 })) // puit
    // this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'k', x: 0, y: -60, scale: 0.66 })) // lampe
    // this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'l', x: -350, y: -210, scale: 0.66 })) // vetement

    this.mains.push(this.addComponent(Building, { layer: '2f100', type: 'v', x: -390, y: 30, scale: 0.66 })) // femme gauche
    this.mains.push(this.addComponent(Building, { layer: '2f200', type: 'i', x: 20, y: 200, scale: 0.62 })) // tete
    this.mains.push(this.addComponent(Building, { layer: '2bg200', type: 'y', x: -65, y: 215, scale: 0.6 })) // joueur centre
    this.mains.push(this.addComponent(Building, { layer: '2f200', type: 'x', x: -130, y: 100, scale: 0.6 })) // joueur left
    this.mains.push(this.addComponent(Building, { layer: '2f200', type: 'w', x: 105, y: 45, scale: 0.6 })) // joueuse right
    this.mains.push(this.addComponent(Building, { layer: '2bg200', type: 'z', x: 450, y: 0, scale: 0.7 })) // baschamp
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

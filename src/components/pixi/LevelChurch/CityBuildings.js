import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '2bg700', type: 'c', x: 0, y: -50, scale: 0.66 })) // fond incrusté
    this.mains.push(this.addComponent(Building, { layer: '2bg700', type: 'b', x: -15, y: -70, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '2bg700', type: 'a', x: 0, y: -50, scale: 0.66 })) // big

    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'd', x: 0, y: -20, scale: 0.66 })) // immeuble fond
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'e', x: 20, y: -50, scale: 0.66 })) // immeuble droite
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'f', x: -20, y: -50, scale: 0.66 })) // immeuble gauche
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'g', x: -180, y: 0, scale: 0.66 })) // puit
    this.mains.push(this.addComponent(Building, { layer: '2bg500', type: 'i', x: 35, y: 190, scale: 0.64 })) // tete
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'k', x: -20, y: -90, scale: 0.66 })) // lampe
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'l', x: -350, y: -220, scale: 0.66 })) // vetement

    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'z', x: -168, y: -360, scale: 0.66 })) // baschamp
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'y', x: -700, y: -150, scale: 0.66 })) // joueur centre
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'x', x: -230, y: -50, scale: 0.66 })) // joueur left
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'w', x: -60, y: -250, scale: 0.66 })) // joueur right
    this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'v', x: -434, y: -200, scale: 0.66 })) // femme gauche
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

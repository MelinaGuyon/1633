import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '2bg800', type: 'a', x: 0, y: -60, scale: 0.66 })) // big
    this.mains.push(this.addComponent(Building, { layer: '2bg700', type: 'c', x: 0, y: -55, scale: 0.66 })) // incrustation
    this.mains.push(this.addComponent(Building, { layer: '2bg690', type: 'b', x: 0, y: -50, scale: 0.66 })) // big

    // this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'd', x: -450, y: -370, scale: 0.66 })) // immeuble fond
    // this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'e', x: -500, y: -400, scale: 0.66 })) // immeuble droite
    // this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'f', x: -470, y: -300, scale: 0.66 })) // immeuble gauche
    // this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'g', x: -200, y: -250, scale: 0.6 })) // puit
    // this.mains.push(this.addComponent(Building, { layer: '2f200', type: 'i', x: 120, y: 140, scale: 0.62 })) // tete
    // this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'k', x: -400, y: -350, scale: 0.66 })) // lampe
    // this.mains.push(this.addComponent(Building, { layer: '2bg600', type: 'l', x: -350, y: -320, scale: 0.66 })) // vetement

    // this.mains.push(this.addComponent(Building, { layer: '2bg200', type: 'z', x: 500, y: -180, scale: 0.66 })) // baschamp
    // this.mains.push(this.addComponent(Building, { layer: '2bg200', type: 'y', x: -490, y: -160, scale: 0.6 })) // joueur centre
    // this.mains.push(this.addComponent(Building, { layer: '2f200', type: 'x', x: -50, y: -50, scale: 0.6 })) // joueur left
    // this.mains.push(this.addComponent(Building, { layer: '2f200', type: 'w', x: 100, y: -220, scale: 0.6 })) // joueur right
    // this.mains.push(this.addComponent(Building, { layer: '2f100', type: 'v', x: -350, y: -170, scale: 0.66 })) // femme gauche
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

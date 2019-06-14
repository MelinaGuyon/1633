import PixiComponent from 'abstractions/PixiComponent'
import Building from './CityBuilding'
import Light from 'components/pixi/LevelCommon/Light'

export default class CityBuildings extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(Building, { layer: '8bg800', type: 'a', x: -610, y: -325, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '8bg700', type: 'b', x: -620, y: -325, scale: 0.66 })) // fond
    this.mains.push(this.addComponent(Building, { layer: '8bg690', type: 'c', x: -620, y: -330, scale: 0.68 })) // fond incrusté

    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'd', x: 60, y: -280, scale: 0.66 })) // village
    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'e', x: 330, y: -260, scale: 0.66 })) // nuage droite
    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'f', x: -520, y: -280, scale: 0.66 })) // nuage gauche
    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'g', x: 60, y: -320, scale: 0.66 })) // nuage centre
    this.mains.push(this.addComponent(Building, { layer: '8bg600', type: 'h', x: -130, y: -320, scale: 0.66 })) // nuage centre guache
    this.mains.push(this.addComponent(Building, { layer: '8bg500', type: 'i', x: -260, y: -290, scale: 0.63 })) // mec sceptre
    this.mains.push(this.addComponent(Building, { layer: '8bg500', type: 'j', x: -400, y: -250, scale: 0.63 })) // mec livre
    this.mains.push(this.addComponent(Building, { layer: '8bg500', type: 'k', x: -140, y: -270, scale: 0.63 })) // mec porte tete

    this.mains.push(this.addComponent(Building, { layer: '8bg400', type: 'l', x: 330, y: -240, scale: 0.66 })) // roi
    this.mains.push(this.addComponent(Building, { layer: '8f100', type: 'm', x: 170, y: -60, scale: 0.66 })) // femme droite
    this.mains.push(this.addComponent(Building, { layer: '8bg300', type: 'n', x: 310, y: -40, scale: 0.66 })) // mec droite

    this.mains.push(this.addComponent(Building, { layer: '8f200', type: 'o', x: -510, y: -60, scale: 0.66 })) // femme gauche
    this.mains.push(this.addComponent(Building, { layer: '8bg300', type: 'p', x: -640, y: -50, scale: 0.66 })) // mec gauche
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

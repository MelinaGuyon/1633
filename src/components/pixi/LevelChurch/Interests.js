import PixiComponent from 'abstractions/PixiComponent'
import InterestPoint from 'abstractions/InterestPoint'

export default class Interests extends PixiComponent {
  setup () {
    this.mains = []
    this.mains.push(this.addComponent(InterestPoint, { layer: 'bg600', lockedKey: 0, x: 300, y: -100, collide: true }))
  }

  componentWillUnmount () {
    this.mains = undefined
  }
}

import { h, addRef } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'

import './ChronologieTimeline.styl'
import { timingSafeEqual } from 'crypto';

class Stick extends DomComponent {
  template (props) {

    return (
      <div class='stick' ref={addRef(this, 'chronoTimeline')}>
      </div>
    )
  }
}

export default class ChronologieTimeline extends DomComponent {
  template ({ base }) {
    console.log('timelien chrono')
    this.stickNumber = 65
    this.currentStick = 33
    this.sticks = Array(this.stickNumber)


    const sticks = []
    const refSticks = i => el => {
      this.sticks[i] = el
    }
    for (let i = 0; i < this.stickNumber; i++) {
      sticks.push(<Stick ref={refSticks(i)} id={i} />)
    }

    return (
      <div class='chrono-timeline' ref={addRef(this, 'chronoTimeline')}>
        <div class='container'>
          {sticks}
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.updateStick()
  }

  updateStick () {
    console.log(this.sticks)
    this.sticks[this.currentStick - 2].base.style.transform = 'scaleX(0.5)'
    this.sticks[this.currentStick - 1].base.style.transform = 'scaleX(0.7)'

    this.sticks[this.currentStick].base.style.transform = 'scaleX(1)'

    this.sticks[this.currentStick + 1].base.style.transform = 'scaleX(0.7)'
    this.sticks[this.currentStick + 2].base.style.transform = 'scaleX(0.5)'
  }
}

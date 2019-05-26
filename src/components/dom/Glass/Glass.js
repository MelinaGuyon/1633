import { DomComponent } from 'abstractions/DomComponent'
import { h } from '@internet/dom'

import './Glass.styl'

export default class Glass extends DomComponent {
  template ({ base }) {
    return (
      <div class='glass'>
        <img src='assets/img/glass/glass-0.png' alt=''/>
        <img src='assets/img/glass/glass-1.png' alt=''/>
        <img src='assets/img/glass/glass-2.png' alt=''/>
        <img src='assets/img/glass/glass-3.png' alt=''/>
        <img src='assets/img/glass/glass-4.png' alt=''/>
        <img src='assets/img/glass/glass-5.png' alt=''/>
        <img src='assets/img/glass/glass-6.png' alt=''/>
      </div>
    )
  }

  componentDidMount () {
  }
}

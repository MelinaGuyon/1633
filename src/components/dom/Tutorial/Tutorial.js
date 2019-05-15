import { h } from '@internet/dom'
import { DomComponent } from 'abstractions/DomComponent'
import MouseMv from 'components/dom/MouseMv/MouseMv'

import './Tutorial.styl'

class TutoKeyboard extends DomComponent {
	template (props) {
		return (
      <div>tuto keyboard</div>
		)
	}

	componentDidMount () {
		this.bind()
	}

	bind () {
	}

	onClick (e) {

	}
}


export default class Tutorial extends DomComponent {
  template ({ base }) {
    return (
      <section class='tutorial'>
        <TutoKeyboard />
      </section>
    )
  }

  componentDidMount () {
    console.log('Tutorial did mount')
  }
}

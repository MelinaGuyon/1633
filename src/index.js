import 'style/common.styl'

import { h, render } from '@internet/dom'
import Main from 'abstractions/Main'
import App from 'components/dom/App/App'
import Resize from 'utils/resize'
import Mouse from 'utils/mouse'
import Keyboard from 'utils/keyboard'
import logger from 'utils/logger'
import addBowserClasses from 'utils/bowserToClasses'

window.onload = () => {
  const main = new Main()
  main
    .use(Resize)
    .use(Mouse)
    .use(Keyboard)
    .start(() => {
      logger('App', '#eda61a').log('setup succes')
      render(<App base={document.body.querySelector('.app')} />)
    })

  addBowserClasses()
}

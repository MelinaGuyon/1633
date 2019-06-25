import bowser from 'bowser'
import store from 'state/store'

const $ = document.documentElement
const classes = $.classList
let device = {}
let init = false

function add (values) {
  if (!Array.isArray(values)) values = [values]
  for (let i = 0; i < values.length; i++) {
    const v = values[i]
    classes.add(v)
    device[v] = true
  }
}

export default function addBowserClasses () {
  if (init) return
  if (bowser.mobile) add(['mobile', 'touch'])
  else if (bowser.tablet) add(['tablet', 'touch'])
  else add('desktop')

  if (bowser.chrome || bowser.chromium) add('chrome')
  else if (bowser.safari) add('safari')
  else if (bowser.firefox) add('firefox')
  else if (bowser.msedge) add('edge')
  else if (bowser.opera) add('opera')
  else add('ie')

  if (bowser.mac) add('mac')
  else if (bowser.linux) add('linux')
  else if (bowser.ios) add('ios')
  else if (bowser.android) add('android')
  else if (bowser.windowsphone) add('windowsphone')
  else add('windows')

  if (bowser.msie && bowser.version >= 9 && bowser.version < 10) add('ie9')
  else if (bowser.msie && bowser.version >= 10 && bowser.version < 11) add('ie10')
  else if (bowser.msie && bowser.version >= 11 && bowser.version < 12) add('ie11')

  if (bowser.webkit || bowser.safari || bowser.chrome) add('webkit')
  else if (bowser.firefox || bowser.gecko) add('gecko')

  store.device.set(device)
  init = true
}

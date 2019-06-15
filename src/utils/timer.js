import { RafTimer } from '@internet/raf'

const timers = []

export function updateTimers (dt) {
  let n = timers.length
  while (n--) {
    timers[n].update(dt)
    if (timers._stopped) {
      timers[n].dispose()
      timers.splice(n, 1)
    }
  }
}

export default function timer (delay = 1000, cb) {
  if (!cb) {
    return new Promise(resolve => {
      const timer = new RafTimer(delay, resolve)
      timers.push(timer)
    })
  } else {
    const timer = new RafTimer(delay, cb)
    timers.push(timer)
  }
}

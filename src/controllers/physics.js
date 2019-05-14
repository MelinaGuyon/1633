import Body from 'abstractions/Body'
import store from 'state/store'

const groups = {}
const groupColors = {}

const api = { createGroup, addBody, removeBody, update }

function sign (x) { return x ? x < 0 ? -1 : 1 : 0 }

function createGroup (groupName, opts = {}) {
  if (groups[groupName]) return
  groups[groupName] = []
  groupColors[groupName] = opts.color || 0xff0000
}

function addBody (props) {
  if (!props.group) return
  props.color = groupColors[props.group]
  const body = new Body(props)
  groups[body.group].push(body)
  return body
}

function removeBody (body) {
  const index = groups[body.group].indexOf(body)
  if (!body.destroyed) body.destroy()
  if (!~index) return
  groups[body.group].splice(index, 1)
}

function checkCollide (bA, bB, cb, prevState, gA, gB) {
  // bA is perso
  // bB is colliders

  // console.log('bbbbbbbbbbbbb', bB)

  const newState = { collide: false, spaceCb: undefined, histoFact: undefined }

  // distance
  const layerDisplacement = store.size.get().w / 2 - bB.container.base.x
  const offsetObject = bB.x + bB.width / 2
  const dx = offsetObject - layerDisplacement
  const hCollide = Math.abs(dx) < bB.width / 2

  if (!hCollide) {
    cb(newState)
    return false
  }

  newState.collide = true
  newState.spaceCb = bB.cb
  // newState.histoFact = bB.histoFact

  cb && cb(newState)
  return true
}

function update (dt) {
  let n, n2, g, i, bodyA, bodyB

  // update pos
  for (n in groups) {
    for (i = 0; i < groups[n].length; i++) groups[n][i].update(dt)
  }

  // check for collision
  for (n in groups) {
    let i = groups[n].length
    while (i--) {
      if (!groups[n][i].hasColliders) continue
      bodyA = groups[n][i]
      bodyA.needsReset = true
      // if a body has colliders, iterate on each group listened
      let j = groups[n][i].colliders.length
      while (j--) {
        if (!groups[n][i].colliders[j]) continue
        n2 = groups[n][i].colliders[j][0]
        g = groups[n2]
        let k = g.length
        while (k--) {
          bodyB = g[k]
          if (!bodyA.hasMoved && !bodyB.hasMoved) return
          if (!groups[n][i].colliders[j]) continue
          if (bodyA.needsReset) { bodyA.inGround = bodyA.needsReset = false }
          checkCollide(bodyA, bodyB, groups[n][i].colliders[j][1], groups[n][i].colliders[j][2], n, n2)
        }
      }
    }
  }
}

export default api

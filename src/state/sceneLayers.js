// Layers used by the camera, to do parralax
// no sorting is done after this.
// keep them in a logical rendering order (back, middle, front)
// -1000 : fixed
// 0 : move normally
// 1000 : move twice the speed

export default [
  ['fixed', -1000], // will not move

  ['bg800', -800],
  ['bg600', -600],
  ['bg400', -400],
  ['bg200', -200],

  ['prehero', 0], // main layer, behind hero
  ['hero', 0], // main layer, used only for the hero

  ['f200', 200],
  ['f650', 650],

  ['light', 0] // light system is on a specific group to avoid breaking the batching too much
]

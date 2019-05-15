// Layers used by the camera, to do parralax
// no sorting is done after this.
// keep them in a logical rendering order (back, middle, front)
// -1000 : fixed
// 0 : move normally
// 1000 : move twice the speed

export default [
  ['fixed', -1000], // will not move

  ['3bg800', -800],
  ['3bg600', -600],
  ['3bg400', -400],
  ['3bg200', -200],

  ['2bg800', -800],
  ['2bg600', -600],
  ['2bg400', -400],
  ['2bg200', -200],

  ['1bg800', -800],
  ['1bg600', -600],
  ['1bg400', -400],
  ['1bg200', -200],

  ['prehero', 0], // main layer, behind hero
  ['hero', 0], // main layer, used only for the hero

  ['3f200', 200],
  ['3f650', 650],

  ['2f200', 200],
  ['2f650', 650],

  ['1f200', 200],
  ['1f650', 650]
]

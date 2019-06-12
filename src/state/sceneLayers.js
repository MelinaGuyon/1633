// Layers used by the camera, to do parralax
// no sorting is done after this.
// keep them in a logical rendering order
// layer are rendering one by one: that is what give them z position, so you must keep the logic for each chapters
// -1000 to 0 in bg
// 0 to 1000 in fg

export default [
  ['fixed', -1000, 0], // will not move

  ['11bg800', -800, 0],
  ['11bg700', -700, 0],
  ['11bg600', -600, 0],
  ['11bg500', -500, 0],
  ['11bg200', -200, 0],
  ['11bg100', -100, 0],

  ['10bg800', -800, 0],
  ['10bg700', -700, 0],
  ['10bg600', -600, 0],
  ['10bg500', -500, 0],
  ['10bg200', -200, 0],
  ['10bg100', -100, 0],

  ['9bg800', -800, 0],
  ['9bg700', -700, 0],
  ['9bg600', -600, 0],
  ['9bg500', -500, 0],
  ['9bg200', -200, 0],
  ['9bg100', -100, 0],

  ['8bg800', -800, 0],
  ['8bg700', -700, 0],
  ['8bg600', -600, 0],
  ['8bg500', -500, 0],
  ['8bg200', -200, 0],
  ['8bg100', -100, 0],

  ['7bg800', -800, 0],
  ['7bg700', -700, 0],
  ['7bg600', -600, 0],
  ['7bg500', -500, 0],
  ['7bg200', -200, 0],
  ['7bg100', -100, 0],

  ['6bg800', -800, 0],
  ['6bg700', -700, 0],
  ['6bg600', -600, 0],
  ['6bg200', -200, 0],
  ['6bg100', -100, 0],

  ['5bg800', -800, 0],
  ['5bg700', -700, 0],
  ['5bg600', -600, 0],
  ['5bg200', -200, 0],
  ['5bg100', -100, 0],

  ['4bg800', -800, 0],
  ['4bg700', -700, 0],
  ['4bg600', -600, 0],
  ['4bg500', -500, 0],
  ['4bg200', -200, 0],
  ['4bg100', -100, 0],

  ['3bg800', -800, 0],
  ['3bg700', -700, 0],
  ['3bg600', -600, 0],
  ['3bg200', -200, 0],
  ['3bg100', -100, 0],

  ['2bg800', -800, 0],
  ['2bg700', -700, 0],
  ['2bg600', -600, 0],
  ['2bg500', -500, 0],
  ['2bg200', -200, 0],
  ['2bg100', -100, 0],

  ['1bg800', -800, -70],
  ['1bg700', -700, 0],
  ['1bg690', -690, -30],
  ['1bg600', -600, 0],
  ['1bg500', -500, 0],
  ['1bg400', -500, 100],
  ['1bg0', 0, 0],

  ['0bg800', -800, 0],
  ['0bg700', -700, 0],
  ['0bg600', -600, 0],
  ['0bg500', -500, 0],
  ['0bg200', -200, 0],
  ['0bg100', -100, 0],

  ['prehero', 0, 0], // main layer, behind hero
  ['hero', 0, 0], // main layer, used only for the hero

  ['3f100', 100, 100],
  ['3f200', 200, 200],

  ['1f100', 100, 100],
  ['1f200', 200, 100]
]

// Layers used by the camera, to do parralax
// no sorting is done after this.
// keep them in a logical rendering order
// layer are rendering one by one: that is what give them z position, so you must keep the logic for each chapters
// -1000 to 0 in bg
// 0 to 1000 in fg

export default [
  ['fixed', -1000, 0], // will not move

  ['11bg800', -800, -70],
  ['11bg700', -700, -30],
  ['11bg690', -690, 0],
  ['11bg600', -600, 0],
  ['11bg500', -500, 50],
  ['11bg200', -200, 0],

  ['10bg800', -800, -70],
  ['10bg700', -700, -30],
  ['10bg690', -690, 0],
  ['10bg500', -500, 50],
  ['10bg200', -200, 0],
  ['10bg100', -100, 0],

  ['9bg800', -800, 0],
  ['9bg700', -700, -30],
  ['9bg600', -600, 0],
  ['9bg500', -500, 70],
  ['9bg200', -200, 0],

  ['8bg800', -800, -60],
  ['8bg700', -700, 0],
  ['8bg690', -690, -30],
  ['8bg600', -600, 0],
  ['8bg500', -500, 60],
  ['8bg400', -400, 0],
  ['8bg300', -300, 60],
  ['8bg200', -200, 0],

  ['7bg800', -800, 0],
  ['7bg700', -700, -30],
  ['7bg600', -600, 0],
  ['7bg500', -500, 70],
  ['7bg200', -200, 0],

  ['6bg800', -800, -60],
  ['6bg700', -700, 0],
  ['6bg690', -690, -30],
  ['6bg600', -600, 0],
  ['6bg500', -500, 60],
  ['6bg400', -400, 0],
  ['6bg300', -300, 60],
  ['6bg200', -200, 0],

  ['5bg800', -800, -70],
  ['5bg700', -700, 0],
  ['5bg690', -690, -30],
  ['5bg600', -600, 100],
  ['5bg500', -500, 0],
  ['5bg400', -400, 30],
  ['5bg300', -300, 0],
  ['5bg200', -200, 0],

  ['4bg800', -800, -70],
  ['4bg700', -700, -30],
  ['4bg690', -690, 0],
  ['4bg600', -600, 0],
  ['4bg400', -400, 100],
  ['4bg200', -200, 0],

  ['3bg800', -800, -70],
  ['3bg700', -700, 0],
  ['3bg690', -690, -30],
  ['3bg600', -600, 0],
  ['3bg200', -200, 0],
  ['3bg100', -100, 110],

  ['2bg800', -800, -70],
  ['2bg700', -700, 0],
  ['2bg690', -690, -30],
  ['2bg600', -600, 0],
  ['2bg200', -200, 100],
  ['2bg100', -100, 0],

  ['1bg800', -800, -70],
  ['1bg700', -700, -30],
  ['1bg690', -690, 0],
  ['1light550', -550, 0],
  ['1bg500', -500, 0],
  ['1bg400', -400, 0],
  ['1bg10', -10, 0],

  ['hero', 0, 0], // main layer, used only for the hero

  ['11f100', 100, 70],

  ['9f100', 100, 0],
  ['9f200', 200, 90],

  ['8f100', 100, 50],
  ['8f200', 200, 70],

  ['7f100', 100, 0],
  ['7f200', 200, 90],

  ['6f100', 100, 50],
  ['6f200', 200, 70],

  ['5f100', 100, 80],

  ['4f100', 100, 100],

  ['3f100', 100, 100],
  ['3f200', 200, 130],

  ['2f100', 150, 50],
  ['2f200', 200, 130],

  ['1f100', 100, 100],
  ['1f200', 200, 130]
]

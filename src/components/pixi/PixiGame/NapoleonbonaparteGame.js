import PixiGame from 'abstractions/PixiGame'

import LevelUniversity from 'components/pixi/LevelUniversity/LevelUniversity'
import LevelChurch from 'components/pixi/LevelChurch/LevelChurch'
import LevelProfanation from 'components/pixi/LevelProfanation/LevelProfanation'

const levels = {
  university: LevelUniversity,
  church: LevelChurch,
  profanation: LevelProfanation
}

export default class NapoleonbonaparteGame extends PixiGame {
}

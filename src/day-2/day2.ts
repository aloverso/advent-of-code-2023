type Balls = {
  red: number;
  green: number;
  blue: number
}

const max: Balls = {
  red: 12,
  green: 13,
  blue: 14
}

type Game = {
  id: number;
  rounds: Balls[]
  possible: boolean;
}

type Game2 = {
  id: number;
  maxBlue: number;
  maxGreen: number;
  maxRed: number;
}

export const parseGame = (line: string): Game => {
  const [idText, roundsText] = line.split(':')
  const id = idText.split(' ')[1].trim()
  const rounds = roundsText.split(';')

  const game: Game = {
    id: parseInt(id),
    rounds: [],
    possible: true
  }

  for (let i=0; i<rounds.length; i++) {
    const round = rounds[i]
    game.rounds[i] = { blue: 0, red: 0, green: 0}
    const colors = round.split(',').map(it => it.trim())
    for (const color of colors) {
      const [num, name] = color.split(' ')
      const val = parseInt(num)
      if (name === 'blue') {
        game.rounds[i] = {...game.rounds[i], blue: val}
        if (val > max.blue) {
          game.possible = false
        }
      }
      if (name === 'red') {
        game.rounds[i] = {...game.rounds[i], red: val}
        if (val > max.red) {
          game.possible = false
        }
      }
      if (name === 'green') {
        game.rounds[i] = {...game.rounds[i], green: val}
        if (val > max.green) {
          game.possible = false
        }
      }
    }
  }

  return game
}

export const parseGame2 = (line: string): Game2 => {
  const [idText, roundsText] = line.split(':')
  const id = idText.split(' ')[1].trim()
  const rounds = roundsText.split(';')

  const game: Game2 = {
    id: parseInt(id),
    maxBlue: 0,
    maxRed: 0,
    maxGreen: 0,
  }

  for (let i=0; i<rounds.length; i++) {
    const round = rounds[i]
    const colors = round.split(',').map(it => it.trim())
    for (const color of colors) {
      const [num, name] = color.split(' ')
      const val = parseInt(num)
      if (name === 'blue') {
        if (val > game.maxBlue) {
          game.maxBlue = val
        }
      }
      if (name === 'red') {
        if (val > game.maxRed) {
          game.maxRed = val
        }
      }
      if (name === 'green') {
        if (val > game.maxGreen) {
          game.maxGreen = val
        }
      }
    }
  }

  return game
}

export const sumPowerMaxColor = (input: string): number => {
  const lines = input.split('\n')
  return lines.reduce((acc, cur) => {
    const game = parseGame2(cur)
    const power = game.maxGreen * game.maxRed * game.maxBlue
    return acc + power
  }, 0)
}

export const sumIsPossible = (input: string): number => {
  const lines = input.split('\n')
  return lines.reduce((acc, cur) => {
    const game = parseGame(cur)
    if (game.possible) {
      return acc + game.id
    } else {
      return acc
    }
  }, 0)
}

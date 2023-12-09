type Line = {
  winners: number[];
  yours: number[];
}

export const parseLine = (line: string): Line => {
  const nums = line.split(': ')[1]
  const [winners, yours] = nums.split('|').map(it => it.trim())
  return {
    winners: winners.split(' ').map(it => it.trim()).filter(it => !!it).map(it => parseInt(it)),
    yours: yours.split(' ').map(it => it.trim()).filter(it => !!it).map(it => parseInt(it)),
  }
}

export const countMatches = (line: Line): number => {
  return line.yours.reduce((acc, cur) => {
    if (line.winners.indexOf(cur) > -1) {
      return acc+1
    } else {
      return acc
    }
  }, 0)
}

export const getPoints = (input: string): number => {
  return input
    .split('\n')
    .map(parseLine)
    .map(countMatches)
    .map(count => count === 0 ? 0 : Math.pow(2, count-1))
    .reduce((acc, cur) => (acc+cur), 0)
}

export const getPoints2 = (input: string): number => {


  const matches = input
    .split('\n')
    .map(parseLine)
    .map(countMatches)

  const multipliers: Record<string, number> = (new Array(matches.length).fill('A')).reduce((acc, cur, index) => {
    return {...acc, [index]: 1}
  }, {})

    matches.forEach((matchCount, i) => {
      for (let mult=0; mult<multipliers[i]; mult++) {
        if (matchCount > 0) {
          for (let match=0; match<matchCount; match++) {
            multipliers[i+match+1] += 1
          }
        }
      }
    })

  return Object.values(multipliers).reduce((acc, cur) => acc+cur, 0)
}
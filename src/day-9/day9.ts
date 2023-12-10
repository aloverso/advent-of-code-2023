export const next = (input: number[]): number => {
  return input[input.length-1] + differences(input, [])
    .reduce((acc, cur) => (acc+cur), 0)
}

export const differences = (input: number[], last: number[]): number[] => {
  if (input.every(it => it==0)) {
    return last
  }
  const newInput = input.reduce((acc, cur, i) => {
    if (i==0) return []
    return [...acc, input[i] - input[i-1]]
  }, [])
  return differences(newInput, [...last, newInput[newInput.length-1]])
}

export const sumNexts = (input: string): number => {
  const lines = input.split('\n')
  return lines.reduce((acc, cur) => {
    return acc + next(cur.split(' ').map(it => parseInt(it)))
  }, 0)
}

export const sumPrevs = (input: string): number => {
  const lines = input.split('\n')
  return lines.reduce((acc, cur) => {
    return acc + next(cur.split(' ').reverse().map(it => parseInt(it)))
  }, 0)
}
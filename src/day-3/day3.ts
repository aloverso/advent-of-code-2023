
type Num = {
  num: number;
  index: number;
  length: number
}

export const parseNums = (line: string): Num[] => {
  const numbers = line
    .replace(/\D/g, '.')
    .split('.')
    .filter(it => it.length > 0)

  let lastIndex=0
  const nums: Num[] = []
  for (let i=0; i<numbers.length; i++) {
    const val = numbers[i]
    const index = line.indexOf(val, lastIndex)
    lastIndex = index+1
    nums.push({
      num: parseInt(val),
      index: index,
      length: val.length
    })
  }
  return nums
}

export const isSymbol = (val: string): boolean => {
  const replaced = val
    .replace(/\d/g, '')
    .replace(/[A-Za-z]/g, '')
    .replace(/\./g, '')

  return replaced.length > 0
}

export const hasAdjacentSymbol = (num: Num, lineAbove: string, line: string, lineBelow: string): boolean => {
  // test same row

  // before symbol
  if (num.index > 0 && isSymbol(line[num.index-1])) {
    return true
  }
  // after symbol
  if (line.length >= num.index+num.length+1 && isSymbol(line[num.index+num.length])) {
    return true
  }

  // get indices to test on lines above and below
  const indices=[]
  for (let i=-1; i<num.length+1; i++) {
    if (num.index + i < 0) {
      continue;
    }
    if (num.index + i >= line.length) {
      continue;
    }
    indices.push(num.index + i)
  }

  // test row above
  if (lineAbove && indices.some(index => isSymbol(lineAbove[index]))) {
    return true;
  }

  // test row below
  if (lineBelow && indices.some(index => isSymbol(lineBelow[index]))) {
    return true;
  }

  return false
}

export const sumNumbers = (input: string): number => {
  const lines = input.split('\n')
  let sum = 0
  for (let i=0; i<lines.length; i++) {
    const line = lines[i]
    const nums = parseNums(line)
    for (const num of nums) {
      const lineBefore = i==0 ? '' : lines[i-1]
      const lineAfter = i==lines.length-1 ? '' : lines[i+1]
      if (hasAdjacentSymbol(num, lineBefore, line, lineAfter)) {
        sum += num.num
      }
    }
  }

  return sum
}
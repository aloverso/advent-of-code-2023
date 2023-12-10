
type Num = {
  num: number;
  index: number;
  length: number
}

/*
line: one string with numbers separated by . and symbols
returns: list of objects for each number in the line, with its index and length
 */
export const parseNums = (line: string): Num[] => {
  const numbers = line
    .replace(/\D/g, '.')
    .split('.')
    .filter(it => it.length > 0)

  let lastIndex=0
  let lastLength=0
  const nums: Num[] = []
  for (let i=0; i<numbers.length; i++) {
    const val = numbers[i]
    const index = line.indexOf(val, lastIndex + lastLength)
    lastIndex = index+1
    lastLength = val.length
    nums.push({
      num: parseInt(val),
      index: index,
      length: val.length
    })
  }
  return nums
}

/*
val: input string single character
returns: false if val is alphanumeric or . and true otherwise
 */
export const isSymbol = (val: string): boolean => {
  const replaced = val
    .replace(/\d/g, '')
    .replace(/[A-Za-z]/g, '')
    .replace(/\./g, '')

  return replaced.length > 0
}

/*
num: a single Num object with a number, index, and length
lineAbove: string for line above num appears, or empty string
line: string where line appears
lineBelow: string for line below num appears, or empty string
returns: true if num has adjacent symbol next to, above, below, or diagonally
 */
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

/*
input: multiline string
returns: sum of all numbers with adjacent symbols
 */
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
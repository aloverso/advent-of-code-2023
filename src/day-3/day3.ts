
type Num = {
  num: number;
  index: number;
  length: number
}

type Gear = {
  index: number;
}

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

export const parseGears = (line: string): Gear[] => {
  let lastIndex=-2
  const gears: Gear[] = []

  while (lastIndex !== -1) {
    const index = line.indexOf('*', lastIndex+1)
    lastIndex = index
    if (index > -1) {
      gears.push({ index: index })
    }
  }
  return gears
}

export const isSymbol = (val: string): boolean => {
  const replaced = val
    .replace(/\d/g, '')
    .replace(/[A-Za-z]/g, '')
    .replace(/\./g, '')

  return replaced.length > 0
}

export const isNumber = (val: string): boolean => {
  const replaced = val
    .replace(/\D/g, '')

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

export const getNumber = (line: string, indexWhereNumber: number): Num => {
  const replaced = line
    .replace(/\D/g, '.')

  let foundWholeNumber = false;
  let number = replaced[indexWhereNumber]
  let forwardIndex = indexWhereNumber+1
  let backwardIndex = indexWhereNumber-1
  while (!foundWholeNumber) {
    let foundThisRound = false
    if (replaced[forwardIndex] && replaced[forwardIndex] !== '.') {
      number = `${number}${replaced[forwardIndex]}`
      forwardIndex+=1
      foundThisRound = true
    }
    if (replaced[backwardIndex] && replaced[backwardIndex] !== '.') {
      number = `${replaced[backwardIndex]}${number}`
      backwardIndex-=1
      foundThisRound = true
    }
    if (!foundThisRound) {
      foundWholeNumber = true
    }
  }

  return {
    num: parseInt(number),
    length: number.length,
    index: backwardIndex+1
  }
}

export const getAdjacentNumbers = (gear: Gear, lineAbove: string, line: string, lineBelow: string): number[] => {
  const adjacentNumbers: number[] = []

  // test same row

  // before gear
  if (gear.index > 0 && isNumber(line[gear.index-1])) {
    adjacentNumbers.push(getNumber(line, gear.index-1).num)
  }
  // after symbol
  if (line.length >= gear.index+1 && isNumber(line[gear.index+1])) {

    adjacentNumbers.push(getNumber(line, gear.index+1).num)
  }

  // get indices to test on lines above and below
  const indices=[]
  for (let i=-1; i<2; i++) {
    if (gear.index + i < 0) {
      continue;
    }
    if (gear.index + i >= line.length) {
      continue;
    }
    indices.push(gear.index + i)
  }


  // test row above
  if (lineAbove) {
    let lastNumberLength = 0
    let lastNumberIndex = 0
    for (const index of indices) {
      if (index < lastNumberIndex+lastNumberLength) continue;
      if (isNumber(lineAbove[index])) {
        const num = getNumber(lineAbove, index)
        adjacentNumbers.push(num.num)
        lastNumberIndex = num.index
        lastNumberLength = num.length
      }
    }
  }

  // test row below
  if (lineBelow) {
    let lastNumberLength = 0
    let lastNumberIndex = 0
    for (const index of indices) {
      if (index < lastNumberIndex+lastNumberLength) continue;
      if (isNumber(lineBelow[index])) {
        const num = getNumber(lineBelow, index)
        adjacentNumbers.push(num.num)
        lastNumberIndex = num.index
        lastNumberLength = num.length
      }
    }
  }

  return adjacentNumbers
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

export const sumGears = (input: string): number => {
  const lines = input.split('\n')
  let sum = 0
  for (let i=0; i<lines.length; i++) {
    const line = lines[i]
    const gears = parseGears(line)
    for (const gear of gears) {
      const lineBefore = i==0 ? '' : lines[i-1]
      const lineAfter = i==lines.length-1 ? '' : lines[i+1]
      const adjacentNumbers = getAdjacentNumbers(gear, lineBefore, line, lineAfter)
      if (adjacentNumbers.length === 2) {
        sum += adjacentNumbers[0] * adjacentNumbers[1]
      }
    }
  }

  return sum
}
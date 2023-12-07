import {hasAdjacentSymbol, isSymbol, parseNums, sumNumbers} from "./day3";
import path from "node:path";
const fs = require('fs')

describe('day 3', () => {
  it('gets list of number, index, and length from a row', () => {
    expect(parseNums('467..114..')).toEqual([
      { num: 467, index: 0, length: 3 },
      { num: 114, index: 5, length: 3 }
    ])
    expect(parseNums('...*......')).toEqual([])
    expect(parseNums('..35..633.')).toEqual([
      { num: 35, index: 2, length: 2 },
      { num: 633, index: 6, length: 3 }
    ])
    expect(parseNums('617*......')).toEqual([
      { num: 617, index: 0, length: 3 },
    ])
    expect(parseNums('617*.617..')).toEqual([
      { num: 617, index: 0, length: 3 },
      { num: 617, index: 5, length: 3 },
    ])
    expect(parseNums('8...90*12...')).toEqual([
      { num: 8, index: 0, length: 1 },
      { num: 90, index: 4, length: 2 },
      { num: 12, index: 7, length: 2 },
    ])
  })

  it('determines is symbol', () => {
    expect(isSymbol('*')).toEqual(true)
    expect(isSymbol('1')).toEqual(false)
    expect(isSymbol('/')).toEqual(true)
    expect(isSymbol('\\')).toEqual(true)
    expect(isSymbol('a')).toEqual(false)
    expect(isSymbol('.')).toEqual(false)
  })

  it('determines has adjacent symbol', () => {
    expect(hasAdjacentSymbol({ num: 617, index: 0, length: 3 }, '......#...', '617*......', '.....+.58.')).toEqual(true)
    expect(hasAdjacentSymbol({ num: 617, index: 5, length: 3 }, '......#...', '......617*', '.....+.58.')).toEqual(true)
    expect(hasAdjacentSymbol({ num: 617, index: 6, length: 3 }, '..........', '.......617', '.........*')).toEqual(true)
    expect(hasAdjacentSymbol({ num: 467, index: 0, length: 3 }, '', '467..114..', '...*......')).toEqual(true)
    expect(hasAdjacentSymbol({ num: 114, index: 5, length: 3 }, '', '467..114..', '...*......')).toEqual(false)
  })

  it('sums numbers adjacent to symbols', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(sumNumbers(input)).toEqual(4361)
  })

  it('sums numbers adjacent to symbols new data', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
    expect(sumNumbers(input)).toEqual(925)
  })

  it('gets answer', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(sumNumbers(input)) //517025 // 519229 
  })
})
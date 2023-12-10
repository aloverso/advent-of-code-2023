import {
  getAdjacentNumbers,
  getNumber,
  hasAdjacentSymbol,
  isNumber,
  isSymbol,
  parseGears,
  parseNums, sumGears,
  sumNumbers
} from "./day3";
import path from "node:path";
import {parseGame} from "../day-2/day2";
const fs = require('fs')

describe('day 3', () => {
  it('gets list of number, index, and length from a row', () => {
    expect(parseNums('123.23%')).toEqual([
      { num: 123, index: 0, length: 3 },
      { num: 23, index: 4, length: 2 }
    ])
    expect(parseNums('467..114..')).toEqual([
      { num: 467, index: 0, length: 3 },
      { num: 114, index: 5, length: 3 }
    ])
    expect(parseNums('...*......')).toEqual([])
    expect(parseNums('123.123%')).toEqual([
      { num: 123, index: 0, length: 3 },
      { num: 123, index: 4, length: 3 }
    ])
    expect(parseNums('..........')).toEqual([])
    expect(parseNums('***********')).toEqual([])
    expect(parseNums('1234')).toEqual([
      { num: 1234, index: 0, length: 4 },
    ])
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
    expect(parseNums('8...90/12...')).toEqual([
      { num: 8, index: 0, length: 1 },
      { num: 90, index: 4, length: 2 },
      { num: 12, index: 7, length: 2 },
    ])
    expect(parseNums('8...90\\12...')).toEqual([
      { num: 8, index: 0, length: 1 },
      { num: 90, index: 4, length: 2 },
      { num: 12, index: 7, length: 2 },
    ])
    expect(parseNums('8...90$12...')).toEqual([
      { num: 8, index: 0, length: 1 },
      { num: 90, index: 4, length: 2 },
      { num: 12, index: 7, length: 2 },
    ])
    expect(parseNums('8...90=12...')).toEqual([
      { num: 8, index: 0, length: 1 },
      { num: 90, index: 4, length: 2 },
      { num: 12, index: 7, length: 2 },
    ])
    expect(parseNums('50*50*50')).toEqual([
      { num: 50, index: 0, length: 2 },
      { num: 50, index: 3, length: 2 },
      { num: 50, index: 6, length: 2 },
    ])
  })

  it('determines is symbol', () => {
    expect(isSymbol('*')).toEqual(true)
    expect(isSymbol('1')).toEqual(false)
    expect(isSymbol('2')).toEqual(false)
    expect(isSymbol('0')).toEqual(false)
    expect(isSymbol('9')).toEqual(false)
    expect(isSymbol('/')).toEqual(true)
    expect(isSymbol('\\')).toEqual(true)
    expect(isSymbol('a')).toEqual(false)
    expect(isSymbol('@')).toEqual(true)
    expect(isSymbol('.')).toEqual(false)
    expect(isSymbol('=')).toEqual(true)
    expect(isSymbol('-')).toEqual(true)
    expect(isSymbol('+')).toEqual(true)
    expect(isSymbol('%')).toEqual(true)
  })

  it('determines has adjacent symbol', () => {
    expect(hasAdjacentSymbol({ num: 617, index: 0, length: 3 },
      '......#...',
      '617*......',
      '.....+.58.')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 0, length: 3 },
      '......#...',
      '617.*.....',
      '.....+.58.')).toEqual(false)
    expect(hasAdjacentSymbol({ num: 617, index: 5, length: 3 },
      '......#...',
      '......617*',
      '.....+.58.')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 7, length: 3 },
      '..........',
      '.......617',
      '.........*')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 7, length: 3 },
      '.........*',
      '.......617',
      '..........')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 7, length: 3 },
      '..........',
      '......*617',
      '..........')).toEqual(true)

    /////////// ----------------------

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '*......',
      '..617..',
      '.......')).toEqual(false)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.*.....',
      '..617..',
      '.......')).toEqual(true)
    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '..*....',
      '..617..',
      '.......')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '...*..',
      '..617..',
      '.......')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '....*..',
      '..617..',
      '.......')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.....*.',
      '..617..',
      '.......')).toEqual(true)
    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '......*',
      '..617..',
      '.......')).toEqual(false)
    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '*.617..',
      '.......')).toEqual(false)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '.*617..',
      '.......')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617*.',
      '.......')).toEqual(true)
    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617.*',
      '.......')).toEqual(false)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617..',
      '*......')).toEqual(false)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617..',
      '.*.....')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617..',
      '..*....')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617..',
      '...*...')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617..',
      '....*..')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617..',
      '.....*.')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.*.*...',
      '..617..',
      '.....*.')).toEqual(true)

    expect(hasAdjacentSymbol({ num: 617, index: 2, length: 3 },
      '.......',
      '..617..',
      '......*')).toEqual(false)

    expect(hasAdjacentSymbol({ num: 617, index: 6, length: 3 },
      '.........',
      '..617.617',
      '..*......')).toEqual(false)

    expect(hasAdjacentSymbol({ num: 617, index: 6, length: 3 },
      '', '..617.617', ''
    )).toEqual(false)

    expect(hasAdjacentSymbol({ num: 123, index: 0, length: 3 },
      '', '123.123%', ''
    )).toEqual(false)

    expect(hasAdjacentSymbol({ num: 123, index: 4, length: 3 },
      '', '123.123%', ''
    )).toEqual(true)

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

  it('sums numbers adjacent to symbols new data 3', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input-3.txt')).toString();
    expect(sumNumbers(input)).toEqual(6627)
  })

  it('gets answer', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(sumNumbers(input)) // 517025 wrong // 519229 wrong // 517021
  })

  describe('part 2', () => {
    it('parses gears', () => {
      expect(parseGears('*123=.*..*23*%')).toEqual([
        { index: 0 },
        { index: 6 },
        { index: 9 },
        { index: 12 }
      ])
    })

    it('determines is number', () => {
      expect(isNumber('*')).toEqual(false)
      expect(isNumber('1')).toEqual(true)
      expect(isNumber('2')).toEqual(true)
      expect(isNumber('0')).toEqual(true)
      expect(isNumber('9')).toEqual(true)
      expect(isNumber('/')).toEqual(false)
      expect(isNumber('\\')).toEqual(false)
      expect(isNumber('a')).toEqual(false)
      expect(isNumber('.')).toEqual(false)
    })

    it('gets number from a line where part of it exists at an index', () => {
      expect(getNumber('.1.56*..', 4)).toEqual({ num: 56, index: 3, length: 2 })
      expect(getNumber('&.&56*..', 3)).toEqual({ num: 56, index: 3, length: 2 })
    })

    it('gets adjacent numbers for a gear', () => {
      expect(getAdjacentNumbers({ index: 5 },
        '.......',
        '..617*..',
        '.....*.')).toEqual([617])
      expect(getAdjacentNumbers({ index: 5 },
        '.....56.',
        '..617*..',
        '.....*.')).toEqual([617, 56])
      expect(getAdjacentNumbers({ index: 5 },
        '56......',
        '..617*..',
        '.....67.')).toEqual([617, 67])
      expect(getAdjacentNumbers({ index: 5 },
        '56.......',
        '.....*617',
        '...4.....')).toEqual([617])
      expect(getAdjacentNumbers({ index: 5 },
        '56.......',
        '.....*617',
        '...44....')).toEqual([617, 44])
      expect(getAdjacentNumbers({ index: 5 },
        '11.56.56.',
        '.....*...',
        '.........')).toEqual([56,56])
      expect(getAdjacentNumbers({ index: 5 },
        '11.......',
        '.....*...',
        '...56.56.')).toEqual([56,56])
    })

    it('sums numbers where gears are adjacent to 2 numbers only', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
      expect(sumGears(input)).toEqual(467835)
    })

    it('gets answer', () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
      console.log(sumGears(input))
    })
  })
})
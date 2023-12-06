import {findNumber, findNumber2, sumNumbersFromInput, sumNumbersFromInput2} from "./day1";
import path from "node:path";
const fs = require('fs')

describe('day 1', () => {
  it('finds number from string line', () => {
    expect(findNumber('1abc2')).toEqual(12)
    expect(findNumber('pqr3stu8vwx')).toEqual(38)
    expect(findNumber('a1b2c3d4e5f')).toEqual(15)
    expect(findNumber('treb7uchet')).toEqual(77)
  })

  it('sums numbers from file', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(sumNumbersFromInput(input)).toEqual(142)
  })

  it('gets answer', () => {
    const real = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(sumNumbersFromInput(real))
  })

  describe('part 2', () => {
    it('finds number from string line including spelling', () => {
      expect(findNumber2('two1nine')).toEqual(29)
      expect(findNumber2('eightwothree')).toEqual(83)
      expect(findNumber2('abcone2threexyz')).toEqual(13)
      expect(findNumber2('xtwone3four')).toEqual(24)
      expect(findNumber2('4nineeightseven2')).toEqual(42)
      expect(findNumber2('zoneight234')).toEqual(14)
      expect(findNumber2('7pqrstsixteen')).toEqual(76)
      expect(findNumber2('eighthree')).toEqual(83)
      expect(findNumber2('sevenine')).toEqual(79)
      expect(findNumber2('one')).toEqual(11)
      expect(findNumber2('one4352345one')).toEqual(11)
    })

    it('sums numbers from file', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
      expect(sumNumbersFromInput2(input)).toEqual(281)
    })

    it('gets answer 2', () => {
      const real = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
      console.log(sumNumbersFromInput2(real))
    })
  })
})

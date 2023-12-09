import {countMatches, getPoints, getPoints2, parseLine} from "./day4";
import path from "node:path";
const fs = require('fs')

describe('day 4', () => {
  it('parses line into list of winning numbers and numbers you have', () => {
    expect(parseLine('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53')).toEqual({
      winners: [41,48,83,86,17],
      yours: [83,86,6,31,17,9,48,53]
    })
  })

  it('counts matches in winners', () => {
    const line = {
      winners: [41,48,83,86,17],
      yours: [83,86,6,31,17,9,48,53]
    }
    expect(countMatches(line)).toEqual(4)
  })

  it('gets points', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(getPoints(input)).toEqual(13)
  })

  it('gets answer', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(getPoints(input))
  })

  describe('part 2', () => {
    it('multiplies for each following card', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
      expect(getPoints2(input)).toEqual(30)
    })

    it('gets answer 2', () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
      console.log(getPoints2(input))
    })
  })
})
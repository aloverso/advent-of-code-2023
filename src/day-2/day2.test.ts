import {parseGame, parseGame2, sumIsPossible, sumPowerMaxColor} from "./day2";
import path from "node:path";
import {sumNumbersFromInput2} from "../day-1/day1";
const fs = require('fs')

describe('day 2', () => {
  it('parses game', () => {
    expect(parseGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual({
      id: 1,
      possible: true,
      rounds: [
        { blue: 3, red: 4, green: 0 },
        { blue: 6, red: 1, green: 2 },
        { blue: 0, red: 0, green: 2 },
      ]
    })
  })

  it('determines sum of is possible', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(sumIsPossible(input)).toEqual(8)
  })

  it('gets answer', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(sumIsPossible(input))
  })

  it('parses game 2', () => {
    expect(parseGame2('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual({
      id: 1,
      maxBlue: 6,
      maxRed: 4,
      maxGreen: 2
    })
  })

  it('sums powers of max of each color', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(sumPowerMaxColor(input)).toEqual(2286)
  })

  it('gets answer 2', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(sumPowerMaxColor(input))
  })


})
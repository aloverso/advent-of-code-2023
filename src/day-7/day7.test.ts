import {classify, classify2, compareHands, getWinnings} from "./day7";
import path from "node:path";
const fs = require('fs')

describe('day 7', () => {
  it('classifies', () => {
    expect(classify('32T3K')).toEqual(1)
    expect(classify('T55J5')).toEqual(3)
    expect(classify('KK677')).toEqual(2)
    expect(classify('66666')).toEqual(6)
    expect(classify('6666Q')).toEqual(5)
    expect(classify('Q666Q')).toEqual(4)
    expect(classify('12345')).toEqual(0)
  })

  it('compares hands and returns -1 if a is stronger, 1 if b is stronger', () => {
    expect(compareHands('32T3K', 'T55J5', 1)).toEqual(1)
    expect(compareHands('T55J5', '32T3K', 1)).toEqual(-1)
    expect(compareHands('KK677', 'KTJJT', 1)).toEqual(-1)
    expect(compareHands('T55J5', 'QQQJA', 1)).toEqual(1)
  })

  it('gets winnings', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(getWinnings(input, 1)).toEqual(6440)
  })

  it('gets answer', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(getWinnings(input, 1)) // 251216224
  })

  describe('part 2', () => {
    it('classifies', () => {
      expect(classify2('QQQQJ')).toEqual(6)
      expect(classify2('QJJQ2')).toEqual(5)
      expect(classify2('T55J5')).toEqual(5)
      expect(classify2('KK677')).toEqual(2)
      expect(classify2('66666')).toEqual(6)
      expect(classify2('6666Q')).toEqual(5)
      expect(classify2('Q666Q')).toEqual(4)
      expect(classify2('Q666J')).toEqual(5)
      expect(classify2('Q66JQ')).toEqual(4)
      expect(classify2('12345')).toEqual(0)
      expect(classify2('1234J')).toEqual(1)
      expect(classify2('KK67J')).toEqual(3)
      expect(classify2('2233J')).toEqual(4)
      expect(classify2('JJJJJ')).toEqual(6)
      expect(classify2('Q2KJJ')).toEqual(3) // ensure not double-counting jokers
    })

    it('gets winnings 2', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
      expect(getWinnings(input, 2)).toEqual(5905)
    })

    it('gets winnings additional input', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
      expect(getWinnings(input, 2)).toEqual(6839)
    })

    it('gets answer 2', () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
      console.log(getWinnings(input, 2)) // 250897359 // 250825971
    })
  })
})
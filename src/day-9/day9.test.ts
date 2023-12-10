import { next, sumNexts, sumPrevs} from "./day9";
import path from "node:path";
const fs = require('fs')

describe('day 9', () => {
  it('recurses a sequence to find the next value', () => {
    expect(next([0,3,6,9,12])).toEqual(15)
    expect(next([1,3,6,10,15,21])).toEqual(28)
    expect(next([10,13,16,21,30,45])).toEqual(68)
  })

  it('gets sum of nexts', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(sumNexts(input)).toEqual(114)
  })

  it('gets answer', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(sumNexts(input)) //1834108701
  })

  describe('part 2', () => {
    it('gets sum of prevs', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
      expect(sumPrevs(input)).toEqual(2)
    })

    it('gets answer', () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
      console.log(sumPrevs(input)) //993
    })
  })
})
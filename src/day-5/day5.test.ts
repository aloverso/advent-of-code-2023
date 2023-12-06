import {extractSeeds, extractSeedsPart2, getPairsPart2, makeGetLocation, makeMapFn} from "./day5-try2";
import path from "node:path";
const fs = require('fs')

describe('day 5', () => {
  describe('makeMapFn', () => {
    it('takes array of strings with space separators and creates a function', () => {
      const input = [
        "50 98 2",
        "52 50 48"
      ]

      const mapFn = makeMapFn(input)
      expect(mapFn(0)).toEqual(0)
      expect(mapFn(1)).toEqual(1)
      expect(mapFn(48)).toEqual(48)
      expect(mapFn(49)).toEqual(49)
      expect(mapFn(50)).toEqual(52)
      expect(mapFn(51)).toEqual(53)
      expect(mapFn(96)).toEqual(98)
      expect(mapFn(97)).toEqual(99)
      expect(mapFn(98)).toEqual(50)
      expect(mapFn(99)).toEqual(51)
    })
  });

  describe('makeGetLocation', () => {
    it('takes input and makes a getLocation function', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
      const getLocation = makeGetLocation(input)
      expect(getLocation(79)).toEqual(82)
      expect(getLocation(14)).toEqual(43)
      expect(getLocation(55)).toEqual(86)
      expect(getLocation(13)).toEqual(35)
    })
  })

  describe('extractSeeds', () => {
    it('takes input and gets seed array', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
      const seeds = extractSeeds(input)
      expect(seeds).toEqual([79,14,55,13])
    })
  })

  describe('real data', () => {
    it('prints the lowest location', () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
      const seeds = extractSeeds(input)
      const getLocation = makeGetLocation(input)
      const locations = seeds.map(seed => getLocation(seed))
      console.log(Math.min(...locations)) // 457535844
    })
  })

  describe('part 2', () => {
    describe('extractSeeds', () => {
      it('takes input and gets seed array', () => {
        const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
        const seeds = extractSeedsPart2(input)
        expect(seeds).toEqual([79,80,81,82,83,84,85,86,87,88,89,90,91,92,55,56,57,58,59,60,61,62,63,64,65,66,67])
      })
    })

    it('prints the lowest location', () => {
      const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
      const pairs = getPairsPart2(input)
      const getLocation = makeGetLocation(input)
      let lowest = 9007199254740991 // max safe int
      for (const pair of pairs) {
        const [start, length] = pair
        for (let i=start; i<start+length; i++) {
          const location = getLocation(input)
          if (location < lowest) {
            lowest = location;
          }
        }
      }
      console.log(lowest)
    })
  })
})
import {countAllPath, countPath, findStarting, parseInput, parseLine} from "./day8";
import path from "node:path";

const fs = require('fs')

describe('day 8', () => {
  it('parses line into an object with L/R keys', () => {
    expect(parseLine('AAA = (BBB, CCC)')).toEqual({'AAA': {L: 'BBB', R: 'CCC'}})
    expect(parseLine('BBB = (DDD, EEE)')).toEqual({'BBB': {L: 'DDD', R: 'EEE'}})
    expect(parseLine('JKT = (KFV, CFQ)')).toEqual({'JKT': {L: 'KFV', R: 'CFQ'}})
  })

  it('parses entire input into object', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(parseInput(input)).toEqual({
      steps: 'LLR',
      node: {
        AAA: {L: 'BBB', R: 'BBB'},
        BBB: {L: 'AAA', R: 'ZZZ'},
        ZZZ: {L: 'ZZZ', R: 'ZZZ'}
      }
    })
  })

  it('counts path list of steps', () => {
    const node = {
      AAA: {L: 'BBB', R: 'BBB'},
      BBB: {L: 'AAA', R: 'ZZZ'},
      ZZZ: {L: 'ZZZ', R: 'ZZZ'}
    }
    expect(countPath(node, 'LLR', 'AAA')).toEqual(6)
  })

  it('gets answer', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    const { node, steps} = parseInput(input)
    console.log(countPath(node, steps, 'AAA')) // 20221
  })

  describe('part 2', () => {
    it('finds all starting nodes', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
      const { node } = parseInput(input)
      expect(findStarting(node)).toEqual(['11A', '22A'])
    })
  })

  it('counts path list of steps 2', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
    const { node, steps } = parseInput(input)
    expect(countAllPath(node, steps)).toEqual(6)
  })

  it('counts path using lcm', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
    const { node, steps } = parseInput(input)
    const starting = findStarting(node)
    const eachCount = starting.map(it => countPath(node, steps, it))
    expect(eachCount.reduce(lcm)).toEqual(6)
  })

  it('gets answer 2 slowly', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    const { node, steps } = parseInput(input)
    console.log(countAllPath(node, steps)) //
  })

  it('gets answer 2 using least common multiple', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    const { node, steps } = parseInput(input)
    const starting = findStarting(node)
    console.log(starting)
    const eachCount = starting.map(it => countPath(node, steps, it))
    console.log(eachCount)
    console.log(eachCount.reduce(lcm)) // 14616363770447
  })
})

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

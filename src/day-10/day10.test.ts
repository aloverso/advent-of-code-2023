import path from "node:path";
import {
  countInsidePoints,
  countLoopDistance, countOutsidePointsFromBottom,
  countOutsidePointsFromLeft, countOutsidePointsFromRight, countOutsidePointsFromTop,
  fillInStart,
  getLoopPoints,
  getNext, isEntryPoint,
  makeGrid
} from "./day10";
const fs = require('fs')

describe('day 10', () => {

  const testGrid = [
    ['.','.','.','.','.'],
    ['.','S','-','7','.'],
    ['.','|','.','|','.'],
    ['.','L','-','J','.'],
    ['.','.','.','.','.'],
  ]

  it('makes a 2D grid', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(makeGrid(input)).toEqual(testGrid)
  })

  it('determines starting symbol', () => {
    expect(fillInStart(testGrid)).toEqual({
      grid: [
        ['.','.','.','.','.'],
        ['.','F','-','7','.'],
        ['.','|','.','|','.'],
        ['.','L','-','J','.'],
        ['.','.','.','.','.'],
      ],
      start: { row: 1, col: 1}
    })

    const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
    const grid = makeGrid(input)
    const started = fillInStart(grid)
    expect(started.grid[2][0]).toEqual('F')
    expect(started.start).toEqual({row: 2, col: 0})
  })

  it('gets next point', () => {
    // clockwise
    expect(getNext({row: 1, col: 2}, testGrid, {row: 1, col: 1})).toEqual({ row: 1, col: 3})
    expect(getNext({row: 1, col: 3}, testGrid, {row: 1, col: 2})).toEqual({ row: 2, col: 3})
    expect(getNext({row: 2, col: 3}, testGrid, {row: 1, col: 3})).toEqual({ row: 3, col: 3})
    expect(getNext({row: 3, col: 3}, testGrid, {row: 2, col: 3})).toEqual({ row: 3, col: 2})
    expect(getNext({row: 3, col: 2}, testGrid, {row: 3, col: 3})).toEqual({ row: 3, col: 1})
    expect(getNext({row: 3, col: 1}, testGrid, {row: 3, col: 2})).toEqual({ row: 2, col: 1})
    expect(getNext({row: 2, col: 1}, testGrid, {row: 3, col: 1})).toEqual({ row: 1, col: 1})

    // counterclockwise
    expect(getNext({row: 2, col: 1}, testGrid, {row: 1, col: 1})).toEqual({ row: 3, col: 1})
    expect(getNext({row: 3, col: 1}, testGrid, {row: 2, col: 1})).toEqual({ row: 3, col: 2})
    expect(getNext({row: 3, col: 2}, testGrid, {row: 3, col: 1})).toEqual({ row: 3, col: 3})
    expect(getNext({row: 3, col: 3}, testGrid, {row: 3, col: 2})).toEqual({ row: 2, col: 3})
    expect(getNext({row: 2, col: 3}, testGrid, {row: 3, col: 3})).toEqual({ row: 1, col: 3})
    expect(getNext({row: 1, col: 3}, testGrid, {row: 2, col: 3})).toEqual({ row: 1, col: 2})
    expect(getNext({row: 1, col: 2}, testGrid, {row: 1, col: 3})).toEqual({ row: 1, col: 1})
  })

  it('counts loop distance test 1', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
    const grid = makeGrid(input)
    const started = fillInStart(grid)
    expect(started.grid[2][0]).toEqual('F')
    expect(started.start).toEqual({row: 2, col: 0})
  })

  it('counts loop distance test 1', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
    expect(countLoopDistance(makeGrid(input))).toEqual(8)
  })

  it('counts loop distance test 2', () => {
    const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
    expect(countLoopDistance(makeGrid(input))).toEqual(16)
  })

  it('gets answer', () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
    console.log(countLoopDistance(makeGrid(input))/2) // 6907
  })

  describe('part 2', () => {
    it('tracks list of all points visited', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
      expect(getLoopPoints(makeGrid(input)).loop.length).toEqual(8)
      expect(getLoopPoints(makeGrid(input)).loop).toEqual(expect.arrayContaining([
        {row: 1, col: 1},
        {row: 1, col: 2},
        {row: 1, col: 3},
        {row: 2, col: 3},
        {row: 3, col: 3},
        {row: 3, col: 2},
        {row: 3, col: 1},
        {row: 2, col: 1},
      ]))
    })

    it('determines is entry point', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input-4.txt')).toString();
      const initialGrid = makeGrid(input)
      const { grid } = getLoopPoints(initialGrid)
      expect(isEntryPoint({row: 8, col: 4 }, grid, 'vert')).toEqual(false)
      expect(isEntryPoint({row: 8, col: 5 }, grid, 'vert')).toEqual(false)
      expect(isEntryPoint({row: 8, col: 4 }, grid, 'horiz')).toEqual(false)
      expect(isEntryPoint({row: 8, col: 5 }, grid, 'horiz')).toEqual(false)

      expect(isEntryPoint({row: 7, col: 4 }, grid, 'vert')).toEqual(true)
      expect(isEntryPoint({row: 7, col: 5 }, grid, 'vert')).toEqual(true)
      expect(isEntryPoint({row: 7, col: 4 }, grid, 'horiz')).toEqual(false)
      expect(isEntryPoint({row: 7, col: 5 }, grid, 'horiz')).toEqual(false)

      expect(isEntryPoint({row: 6, col: 4 }, grid, 'vert')).toEqual(true)
      expect(isEntryPoint({row: 6, col: 5 }, grid, 'vert')).toEqual(true)
      expect(isEntryPoint({row: 6, col: 4 }, grid, 'horiz')).toEqual(false)
      expect(isEntryPoint({row: 6, col: 5 }, grid, 'horiz')).toEqual(false)

      expect(isEntryPoint({row: 5, col: 4 }, grid, 'vert')).toEqual(true)
      expect(isEntryPoint({row: 5, col: 5 }, grid, 'vert')).toEqual(true)
      expect(isEntryPoint({row: 5, col: 4 }, grid, 'horiz')).toEqual(false)
      expect(isEntryPoint({row: 5, col: 5 }, grid, 'horiz')).toEqual(false)

      expect(isEntryPoint({row: 4, col: 4 }, grid, 'vert')).toEqual(false)
      expect(isEntryPoint({row: 4, col: 5 }, grid, 'vert')).toEqual(false)
      expect(isEntryPoint({row: 4, col: 4 }, grid, 'horiz')).toEqual(false)
      expect(isEntryPoint({row: 4, col: 5 }, grid, 'horiz')).toEqual(false)
    })

    it('counts outside points', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input.txt')).toString();
      const initialGrid = makeGrid(input)
      const { grid, loop } = getLoopPoints(initialGrid)
      expect(countOutsidePointsFromLeft(grid, loop).length).toEqual(16)
      expect(countOutsidePointsFromRight(grid, loop).length).toEqual(16)
      expect(countInsidePoints(input)).toEqual(1)
    })

    it('counts outside points 2', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input-2.txt')).toString();
      const initialGrid = makeGrid(input)
      const { grid, loop } = getLoopPoints(initialGrid)
      expect(countOutsidePointsFromLeft(grid, loop).length).toEqual(3)
      expect(countOutsidePointsFromRight(grid, loop).length).toEqual(5)
      expect(countOutsidePointsFromTop(grid, loop).length).toEqual(5)
      expect(countOutsidePointsFromBottom(grid, loop).length).toEqual(3)
      expect(countInsidePoints(input)).toEqual(1)
    })

    it('counts outside points 3', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input-3.txt')).toString();
      expect(countInsidePoints(input)).toEqual(4)
    })

    it('counts outside points 4', () => {
      const input = fs.readFileSync(path.join(__dirname, 'test-input-4.txt')).toString();
      expect(countInsidePoints(input)).toEqual(4)
    })
  });
})
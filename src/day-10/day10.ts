export const makeGrid = (input: string): Grid => {
  return input.split('\n').map(it => it.split(''))
}

export const countLoopDistance = (initialGrid: Grid): number => {
  const { grid, start } = fillInStart(initialGrid)
  let count = 1
  let current: Point = getNext(start, grid, start)
  let prev: Point = start
  while (!eq(current, start)) {
    const tempPrev = prev
    prev = current
    current = getNext(current, grid, tempPrev)
    count+=1
  }
  return count
}

export const getLoopPoints = (initialGrid: Grid): { grid: Grid, loop: Point[] } => {
  const { grid, start } = fillInStart(initialGrid)
  let current: Point = getNext(start, grid, start)
  const points = [current]
  let prev: Point = start
  while (!eq(current, start)) {
    const tempPrev = prev
    prev = current
    current = getNext(current, grid, tempPrev)
    points.push(current)
  }
  return { grid, loop: points }
}
//
// export const countInsidePoints = (initialGrid: Grid): number => {
//   const loop: Point[] = getLoopPoints(initialGrid)
//   let trueCount = 0
//   let maybeCount = 0
//   let onBoundary = false
//   let isInside = false
//   let maybeInside = false
//
//   for (let row=0; row<initialGrid.length; row++) {
//     for (let col = 0; col < initialGrid[0].length; col++) {
//       const currentPoint = { row, col }
//       console.log(row, col)
//       console.log(contains(loop, currentPoint))
//       if (contains(loop, currentPoint)) {
//         onBoundary = true
//         if (maybeInside) maybeInside = false
//       } else {
//         console.log(onBoundary, maybeInside)
//         if (onBoundary) maybeInside = true
//         onBoundary = false
//       }
//
//       if (!onBoundary && maybeInside) {
//         console.log('maybe inside')
//         maybeInside = true
//         maybeCount += 1
//       }
//
//       if (col === initialGrid.length - 1) {
//         if (!maybeInside) {
//           console.log('incrementing')
//           trueCount += maybeCount
//         }
//         maybeCount = 0
//         maybeInside = false
//         onBoundary = false
//         console.log('reset row---------', maybeInside, onBoundary)
//       }
//     }
//   }
//
//   return trueCount;
// }


export const countOutsidePointsFromLeft = (grid: Grid, loop: Point[]): Point[] => {
  let outsidePoints: Point[] = []

  for (let row=0; row<grid.length; row++) {
      const p = { row, col: 0  }
      if (contains(loop, p)) {
        continue;
      } else {
        if (!contains(outsidePoints, p)) {
          outsidePoints.push(p)
        }
        outsidePoints = checkUpDownAndSides(p, outsidePoints, loop, grid)
      }
  }

  return outsidePoints;
}

export const countOutsidePointsFromRight = (grid: Grid, loop: Point[]): Point[] => {
  let outsidePoints: Point[] = []

  for (let row=0; row<grid.length; row++) {
    const p = { row, col: grid[0].length - 1  }
    if (contains(loop, p)) {
      continue;
    } else {
      if (!contains(outsidePoints, p)) {
        outsidePoints.push(p)
      }
      outsidePoints = checkUpDownAndSides(p, outsidePoints, loop, grid)
    }
  }
  return outsidePoints;
}

export const countOutsidePointsFromTop = (grid: Grid, loop: Point[]): Point[] => {
  let outsidePoints: Point[] = []

  for (let col = 0; col < grid[0].length; col++) {
    const p = { row: 0, col }
    if (contains(loop, p)) {
      continue;
    } else {
      if (!contains(outsidePoints, p)) {
        outsidePoints.push(p)
      }
      outsidePoints = checkUpDownAndSides(p, outsidePoints, loop, grid)
    }
  }
  return outsidePoints;
}

export const countOutsidePointsFromBottom = (grid: Grid, loop: Point[]): Point[] => {
  let outsidePoints: Point[] = []

  for (let col = 0; col < grid[0].length; col++) {
    const p = { row: grid.length-1, col }
    if (contains(loop, p)) {
      continue;
    } else {
      if (!contains(outsidePoints, p)) {
        outsidePoints.push(p)
      }
      outsidePoints = checkUpDownAndSides(p, outsidePoints, loop, grid)
    }
  }

  return outsidePoints;
}

export const isEntryPoint = (p: Point, grid: Grid, direction: 'horiz' | 'vert'): boolean => {
  if (direction === 'vert') {
    const symbol = grid[p.row][p.col]
    const vertPipes = ['||', '|F', '|L', '7|', 'J|', 'JF', '7F', 'JL', '7L']
    const horizPipes = ['--', '-7', '-F', 'J-', 'L-', '', '7F', 'JL', '7L']
    if (symbol = 'L' || symbol === 'J' || symbol === 'F' || symbol == '7' || symbol === '|' )
  }
  return false
}

const checkUpDownAndSides = (p: Point, outsidePoints: Point[], loop: Point[], grid: Grid): Point[] => {
  const upP = {row: p.row - 1, col: p.col}
  const downP = {row: p.row + 1, col: p.col}
  const leftP = {row: p.row, col: p.col - 1}
  const rightP = {row: p.row, col: p.col + 1}
  console.log('--- iter ---', p)
  let upPStop = false
  let leftPStop = false
  let rightPStop = false
  let downPStop = false
  if (exists(upP, grid) && !contains(loop, upP) && !contains(outsidePoints, upP)) {
    outsidePoints.push(upP)
  } else {
    upPStop = true
  }
  if (exists(leftP, grid) && !contains(loop, leftP) && !contains(outsidePoints, leftP)) {
    outsidePoints.push(leftP)
  } else {
    leftPStop = true
  }

  if (exists(rightP, grid) && !contains(loop, rightP) && !contains(outsidePoints, rightP)) {
    outsidePoints.push(rightP)
  } else {
    rightPStop = true
  }

  if (exists(downP, grid) && !contains(loop, downP) && !contains(outsidePoints, downP)) {
    outsidePoints.push(downP)
  } else {
    downPStop = true
  }

  if (upPStop && leftPStop && rightPStop && downPStop) {
    console.log('end of recurse', outsidePoints)
    return outsidePoints
  } else {
    let newRight = []
    let newLeft = []
    let newUp = []
    let newDown = []
    let running = outsidePoints
    if (!rightPStop) {
      newRight = checkUpDownAndSides(rightP, running, loop, grid)
      running = newRight
    }
    if (!leftPStop) {
      newLeft = checkUpDownAndSides(leftP, running, loop, grid)
      running = newLeft
    }
    if (!upPStop) {
      newUp = checkUpDownAndSides(upP, running, loop, grid)
      running = newUp
    }
    if (!downPStop) {
      newDown = checkUpDownAndSides(downP, running, loop, grid)
      running = newDown
    }
    return running
  }
}

export const countInsidePoints = (input: string): number => {
  const initialGrid = makeGrid(input)
  const { grid, loop } = getLoopPoints(initialGrid)

  const right = countOutsidePointsFromRight(grid, loop)
  console.log('right')
  const left = countOutsidePointsFromLeft(grid, loop)
  console.log('left')
  const top = countOutsidePointsFromTop(grid, loop)
  console.log('top')
  const bottom = countOutsidePointsFromBottom(grid, loop)
  console.log('bottom')

  const all = [...right, ...left, ...top, ...bottom]

  console.log(all)
  const deduped = []
  for (const p of all) {
    if (!contains(deduped, p)) {
      deduped.push(p)
    }
  }

  const outsidePointsCount = deduped.length
  const totalPoints = grid.length * grid[0].length
  return totalPoints - outsidePointsCount - loop.length
}

type Grid = string[][]

type Point = {
  row: number;
  col: number;
}

const exists = (p: Point, grid: Grid): boolean => {
  return p.row >=0 && p.col >= 0 && p.row < grid.length && p.col < grid[0].length
}

const eq = (p1: Point, p2: Point): boolean => {
  return (p1.row === p2.row && p1.col === p2.col)
}

const contains = (loop: Point[], p: Point): boolean => {
  return loop.find(it => eq(p, it)) !== undefined
}

export const fillInStart = (grid: Grid): {grid: Grid, start: Point} => {
  for (let row=0; row<grid.length; row++) {
    for (let col=0; col<grid[0].length; col++) {
      if (grid[row][col] === 'S') {
        const topIn = grid[row-1][col] === '|' || grid[row-1][col] === 'F' || grid[row-1][col] === '7'
        const rightIn = grid[row][col+1] === '-' || grid[row][col+1] === 'J' || grid[row][col+1] === '7'
        const bottomIn = grid[row+1][col] === '|' || grid[row+1][col] === 'J' || grid[row+1][col] === 'L'
        const leftIn = grid[row][col-1] === '-' || grid[row][col-1] === 'F' || grid[row][col-1] === 'L'
        let newSymbol = ''
        if (topIn && leftIn) newSymbol = 'J'
        if (topIn && rightIn) newSymbol = 'L'
        if (topIn && bottomIn) newSymbol = '|'
        if (rightIn && bottomIn) newSymbol = 'F'
        if (rightIn && leftIn) newSymbol = '-'
        if (bottomIn && leftIn) newSymbol = '7'
        grid[row][col] = newSymbol
        return { grid, start: { row: row, col: col }}
      }
    }
  }
}

export const getNext = (point: Point, grid: Grid, prev: Point): Point => {
  const symbol = grid[point.row][point.col]
  switch (symbol) {
    case 'F':
      const fopt1 = {row: point.row, col: point.col+1 }
      const fopt2 = {row: point.row+1, col: point.col }
      return eq(fopt1, prev) ? fopt2 : fopt1
    case 'L':
      const lopt1 = {row: point.row, col: point.col+1 }
      const lopt2 = {row: point.row-1, col: point.col }
      return eq(lopt1, prev) ? lopt2 : lopt1
    case 'J':
      const jopt1 = {row: point.row, col: point.col-1 }
      const jopt2 = {row: point.row-1, col: point.col }
      return eq(jopt1, prev) ? jopt2 : jopt1
    case '7':
      const sopt1 = {row: point.row, col: point.col-1 }
      const sopt2 = {row: point.row+1, col: point.col }
      return eq(sopt1, prev) ? sopt2 : sopt1
    case '-':
      const dopt1 = {row: point.row, col: point.col+1 }
      const dopt2 = {row: point.row, col: point.col-1 }
      return eq(dopt1, prev) ? dopt2 : dopt1
    case '|':
      const popt1 = {row: point.row+1, col: point.col }
      const popt2 = {row: point.row-1, col: point.col }
      return eq(popt1, prev) ? popt2 : popt1
  }
}
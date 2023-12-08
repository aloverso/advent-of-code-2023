type Node = Record<string, { L: string, R: string }>

export const parseLine = (line: string): Node => {
  const result = {}
  const [label, nodes] = line.split(' = ')
  const [L, R] = nodes
    .replace(')', '')
    .replace('(', '')
    .split(', ')
  result[label] = {L, R}
  return result
}

export const parseInput = (input: string): { node: Node, steps: string } => {
  const lines = input.split('\n')
  const steps = lines.shift()

  lines.shift()

  return {
    node: lines.reduce((acc, cur) => {
      return {
        ...acc,
        ...parseLine(cur)
      }
    }, {}),
    steps
  }
}

export const findStarting = (node: Node): string[] => {
  return Object.keys(node).filter(it => it.endsWith('A'))
}

export const areAllZ = (current: string[]) => {
  return current.every(it => it.endsWith('Z'))
}

export const countAllPath = (node: Node, steps: string): number => {
  let current: string[] = findStarting(node)
  let count = 0;
  let i = 0;
  let done = false;
  console.log(Date.now())


  while (!done) {
    if (count % 100000000 === 0) {
      console.log(Date.now())
    }
    count += 1;
    const step = steps[i]
    current = current.map(it => node[it][step]);

    if (areAllZ(current)) {
      done = true;
    } else {
      if (i + 1 >= steps.length) {
        i = 0
      } else {
        i += 1
      }
    }
  }
  return count;
}

export const countPath = (node: Node, steps: string, starting: string): number => {
  let count = 0;
  let i = 0;
  let done = false;
  let current = starting
  while (!done) {
    count += 1;
    const step = steps[i]
    const next = node[current][step]
    current = next;

    // if (next === 'ZZZ') {
    if (next.endsWith('Z')) {
      done = true;
    } else {
      if (i + 1 >= steps.length) {
        i = 0
      } else {
        i += 1
      }
    }
  }
  return count;
}

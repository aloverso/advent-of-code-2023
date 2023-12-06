export const findNumber = (line: string): number => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const digitsInLine = line.split('').filter(it => digits.includes(it))
  const numberAsString = digitsInLine[0] + digitsInLine[digitsInLine.length - 1]
  return parseInt(numberAsString)
}
export const sumNumbersFromInput = (input: string): number => {
  const lines = input.split('\n')
  return lines.reduce((acc, cur) => {
    return acc + findNumber(cur)
  }, 0)
}

type Match = {
  index: number;
  value: string;
}

export const findNumber2 = (line: string): number => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const wordDigits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

  const matches: Match[] = [...digits, ...wordDigits].reduce((acc, cur) => {
    const index = line.indexOf(cur)
    const lastIndex = line.lastIndexOf(cur)
    let newAcc = [...acc]
    if (index > -1) {
      newAcc = [...newAcc, { value: cur, index}]
    }
    if (lastIndex > -1 && lastIndex !== index) {
      newAcc = [...newAcc, { value: cur, index: lastIndex}]
    }

    return newAcc
  }, [])

  const sorted = matches.sort((a,b) => a.index < b.index ? -1 : 1)
  const numberAsString = getNumeral(sorted[0].value) + getNumeral(sorted[sorted.length - 1].value)
  return parseInt(numberAsString)
}

export const sumNumbersFromInput2 = (input: string): number => {
  const lines = input.split('\n')
  return lines.reduce((acc, cur) => {
    return acc + findNumber2(cur)
  }, 0)
}


const getNumeral = (input: string): string => {
  switch (input) {
    case "0":
    case "zero":
      return "0"
    case "1":
    case "one":
      return "1"
    case "2":
    case "two":
      return "2"
    case "3":
    case "three":
      return "3"
    case "4":
    case "four":
      return "4"
    case "5":
    case "five":
      return "5"
    case "6":
    case "six":
      return "6"
    case "7":
    case "seven":
      return "7"
    case "8":
    case "eight":
      return "8"
    case "9":
    case "nine":
      return "9"
    default:
      throw 'ahhhh'
  }
}
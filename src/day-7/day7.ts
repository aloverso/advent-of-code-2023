export const compareHands = (a: string, b: string, part: 1 | 2): number => {
  const aRank = part === 1 ? classify(a) : classify2(a)
  const bRank = part === 1 ? classify(b) : classify2(b)
  if (aRank > bRank) return -1
  if (bRank > aRank) return 1

  for (let i=0; i<a.length; i++) {
    const aCard = a[i]
    const bCard = b[i]
    const compare = compareCards(aCard, bCard, part)
    if (compare === 0) {
      continue;
    } else {
      return compare
    }
  }
}

const compareCards = (a: string, b: string, part: 1 | 2): number => {
  const aRank = parseInt(convertToNumeric(a, part))
  const bRank = parseInt(convertToNumeric(b, part))
  if (aRank === bRank) return 0
  return aRank > bRank ? -1 : 1
}

const convertToNumeric = (card: string, part: 1 | 2): string => {
  if (card === 'A') return '14'
  if (card === 'K') return '13'
  if (card === 'Q') return '12'
  if (card === 'J') return part === 1 ? '11' : '1'
  if (card === 'T') return '10'
  return card
}

export const getWinnings = (input: string, part: 1 | 2): number => {
  const lines = input.split('\n')
  const hands = lines.map(line => line.split(' ')[0])
  const original = [...hands]
  const bids = lines.map(line => line.split(' ')[1])
  const handsSorted = hands.sort((a,b) => compareHands(a,b,part))
  let sum = 0
  let rank = hands.length

  console.log(handsSorted)

  for (const hand of handsSorted) {
    const originalIndex = original.indexOf(hand)
    const bid = bids[originalIndex]
    sum += parseInt(bid)*rank
    rank-=1
  }
  return sum;
}

/* ranks

6 - five
5 - four
4 - fh
3 - three
2 - two pair
1 - one
0 - high

 */

export const classify = (hand: string): number => {

  let cards = {}
  for(let x of hand.split('')){
    cards[x] = (cards[x] || 0) + 1;
  }

  const vals = Object.values(cards).sort().reverse();
  if (vals.length === 1 ) return 6
  if (vals.length === 2) {
    if (vals[0] === 4 && vals[1] === 1) return 5
    if (vals[0] === 3 && vals[1] === 2) return 4
  }
  if (vals.length === 3) {
    if (vals[0] === 3) return 3
    if (vals[0] === 2 && vals[1] === 2) return 2
  }
  if (vals.length === 4) {
    return 1
  }

  return 0

}

export const classify2 = (hand: string): number => {

  let cards = {}
  for(let x of hand.split('')){
    cards[x] = (cards[x] || 0) + 1;
  }

  const numberOfJokers = cards['J'] ?? 0
  delete cards['J']

  const vals = Object.values(cards).sort().reverse().map((it: string) => parseInt(it));
  if (vals.length === 1 ) return 6

  if (numberOfJokers === 5) return 6
  if (numberOfJokers >= (5 - vals[0])) return 6

  if (vals[0] === 4 && vals[1] === 1) return 5
  if (numberOfJokers >= (4 - vals[0])) return 5

  if (vals[0] === 3 && vals[1] === 2) return 4
  const jokersForFH1 = 3 - vals[0]
  const jokersForFH2 = numberOfJokers - jokersForFH1
  if (vals[0] + jokersForFH1 === 3 && vals[1] + jokersForFH2 === 2) return 4

  if (vals[0] === 3) return 3
  if (numberOfJokers >= (3 - vals[0])) return 3

  if (vals[0] === 2 && vals[1] === 2) return 2

  if (vals.length === 4) return 1
  if (vals.length === 5 && numberOfJokers === 1) return 1

  if (vals.length === 5 && numberOfJokers === 0) {
    return 0
  }

}
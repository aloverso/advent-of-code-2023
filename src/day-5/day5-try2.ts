export const makeMapFn = (input: string[]): ((num: number) => number) => {

  return (num: number) => {
    let loc = num;
    for (const line of input) {
      const [destination, source, length] = line.split(" ").map(it => parseInt(it))
      if (num >= source && num <= source + length) {
        const distance = num-source;
        loc = destination+distance
        break;
      }
    }

    return loc;
  }
}

export const makeGetLocation = (inputTxt: string): (seed: number) => number => {

  const lines = inputTxt.split('\n').filter(it => it != '')

  const seedToSoilLoc = lines.indexOf('seed-to-soil map:')
  const soilToFertilizerLoc = lines.indexOf('soil-to-fertilizer map:')
  const fertilizerToWaterLoc = lines.indexOf('fertilizer-to-water map:')
  const waterToLightLoc = lines.indexOf('water-to-light map:')
  const lightToTempLoc = lines.indexOf('light-to-temperature map:')
  const tempToHumidityLoc = lines.indexOf('temperature-to-humidity map:')
  const humidityToLocationLoc = lines.indexOf('humidity-to-location map:')

  const seedToSoil = makeMapFn(lines.slice(seedToSoilLoc+1, soilToFertilizerLoc))
  const soilToFertilizer = makeMapFn(lines.slice(soilToFertilizerLoc+1, fertilizerToWaterLoc))
  const fertilizerToWater = makeMapFn(lines.slice(fertilizerToWaterLoc+1, waterToLightLoc))
  const waterToLight = makeMapFn(lines.slice(waterToLightLoc+1, lightToTempLoc))
  const lightToTemp = makeMapFn(lines.slice(lightToTempLoc+1, tempToHumidityLoc))
  const tempToHumidity = makeMapFn(lines.slice(tempToHumidityLoc+1, humidityToLocationLoc))
  const humidityToLocation = makeMapFn(lines.slice(humidityToLocationLoc+1, lines.length))

  return (seed: number) => {
    const soil = seedToSoil(seed)
    const fertilizer = soilToFertilizer(soil)
    const water = fertilizerToWater(fertilizer)
    const light = waterToLight(water)
    const temp = lightToTemp(light)
    const humidity = tempToHumidity(temp)
    return humidityToLocation(humidity)
  }
}

export const extractSeeds = (inputTxt: string): number[] => {
  return inputTxt
    .split('\n')[0]
    .split('seeds: ')[1]
    .split(' ')
    .map(it => parseInt(it))
}

export const extractSeedsPart2 = (inputTxt: string): number[] => {

  const pairs = getPairsPart2(inputTxt)

  let res = []
  for (const pair of pairs) {
    const [start, length] = pair
    for (let i=start; i<start+length; i++) {
      res.push(i)
    }
  }

  return res;
}

export const getPairsPart2 = (inputTxt: string): number[][] => {
  const seedNumbers = inputTxt
    .split('\n')[0]
    .split('seeds: ')[1]
    .split(' ')
    .map(it => parseInt(it))

  return seedNumbers.reduce((acc, val, i, initial) => {
    if (i % 2 === 0)
      acc.push(initial.slice(i, i + 2));
    return acc;
  }, []);
}

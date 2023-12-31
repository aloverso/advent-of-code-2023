export const makeMapFn = (input: string[]): ((num: number) => number) => {

  const map: Record<number, number> = {}

  for (const line of input) {
    const [destination, source, length] = line.split(" ").map(it => parseInt(it))
    for (let i=0; i<length; i++) {
      map[source+i] = destination+i
    }
  }

  return (num: number) => {
    return map[num] ?? num
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

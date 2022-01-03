import * as THREE from 'three'

// ======================================================================== Helpers

export type RangeType = [number, number]
export type Population<T> = T[]

function makePopulation<T>(arrayOfTuples: [T, number][]): Population<T> {
  const res = []
  for (const [val, qty] of arrayOfTuples) {
    res.push(...Array(qty).fill(val))
  }
  return res
}

function materialFromColor(n: number): THREE.Material {
  return new THREE.MeshBasicMaterial({ color: new THREE.Color(n) })
}

// ======================================================================== Planets

export type ColorLevelThresholdsType = [number, number, number, number, number]
export type ColorLevelsType = [number, number, number, number, number, number]

export const planetTypes = ['earth', 'gas', 'blue', 'rocky', 'icy', 'proto'] as const
export type PlanetType = typeof planetTypes[number]
export type PlanetDataType = {
  probabilityWeight: number
  radiusRange: RangeType
  possibleRingCounts: Population<Number>
  possibleRingTypes: Population<RingType>
  possibleMoonCounts: Population<Number>
  stretchFactorRange: RangeType
  icecapFactorRange: RangeType
  colorThresholds: ColorLevelThresholdsType
  colors: ColorLevelsType
}
export const planetsRecord: Record<PlanetType, PlanetDataType> = {
  earth: {
    probabilityWeight: 2,
    radiusRange: [9.5, 11],
    possibleRingCounts: makePopulation([
      [0, 1],
      [1, 2],
      [2, 1],
      [3, 1],
      [4, 1],
    ]),
    possibleRingTypes: makePopulation([
      ['icy', 1],
      ['metallic', 1],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makePopulation([
      [0, 2],
      [1, 9],
      [2, 5],
      [3, 2],
      [4, 1],
    ]),
    stretchFactorRange: [0, 0],
    icecapFactorRange: [0, 0.5],
    colorThresholds: [-0.1, 0, 0.1, 0.4, 0.5],
    colors: [0x2a7fad, 0x62b9d9, 0xebe8b1, 0x99c97f, 0x9c8c67, 0xffffff],
  },
  gas: {
    probabilityWeight: 1,
    radiusRange: [12.5, 14],
    possibleRingCounts: makePopulation([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 2],
      [4, 1],
      [5, 3],
      [6, 1],
    ]),
    possibleRingTypes: makePopulation([
      ['icy', 3],
      ['metallic', 3],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makePopulation([
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 3],
      [4, 5],
      [5, 3],
      [6, 1],
    ]),
    stretchFactorRange: [5, 10],
    icecapFactorRange: [0.75, 0.85],
    colorThresholds: [-0.1, 0.05, 0.2, 0.35, 0.5],
    colors: [0xbd9371, 0xb55e4c, 0xd9c9a7, 0xbd9371, 0xd9c9a7, 0xf2f2d5],
  },
  blue: {
    probabilityWeight: 1,
    radiusRange: [12.5, 14],
    possibleRingCounts: makePopulation([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 2],
      [4, 1],
      [5, 3],
      [6, 1],
    ]),
    possibleRingTypes: makePopulation([
      ['icy', 3],
      ['metallic', 3],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makePopulation([
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 3],
      [4, 5],
      [5, 3],
      [6, 1],
    ]),
    stretchFactorRange: [5, 10],
    icecapFactorRange: [0.75, 0.85],
    colorThresholds: [-0.1, 0.05, 0.2, 0.35, 0.5],
    colors: [0x3c76b5, 0x4e7fbf, 0x346bb3, 0x4289b3, 0x2b50b5, 0x6e9ecb],
  },
  rocky: {
    probabilityWeight: 1,
    radiusRange: [8, 9.5],
    possibleRingCounts: makePopulation([
      [0, 2],
      [1, 3],
      [2, 1],
      [3, 1],
      [4, 1],
    ]),
    possibleRingTypes: makePopulation([
      ['icy', 1],
      ['metallic', 1],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makePopulation([
      [0, 3],
      [1, 10],
      [2, 4],
      [3, 1],
    ]),
    stretchFactorRange: [0, 0],
    icecapFactorRange: [0, 1],
    colorThresholds: [-0.3, -0.05, 0.15, 0.3, 0.4],
    colors: [0x5c4326, 0x6b543a, 0x8c6d49, 0x6b543a, 0x5c4326, 0xa8b3b5],
  },
  icy: {
    probabilityWeight: 1,
    radiusRange: [8, 9.5],
    possibleRingCounts: makePopulation([
      [0, 2],
      [1, 3],
      [2, 1],
      [3, 1],
      [4, 1],
    ]),
    possibleRingTypes: makePopulation([
      ['icy', 1],
      ['metallic', 1],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makePopulation([
      [0, 3],
      [1, 10],
      [2, 4],
      [3, 1],
    ]),
    stretchFactorRange: [0, 0],
    icecapFactorRange: [0, 1.5],
    colorThresholds: [-0.1, -0.0, 0.1, 0.3, 0.4],
    colors: [0xd8e6e8, 0xcadde0, 0xbcced1, 0xcadde0, 0xd8e6e8, 0xe6eeef],
  },
  proto: {
    probabilityWeight: 1,
    radiusRange: [6.5, 8],
    possibleRingCounts: makePopulation([
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ]),
    possibleRingTypes: makePopulation([
      ['icy', 1],
      ['metallic', 2],
      ['dusty', 3],
    ]),
    possibleMoonCounts: makePopulation([
      [0, 2],
      [1, 5],
      [2, 1],
    ]),
    stretchFactorRange: [0, 0],
    icecapFactorRange: [0, 0],
    colorThresholds: [-0.3, -0.19, 0.09, 0.2, 0.4],
    colors: [0xd14920, 0x3c231b, 0x0e0a0a, 0x3c231b, 0xd14920, 0x0e0a0a],
  },
}

export const planetsPopulation: Population<PlanetType> = makePopulation(
  Object.entries(planetsRecord).map(([k, v]) => [k as PlanetType, v.probabilityWeight])
)

// ======================================================================== Rings

export const ringTypes = ['icy', 'metallic', 'dusty'] as const
export type RingType = typeof ringTypes[number]
type RingDataType = {
  colorsPopulation: Population<THREE.Color>
}
export const ringsRecord: Record<RingType, RingDataType> = {
  icy: {
    colorsPopulation: [new THREE.Color(0xbee8ed), new THREE.Color(0x62b9d9)],
  },
  metallic: {
    colorsPopulation: [new THREE.Color(0x8c7a65), new THREE.Color(0x7a4751)],
  },
  dusty: {
    colorsPopulation: [new THREE.Color(0xe8963f), new THREE.Color(0xa14f1d)],
  },
}

// ======================================================================== Moons

export const moonsMaterialsPopulation: Population<THREE.Material> = [
  ...makePopulation([
    [materialFromColor(0x7a4751), 3],
    [materialFromColor(0xa69990), 3],
    [materialFromColor(0xbee8ed), 3],
    [materialFromColor(0x8c7a65), 3],
  ]),
  ...planetsRecord.earth.colors.map((x) => materialFromColor(x)),
]

// ======================================================================== Stars

export const starColorPopulation: Population<number> = [
  0xf0e5bb, // yellow
  0xfcedb3, // yellow
  0xfabb93, // orange
  0xd16a45, // orange-red
  0xcf5a4a, // red
  0x5992e3, // blue
  0xc7deff, // white-blue
  0xf0bbde, // pink
  ...Array(12).fill(0xffffff),
]

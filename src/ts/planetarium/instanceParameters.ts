import * as THREE from 'three'
import { randFloat, randFromArray } from './common'
import {
  ColorLevelsType,
  ColorLevelThresholdsType,
  moonsMaterialsPopulation,
  planetsRecord,
  PlanetType,
  planetTypes,
  Population,
  ringsRecord,
  RingType,
  starColorPopulation,
} from './vocabulary'

export type InstanceParametersType = {
  camera: {
    dof: number
    distance: number
  }
  planet: {
    type: PlanetType
    radius: number
    phi: number
    theta: number
    axis: THREE.Vector3
    stretchFactor: number
    icecapFactor: number
    colorThresholds: ColorLevelThresholdsType
    colors: ColorLevelsType
  }
  rings: {
    type: RingType
    materialSet: Population<THREE.Material>
    bitCount: number
    minBitSize: number
    maxBitSize: number
    innerRad: number
    outerRad: number
  }[]
  moons: { material: THREE.Material }[]
  starField: {
    starCount: number
    boundingBoxRadius: number
    noGoZoneRadius: number
    colors: Population<number>
  }
}

export function initInstanceParameters(prevInstanceParameters?: InstanceParametersType) {
  // Camera
  const cameraDof = 25
  const cameraDistance = 225

  // Planet
  const prevPlanetType = prevInstanceParameters?.planet?.type
  const planetType = randFromArray(planetTypes.filter((x) => x !== prevPlanetType))
  const planetRadius = randFloat(...planetsRecord[planetType].radiusRange)
  const planetStretchFactor = randFloat(...planetsRecord[planetType].stretchFactorRange)
  const planetIcecapFactor = randFloat(...planetsRecord[planetType].icecapFactorRange)
  const planetColorThresholds = planetsRecord[planetType].colorThresholds
  const planetColors = planetsRecord[planetType].colors
  const [planetPhi, planetTheta, planetRotationAxis] = generatePlanetAxis()

  // Rings
  const ringCount = randFromArray(planetsRecord[planetType].possibleRingCounts)
  const radiusHelper = (x: number): number => (x * x) / 2 + 4.5 * x // 0, 5, 11, 18, 26, 35 ...
  const ringRadOffset = Math.min(4, planetRadius) + 1.25 * planetRadius
  const rings = Array(ringCount)
    .fill(0)
    .map((_, i) => {
      const ringType = randFromArray(planetsRecord[planetType].possibleRingTypes)
      const ringMaterialsPopulation = ringsRecord[ringType].materialsPopulation
      const ringInnerRad = radiusHelper(i) + ringRadOffset + i
      const ringOuterRad = radiusHelper(i + 1) + ringRadOffset + i
      return {
        type: ringType,
        materialSet: ringMaterialsPopulation,
        bitCount: Math.floor((ringOuterRad * ringOuterRad - ringInnerRad * ringInnerRad) / 2),
        minBitSize: 0.25,
        maxBitSize: 0.75,
        innerRad: ringInnerRad,
        outerRad: ringOuterRad,
      }
    })
  // Moons
  const moonCount = randFromArray(planetsRecord[planetType].possibleMoonCounts)
  const moons = Array(moonCount)
    .fill(0)
    .map(() => ({ material: randFromArray(moonsMaterialsPopulation) }))
  // Save
  const nextInstanceParameters: InstanceParametersType = {
    camera: {
      dof: cameraDof,
      distance: cameraDistance,
    },
    planet: {
      type: planetType,
      radius: planetRadius,
      phi: planetPhi,
      theta: planetTheta,
      axis: planetRotationAxis,
      stretchFactor: planetStretchFactor,
      icecapFactor: planetIcecapFactor,
      colorThresholds: planetColorThresholds,
      colors: planetColors,
    },
    rings: rings,
    moons: moons,
    starField: {
      starCount: 2000,
      boundingBoxRadius: 5000,
      noGoZoneRadius: 1.5 * cameraDistance,
      colors: starColorPopulation,
    },
  }
  // console.log(nextInstanceParameters)
  return nextInstanceParameters
}

function generatePlanetAxis(): [number, number, THREE.Vector3] {
  const phi = THREE.MathUtils.randFloatSpread(Math.PI / 2)
  const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2)
  return [
    phi,
    theta,
    new THREE.Vector3(
      Math.sin(theta) * Math.sin(phi),
      Math.cos(phi),
      Math.cos(theta) * Math.sin(phi)
    ).normalize(),
  ]
}

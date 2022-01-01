import * as THREE from 'three'

// Randomly select an element from a given array
export function randFromArray<T>(array: T[]): T {
  return array[(Math.random() * array.length) >> 0]
}

// Randomly select a float between a given low and high value (uniform)
export function randFloat(low: number, high: number): number {
  return THREE.MathUtils.randFloat(low, high)
}

// Randomly select a float between a given low and high value (triangular)
export function randFloatTriangular(low: number, high: number) {
  return randFloat(low / 2, high / 2) + randFloat(low / 2, high / 2)
}

import * as THREE from 'three'

// Some random functions

export function randFromArray<T>(array: T[]): T {
  return array[(Math.random() * array.length) >> 0]
}

export function randFloat(low: number, high: number): number {
  return THREE.MathUtils.randFloat(low, high)
}

export function randFloatTriangular(low: number, high: number) {
  return randFloat(low / 2, high / 2) + randFloat(low / 2, high / 2)
}

// Deep readonly type

export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

import { animate } from './animate'
import { FirstSceneHandlesType } from './firstScene'
import { init } from './init'
import { InstanceParametersType } from './instanceParameters'
import { SecondSceneHandlesType } from './secondScene'

// Todo: move to own file

// End

// This should not change
export type PlanetariumType = Readonly<{
  // Data
  instanceParameters: InstanceParametersType
  // Scenes
  firstSceneHandles: FirstSceneHandlesType
  secondSceneHandles: SecondSceneHandlesType
  renderer: THREE.WebGLRenderer
  // Elements
  container: Element
  canvas: Element
}> & {
  // Animation data (mutable)
  nextFrameReq: number
  prevTime: DOMHighResTimeStamp
}

export function main(container: Element, canvas: Element): PlanetariumType {
  const planetarium = init(container, canvas)

  planetarium.nextFrameReq = requestAnimationFrame((t) => animate(t, planetarium))

  return planetarium
}

export function resetAll(planetarium: PlanetariumType) {
  console.log('HELL')
  cancelAnimationFrame(planetarium.nextFrameReq)

  const newPlanetarium = init(planetarium.container, planetarium.canvas, planetarium)

  newPlanetarium.nextFrameReq = requestAnimationFrame((t) => animate(t, newPlanetarium))

  return newPlanetarium
}

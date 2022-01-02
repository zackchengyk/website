import { XY } from '../../common'
import { animate } from './animate'
import { FirstSceneHandlesType } from './firstScene'
import { init } from './init'
import { InstanceParametersType } from './instanceParameters'
import { SecondSceneHandlesType } from './secondScene'

export const pixelSize = 2

export type PlanetariumType = Readonly<{
  // Data
  instanceParameters: InstanceParametersType
  // Scenes
  firstSceneHandles: FirstSceneHandlesType
  secondSceneHandles: SecondSceneHandlesType
  renderer: THREE.WebGLRenderer
  // HTMLElements
  container: HTMLElement
  canvas: HTMLElement
}> & {
  // Animation data (mutable)
  nextFrameReq: number
  prevTime: DOMHighResTimeStamp
  // Rotation stuff
  normMousePos: XY
  currentTheta: number
  currentPhi: number
}

// ======================================================================== Main

export function main(container: HTMLElement, canvas: HTMLElement): PlanetariumType {
  // Create a new instance of the planetarium
  const planetarium = init(container, canvas)

  // Start the animation loop
  planetarium.nextFrameReq = requestAnimationFrame((t) => animate(t, planetarium))

  // Return the planetarium object
  return planetarium
}

// ======================================================================== Reset (on click, say)

export function resetAll(planetarium: PlanetariumType) {
  // Cancel the previous animation loop
  cancelAnimationFrame(planetarium.nextFrameReq)

  // Create a new instance of the planetarium, based on the previous one
  const newPlanetarium = init(planetarium.container, planetarium.canvas, planetarium)

  // Start the animation loop
  newPlanetarium.nextFrameReq = requestAnimationFrame((t) => animate(t, newPlanetarium))

  // Return the planetarium object
  return newPlanetarium
}

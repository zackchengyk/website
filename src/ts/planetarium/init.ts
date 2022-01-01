import * as THREE from 'three'
import { initFirstScene, populateFirstScene } from './firstScene'
import { initInstanceParameters } from './instanceParameters'
import { PlanetariumType } from './main'
import { initSecondScene, populateSecondScene } from './secondScene'

export function init(container: Element, canvas: Element, planetarium?: PlanetariumType): PlanetariumType {
  // Get screen size
  const iw = container.clientWidth
  const ih = container.clientHeight

  // Initialize instance parameters
  const instanceParameters = initInstanceParameters()

  // Initialize camera + scenes
  let firstSceneHandles: any, secondSceneHandles: any
  if (!planetarium) {
    firstSceneHandles = initFirstScene(iw, ih, instanceParameters)
    secondSceneHandles = initSecondScene(iw, ih, instanceParameters)
  } else {
    firstSceneHandles = { ...planetarium.firstSceneHandles }
    secondSceneHandles = planetarium.secondSceneHandles
  }

  // Populate scenes (despawning old things + spawning new things)
  populateFirstScene(iw, ih, instanceParameters, firstSceneHandles)
  populateSecondScene(iw, ih, instanceParameters, secondSceneHandles)

  // Initialize renderer
  let renderer
  if (!planetarium) {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xffffff, 0)
    renderer.setSize(iw, ih)
    renderer.autoClear = false
  } else {
    renderer = planetarium.renderer
  }

  // Return planetarium object
  return {
    instanceParameters,
    firstSceneHandles: firstSceneHandles,
    secondSceneHandles,
    renderer,
    container,
    canvas,
    nextFrameReq: planetarium ? planetarium.nextFrameReq : 0, // return some nonsense number if unavailable
    prevTime: planetarium ? planetarium.prevTime : 0, // return zero (start of animation) if unavailable
  }
}

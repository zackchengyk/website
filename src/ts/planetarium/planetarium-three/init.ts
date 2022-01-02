import * as THREE from 'three'
import { initFirstScene, populateFirstScene } from './firstScene'
import { initInstanceParameters } from './instanceParameters'
import { PlanetariumType } from './main'
import { initSecondScene, populateSecondScene } from './secondScene'

// Called when the planetarium needs to start up or reset
export function init(
  container: HTMLElement,
  canvas: HTMLElement,
  planetarium?: PlanetariumType
): PlanetariumType {
  // Get screen size
  const iw = container.clientWidth
  const ih = container.clientHeight

  // Initialize instance parameters
  const instanceParameters = initInstanceParameters(planetarium?.instanceParameters)

  // Initialize camera + scenes
  let firstSceneHandles: any, secondSceneHandles: any
  if (!planetarium) {
    firstSceneHandles = initFirstScene(iw, ih, instanceParameters)
    secondSceneHandles = initSecondScene(iw, ih, instanceParameters)
  } else {
    firstSceneHandles = planetarium.firstSceneHandles
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

  // Animation stuff
  let nextFrameReq = 0,
    prevTime = 0,
    normMousePos = { x: 0, y: 0 },
    currentTheta = 0,
    currentPhi = 0
  if (planetarium) {
    nextFrameReq = planetarium.nextFrameReq
    prevTime = planetarium.prevTime
    normMousePos = planetarium.normMousePos
    currentTheta = planetarium.currentTheta
    currentPhi = planetarium.currentPhi
  }

  // Return planetarium object
  return {
    instanceParameters,
    firstSceneHandles,
    secondSceneHandles,
    renderer,
    container,
    canvas,
    nextFrameReq,
    prevTime,
    normMousePos,
    currentTheta,
    currentPhi,
  }
}

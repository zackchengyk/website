import { updateFirstScene } from './firstScene'
import { PlanetariumType } from './main'
import { updateSecondScene } from './secondScene'
import Stats from 'three/examples/jsm/libs/stats.module'

// Temporary fps counter
// @ts-ignore
const stats = new Stats()
stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
stats.dom.style.zIndex = '100000000000000'

// Called once per animation frame
export function animate(time: DOMHighResTimeStamp, planetarium: PlanetariumType) {
  planetarium.nextFrameReq = requestAnimationFrame((t) => animate(t, planetarium))

  stats.begin()
  render(time, planetarium)
  stats.end()
}

// Helper function which does the rendering
function render(time: DOMHighResTimeStamp, planetarium: PlanetariumType) {
  // Get delta time
  const deltaTime = time - planetarium.prevTime
  planetarium.prevTime = time

  // Get renderer
  const renderer = planetarium.renderer

  // Get new size
  const iw = planetarium.container.clientWidth
  const ih = planetarium.container.clientHeight
  renderer.setSize(iw, ih)

  // Update scenes
  updateFirstScene(deltaTime, iw, ih, planetarium.instanceParameters, planetarium.firstSceneHandles)
  updateSecondScene(deltaTime, iw, ih, planetarium.instanceParameters, planetarium.secondSceneHandles)

  // Render first scene to texture
  renderer.setRenderTarget(planetarium.secondSceneHandles.pixelRenderTarget)
  renderer.clear()
  renderer.render(planetarium.firstSceneHandles.scene, planetarium.firstSceneHandles.camera)

  // Render second scene to screen
  renderer.setRenderTarget(null)
  renderer.clear()
  renderer.render(planetarium.secondSceneHandles.scene, planetarium.secondSceneHandles.camera)
}

import * as THREE from 'three'
import { PlanetariumType } from './main'

// ======================================================================== Helpers

const origin = new THREE.Vector3(0)

const thetaRange = 2
const getTheta = (x: number) => -thetaRange * THREE.MathUtils.smoothstep(x, -1, 0.5) + thetaRange / 2
const fix = getTheta(0)

const phiRange = 1
const getPhi = (y: number) => phiRange * THREE.MathUtils.smoothstep(y, -0.75, 0.75) - phiRange / 2

// ======================================================================== rotateCamera

export function rotateCamera(planetarium: PlanetariumType): void {
  const targetTheta = getTheta(planetarium.normMousePos.x) - fix
  const targetPhi = getPhi(planetarium.normMousePos.y)

  const theta = THREE.MathUtils.lerp(planetarium.currentTheta, targetTheta, 0.05)
  const phi = THREE.MathUtils.lerp(planetarium.currentPhi, targetPhi, 0.05)
  planetarium.currentTheta = theta
  planetarium.currentPhi = phi

  const camera = planetarium.firstSceneHandles.camera
  const radius = planetarium.instanceParameters.camera.distance
  camera.position.x = radius * Math.sin(theta) * Math.cos(phi)
  camera.position.y = radius * Math.sin(phi)
  camera.position.z = radius * Math.cos(theta) * Math.cos(phi)
  camera.lookAt(origin)
  camera.updateMatrix()
}

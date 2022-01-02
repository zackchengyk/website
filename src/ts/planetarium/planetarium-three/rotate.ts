import * as THREE from 'three'
import { PlanetariumType } from './main'

const origin = new THREE.Vector3(0)
const thetaRange = 3
const phiRange = 1.5

export function rotateCamera(planetarium: PlanetariumType): void {
  const targetTheta =
    -thetaRange * THREE.MathUtils.smoothstep(planetarium.normMousePos.x, -1, 0.5) + thetaRange / 2
  const targetPhi =
    phiRange * THREE.MathUtils.smoothstep(planetarium.normMousePos.y, -0.75, 0.75) - phiRange / 2

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

import * as THREE from 'three'
import { PlanetariumType } from './main'

const origin = new THREE.Vector3(0)

export function rotateCamera(planetarium: PlanetariumType): void {
  const targetTheta = -planetarium.normMousePos.x
  const targetPhi = planetarium.normMousePos.y

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

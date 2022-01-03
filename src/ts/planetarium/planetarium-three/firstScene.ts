import * as THREE from 'three'
import { InstanceParametersType } from './instanceParameters'
import { randFloatTriangular, randFromArray } from './common'
import { getPlanetShaderParameters, ringShaderMaterial } from './shaders'

type RingsDatumType = {
  speed: number
  ringPoints: THREE.Points
}
type RingsDataType = RingsDatumType[]

type MoonsDatumType = {
  radius: number
  axis: THREE.Vector3
  speed: number
  moonMesh: THREE.Mesh
  /* trailPoints: THREE.Points */
}
type MoonsDataType = MoonsDatumType[]

/* const numTrailPoints = 200
const numTrailPointsX3 = numTrailPoints * 3 */

export type FirstSceneHandlesType = {
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  planetMesh?: THREE.Mesh
  ringsData?: RingsDataType
  moonsData?: MoonsDataType
  /* trailTick?: number
  drawRange?: number */
  starsPoints?: THREE.Points
}

// ======================================================================== Init

export function initFirstScene(
  iw: number,
  ih: number,
  instanceParameters: InstanceParametersType
): FirstSceneHandlesType {
  // Camera
  const camera = new THREE.PerspectiveCamera(
    instanceParameters.camera.dof,
    iw / ih,
    instanceParameters.camera.near,
    instanceParameters.camera.far
  )
  camera.position.setZ(instanceParameters.camera.distance)

  // Scene
  const scene = new THREE.Scene()
  scene.background = null

  return { camera, scene }
}

// ======================================================================== Populate

export function populateFirstScene(
  iw: number,
  ih: number,
  instanceParameters: InstanceParametersType,
  firstSceneHandles: FirstSceneHandlesType
) {
  // Get scene
  const scene = firstSceneHandles.scene

  // Despawn + spawn planet
  if (firstSceneHandles.planetMesh) {
    despawnPlanet(scene, firstSceneHandles.planetMesh)
  }
  firstSceneHandles.planetMesh = spawnPlanet(scene, instanceParameters.planet)

  // Despawn + spawn rings
  if (firstSceneHandles.ringsData) {
    despawnRings(scene, firstSceneHandles.ringsData)
  }
  firstSceneHandles.ringsData = spawnRings(scene, instanceParameters.planet, instanceParameters.rings)

  // Despawn + spawn moons
  if (firstSceneHandles.moonsData) {
    despawnMoons(scene, firstSceneHandles.moonsData)
  }
  firstSceneHandles.moonsData = spawnMoons(scene, instanceParameters.moons)

  /* // Stars
  if (!firstSceneHandles.starsPoints) {
    firstSceneHandles.starsPoints = spawnStars(scene, instanceParameters.stars)
  } */
}

// Helper: Planet

function spawnPlanet(scene: THREE.Scene, planetParameters: InstanceParametersType['planet']): THREE.Mesh {
  const { radius } = planetParameters
  const geometry = new THREE.SphereGeometry(radius, radius * 5, radius * 5)
  const material = new THREE.ShaderMaterial(getPlanetShaderParameters(planetParameters))
  const planetMesh = new THREE.Mesh(geometry, material)
  scene.add(planetMesh)
  return planetMesh
}
function despawnPlanet(scene: THREE.Scene, planetMesh: THREE.Mesh) {
  scene.remove(planetMesh)
  planetMesh.geometry.dispose()
  if (planetMesh.material instanceof Array) {
    planetMesh.material.forEach((x) => x.dispose())
  } else {
    planetMesh.material.dispose()
  }
}

// Helper: Rings

function spawnRings(
  scene: THREE.Scene,
  planetParameters: InstanceParametersType['planet'],
  ringsParameters: InstanceParametersType['rings']
): RingsDataType {
  return ringsParameters.map((x) => spawnRing(scene, planetParameters, x))
}
function spawnRing(
  scene: THREE.Scene,
  { phi, theta, axis }: InstanceParametersType['planet'],
  { colorSet, bitCount, innerRad, outerRad }: InstanceParametersType['rings'][number]
): RingsDatumType {
  const phi2 = phi + Math.PI / 2
  // Geometry
  const ringGeometry = new THREE.BufferGeometry()
  const positionArray = Array(bitCount * 3).fill(0)
  const colorArray = Array(bitCount * 3).fill(0)
  const sizeArray = Array(3).fill(0)
  for (let i = 0; i < bitCount; i++) {
    const ix3 = 3 * i
    // Position
    const axialOffset =
      THREE.MathUtils.randFloatSpread(1) +
      THREE.MathUtils.randFloatSpread(1) +
      THREE.MathUtils.randFloatSpread(1)
    const radius =
      randFloatTriangular(innerRad / 2, outerRad / 2) +
      randFloatTriangular(innerRad / 2, outerRad / 2) +
      THREE.MathUtils.randFloatSpread(3 - Math.abs(axialOffset))
    const theta2 = THREE.MathUtils.randFloatSpread(Math.PI * 2)
    const pos = new THREE.Vector3(
      radius * Math.sin(theta) * Math.sin(phi2),
      radius * Math.cos(phi2),
      radius * Math.cos(theta) * Math.sin(phi2)
    )
    pos.applyAxisAngle(axis, theta2)
    pos.add(new THREE.Vector3(axis.x * axialOffset, axis.y * axialOffset, axis.z * axialOffset))
    positionArray[ix3] = pos.x
    positionArray[ix3 + 1] = pos.y
    positionArray[ix3 + 2] = pos.z
    // Color
    const color = randFromArray(colorSet)
    colorArray[ix3] = color.r
    colorArray[ix3 + 1] = color.g
    colorArray[ix3 + 2] = color.b
    // Size
    sizeArray[i] = THREE.MathUtils.randInt(0, 3)
  }
  ringGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionArray), 3))
  ringGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorArray), 3))
  ringGeometry.setAttribute('size', new THREE.BufferAttribute(new Float32Array(sizeArray), 1))
  // Material
  const ringMaterial = ringShaderMaterial
  // Object
  const ringPoints = new THREE.Points(ringGeometry, ringMaterial)
  // Add
  scene.add(ringPoints)
  // Speed
  const speed = Math.sqrt(innerRad) * 0.15
  return { ringPoints, speed }
}
function despawnRings(scene: THREE.Scene, ringsData: RingsDataType) {
  ringsData.forEach((ringDatum) => {
    scene.remove(ringDatum.ringPoints)
    ringDatum.ringPoints.geometry.dispose()
    // Do not delete material!
  })
  ringsData = []
}

// Helper: Moons

function spawnMoons(scene: THREE.Scene, moonsParameters: InstanceParametersType['moons']) {
  return moonsParameters.map((x) => spawnMoon(scene, x))
}
function spawnMoon(
  scene: THREE.Scene,
  { material }: InstanceParametersType['moons'][number]
): MoonsDatumType {
  // Geometry
  const moonSize = randFloatTriangular(0.5, 3)
  const geometry = new THREE.SphereGeometry(moonSize, 10, 10)
  // Material is provided
  // Object
  const moonMesh = new THREE.Mesh(geometry, material)
  // Axis
  const phi = THREE.MathUtils.randFloatSpread(Math.PI / 3)
  const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2)
  const axis = new THREE.Vector3(
    Math.sin(theta) * Math.sin(phi),
    Math.cos(phi),
    Math.cos(theta) * Math.sin(phi)
  ).normalize()
  // Position
  const radius = randFloatTriangular(40, 80)
  const phi2 = phi + Math.PI / 2
  const theta2 = theta
  moonMesh.position.set(
    radius * Math.sin(theta2) * Math.sin(phi2),
    radius * Math.cos(phi2),
    radius * Math.cos(theta2) * Math.sin(phi2)
  )
  // Speed
  const speed = Math.sqrt(radius) * 0.05
  // Add
  scene.add(moonMesh)

  /* // Trail
  const trailGeometry = new THREE.BufferGeometry()
  const trailPointsPositionArray = Array(numTrailPoints * 3).fill(0)
  trailPointsPositionArray[0] = moonMesh.position.x
  trailPointsPositionArray[1] = moonMesh.position.y
  trailPointsPositionArray[2] = moonMesh.position.z
  trailGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(trailPointsPositionArray), 3)
  )
  const trailPoints = new THREE.Points(trailGeometry, trailMaterial)
  scene.add(trailPoints) */

  return {
    radius,
    axis,
    speed,
    moonMesh,
    /* trailPoints */
  }
}
function despawnMoons(scene: THREE.Scene, moonsData: MoonsDataType) {
  moonsData.forEach((moonDatum) => {
    scene.remove(moonDatum.moonMesh)
    moonDatum.moonMesh.geometry.dispose()
    /* scene.remove(moonDatum.trailPoints) */
  })
  moonsData.length = 0
}

/* // Helper: Stars

function spawnStars(scene: THREE.Scene, starsParameters: InstanceParametersType['stars']): THREE.Points {
  const { starCount, boundingBoxRadius, noGoZoneRadius, colors } = starsParameters
  const starsMaterial = new THREE.ShaderMaterial(getStarShaderParameters(pixelSize))

  // Geometry
  const geometry = new THREE.BufferGeometry()
  const positionArray = Array(starCount * 3).fill(0)
  const colorArray = Array(starCount * 3).fill(0)
  for (let i = 0; i < starCount; i++) {
    const I = 3 * i
    // Position
    const [x, y, z] = [
      THREE.MathUtils.randFloatSpread(boundingBoxRadius),
      THREE.MathUtils.randFloatSpread(boundingBoxRadius),
      THREE.MathUtils.randFloat(-boundingBoxRadius / 2, 0),
    ]
    const offset = new THREE.Vector3(x, y, z).normalize().multiplyScalar(noGoZoneRadius)
    positionArray[I] = x + offset.x
    positionArray[I + 1] = y + offset.y
    positionArray[I + 2] = z + offset.z
    // Color
    const color = new THREE.Color(randFromArray(colors))
    colorArray[I] = color.r
    colorArray[I + 1] = color.g
    colorArray[I + 2] = color.b
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionArray), 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorArray), 3))
  // Material
  const material = starsMaterial
  // Object
  const starsMesh = new THREE.Points(geometry, material)
  // Add
  scene.add(starsMesh)
  return starsMesh
}
function despawnStars(scene: THREE.Scene, starsMesh: THREE.Mesh) {
  scene.remove(starsMesh)
  starsMesh.geometry.dispose()
} */

// ======================================================================== Update

export function updateFirstScene(
  deltaTime: number,
  iw: number,
  ih: number,
  instanceParameters: InstanceParametersType,
  firstSceneHandles: FirstSceneHandlesType
) {
  // Get delta time and things to update
  const deltaTimeInSeconds = deltaTime / 1000
  const { camera, planetMesh, ringsData, moonsData } = firstSceneHandles

  if (!camera || !planetMesh || !ringsData || !moonsData) return

  // Update camera
  camera.aspect = iw / ih
  camera.updateProjectionMatrix()

  // Update planet
  const planetRotationAxis = instanceParameters.planet.axis
  planetMesh.rotateOnAxis(planetRotationAxis, deltaTimeInSeconds * 0.15)

  // Update rings
  ringsData.forEach((ringDatum) => {
    const ang = deltaTimeInSeconds * ringDatum.speed
    ringDatum.ringPoints.rotateOnAxis(planetRotationAxis, ang)
  })

  /* // Update trail
  if (firstSceneHandles.trailTick == null || firstSceneHandles.drawRange == null) {
    firstSceneHandles.trailTick = -1
    firstSceneHandles.drawRange = -1
  }
  firstSceneHandles.drawRange = Math.min(firstSceneHandles.drawRange + 1, numTrailPoints)
  firstSceneHandles.trailTick = (firstSceneHandles.trailTick + 1) % numTrailPointsX3
  const t = firstSceneHandles.trailTick */

  // Update moon
  moonsData.forEach((moonDatum) => {
    const ang = deltaTimeInSeconds * moonDatum.speed

    /* if (firstSceneHandles.trailTick! % 3 === 0) {
      moonDatum.trailPoints.geometry.attributes.position.array[t] = moonDatum.moonMesh.position.x
      moonDatum.trailPoints.geometry.attributes.position.array[t + 1] = moonDatum.moonMesh.position.y
      moonDatum.trailPoints.geometry.attributes.position.array[t + 2] = moonDatum.moonMesh.position.z
    }
    moonDatum.trailPoints.geometry.attributes.position.needsUpdate = true */

    moonDatum.moonMesh.position.applyAxisAngle(moonDatum.axis, ang) // Rotate the position

    moonDatum.moonMesh.rotateOnAxis(moonDatum.axis, ang) // Rotate the object
  })
}

import * as THREE from 'three'
import { InstanceParametersType } from './instanceParameters'
import { randFloatTriangular, randFromArray } from './common'
import { moonsMaterialsPopulation } from './vocabulary'
import { E } from '../pixels/letters/letters.common'

type RingBitType = {
  speed: number
  ringBitMesh: THREE.Mesh
}
type RingsDatumType = RingBitType[]
type RingsDataType = RingsDatumType[]

type MoonsDatumType = {
  radius: number
  axis: THREE.Vector3
  speed: number
  moonMesh: THREE.Mesh
}
type MoonsDataType = MoonsDatumType[]

export type FirstSceneHandlesType = {
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  planetMesh?: THREE.Mesh
  ringsData?: RingsDataType
  moonsData?: MoonsDataType
}

// ================== Init

export function initFirstScene(
  iw: number,
  ih: number,
  instanceParameters: InstanceParametersType
): FirstSceneHandlesType {
  // Camera
  const camera = new THREE.PerspectiveCamera(
    instanceParameters.camera.dof,
    iw / ih,
    0.1,
    2 * instanceParameters.camera.distance + 2 * instanceParameters.starField.boundingBoxRadius + 1000
  )
  camera.position.setZ(instanceParameters.camera.distance)
  // Scene
  const scene = new THREE.Scene()
  scene.background = null
  return { camera, scene }
}

// ================== Populate

export function populateFirstScene(
  iw: number,
  ih: number,
  instanceParameters: InstanceParametersType,
  firstSceneHandles: FirstSceneHandlesType
) {
  // Get scene
  const scene = firstSceneHandles.scene

  // Planet
  if (firstSceneHandles.planetMesh) {
    despawnPlanet(scene, firstSceneHandles.planetMesh)
  }
  firstSceneHandles.planetMesh = spawnPlanet(scene, instanceParameters.planet)

  // Rings
  if (firstSceneHandles.ringsData) {
    despawnRings(scene, firstSceneHandles.ringsData)
  }
  firstSceneHandles.ringsData = spawnRings(scene, instanceParameters.planet, instanceParameters.rings)

  // Moons
  if (firstSceneHandles.moonsData) {
    despawnMoons(scene, firstSceneHandles.moonsData)
  }
  firstSceneHandles.moonsData = spawnMoons(scene, instanceParameters.moons)

  // // Stars
  // if (!starsMesh) {
  //   starsMesh = spawnStars(instanceParameters.starField)
  // }
  // // Lights
  // if (!ambientLight) {
  //   ambientLight = new THREE.AmbientLight(0xffffff)
  //   firstScene.add(ambientLight)
  // }
}

// Planet

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
function getPlanetShaderParameters(
  planetParameters: InstanceParametersType['planet']
): THREE.ShaderMaterialParameters {
  const { type, radius, axis, stretchFactor, icecapFactor, colorThresholds, colors } = planetParameters
  return {
    uniforms: {
      scale: { value: radius / 10 },
      seed: { value: new Date().getTime() % 10000 },
      planetAxis: { value: axis },
      stretchFactor: { value: stretchFactor },
      icecapFactor: { value: icecapFactor },
      color0: { value: new THREE.Color(colors[0]) },
      threshold1: { value: colorThresholds[0] },
      color1: { value: new THREE.Color(colors[1]) },
      threshold2: { value: colorThresholds[1] },
      color2: { value: new THREE.Color(colors[2]) },
      threshold3: { value: colorThresholds[2] },
      color3: { value: new THREE.Color(colors[3]) },
      threshold4: { value: colorThresholds[3] },
      color4: { value: new THREE.Color(colors[4]) },
      threshold5: { value: colorThresholds[4] },
      color5: { value: new THREE.Color(colors[5]) },
    },
    vertexShader: `
    varying vec3 vPosition;
    void main() {
      vPosition = normalize(position);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
    fragmentShader: `
    // Modified from this repo
    // https://github.com/ashima/webgl-noise
    // by Stefan Gustavson and Ashima Arts

    varying vec3 vPosition;

    uniform float scale;
    uniform float seed;
    uniform vec3 planetAxis;
    uniform float stretchFactor;
    uniform float icecapFactor;

    uniform vec3 color0;
    uniform float threshold1;
    uniform vec3 color1;
    uniform float threshold2;
    uniform vec3 color2;
    uniform float threshold3;
    uniform vec3 color3;
    uniform float threshold4;
    uniform vec3 color4;
    uniform float threshold5;
    uniform vec3 color5;

    vec3 mod289(vec3 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x)
    {
      return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r)
    {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    vec3 fade(vec3 t) {
      return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    }

    // Classic Perlin noise
    float cnoise(vec3 P)
    {
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod289(Pi0);
      Pi1 = mod289(Pi1);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;

      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);

      vec4 gx0 = ixy0 * (1.0 / 7.0);
      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);

      vec4 gx1 = ixy1 * (1.0 / 7.0);
      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);

      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;

      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);

      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
      return 2.2 * n_xyz;
    }

    void main() {
      vec3 cnoiseInput;
      if (stretchFactor > 1.0) {
        cnoiseInput = dot(vPosition, planetAxis) + (vPosition * scale) / stretchFactor + seed;
      } else {
        cnoiseInput = vPosition * scale + seed;
      }
      float intensity = cnoise(cnoiseInput) / 2.0
        + cnoise(cnoiseInput * 2.0) / 4.0
        + cnoise(cnoiseInput * 4.0) / 8.0
        + cnoise(cnoiseInput * 6.0) / 16.0
        + cnoise(cnoiseInput * 8.0) / 16.0
        + pow(abs(dot(vPosition, planetAxis)), 8.0) * icecapFactor;
      vec3 color;
      if (intensity < threshold1)
        color = color0;
      else if (intensity < threshold2)
        color = color1;
      else if (intensity < threshold3)
        color = color2;
      else if (intensity < threshold4)
        color = color3;
      else if (intensity < threshold5)
        color = color4;
      else
        color = color5;
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  }
}

// Rings

function spawnRings(
  scene: THREE.Scene,
  planetParameters: InstanceParametersType['planet'],
  ringsParameters: InstanceParametersType['rings']
): RingsDataType {
  return ringsParameters.map((x) => spawnRingBits(scene, planetParameters, x))
}
function spawnRingBits(
  scene: THREE.Scene,
  { phi, theta, axis }: InstanceParametersType['planet'],
  {
    materialSet,
    bitCount,
    minBitSize,
    maxBitSize,
    innerRad,
    outerRad,
  }: InstanceParametersType['rings'][number]
): RingsDatumType {
  if (!bitCount) {
    return []
  }
  const ringDatum = Array(bitCount).fill(0)
  const phi2 = phi + Math.PI / 2
  for (let i = 0; i < bitCount; i++) {
    // Geometry
    const size = randFloatTriangular(minBitSize, maxBitSize)
    const geometry = new THREE.SphereGeometry(size, 2, 2)
    // Material
    const material = randFromArray(materialSet)
    // Object
    const ringBitMesh = new THREE.Mesh(geometry, material)
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
    ringBitMesh.position.set(
      radius * Math.sin(theta) * Math.sin(phi2),
      radius * Math.cos(phi2),
      radius * Math.cos(theta) * Math.sin(phi2)
    )
    ringBitMesh.position.applyAxisAngle(axis, theta2)
    ringBitMesh.position.add(
      new THREE.Vector3(axis.x * axialOffset, axis.y * axialOffset, axis.z * axialOffset)
    )
    const speed = Math.sqrt(radius) * 0.15
    // Add
    scene.add(ringBitMesh)
    // Save data
    ringDatum[i] = { speed, ringBitMesh }
  }
  return ringDatum
}
function despawnRings(scene: THREE.Scene, ringsData: RingsDataType) {
  ringsData.forEach((ringDatum) => {
    ringDatum.forEach((ringBitDatum) => {
      scene.remove(ringBitDatum.ringBitMesh)
      ringBitDatum.ringBitMesh.geometry.dispose()
    })
  })
  ringsData = []
}

// Moons

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
  return { radius, axis, speed, moonMesh }
}
function despawnMoons(scene: THREE.Scene, moonsData: MoonsDataType) {
  moonsData.forEach((moonDatum) => {
    scene.remove(moonDatum.moonMesh)
    moonDatum.moonMesh.geometry.dispose()
  })
  moonsData.length = 0
}

// // Stars

// let starsMesh
// let starsMaterial = new THREE.ShaderMaterial(starShaderParameters)

// function spawnStars({ starCount, boundingBoxRadius, noGoZoneRadius, colors }) {
//   // Geometry
//   const geometry = new THREE.BufferGeometry()
//   const positionArray = Array(starCount * 3).fill(0)
//   const colorArray = Array(starCount * 3).fill(0)
//   for (let i = 0; i < starCount; i++) {
//     const I = 3 * i
//     // Position
//     const [x, y, z] = [
//       THREE.MathUtils.randFloatSpread(boundingBoxRadius),
//       THREE.MathUtils.randFloatSpread(boundingBoxRadius),
//       THREE.MathUtils.randFloat(-boundingBoxRadius / 2, 0),
//     ]
//     const offset = new THREE.Vector3(x, y, z).normalize().multiplyScalar(noGoZoneRadius)
//     positionArray[I] = x + offset.x
//     positionArray[I + 1] = y + offset.y
//     positionArray[I + 2] = z + offset.z
//     // Color
//     const color = new THREE.Color(randFromArray(colors))
//     colorArray[I] = color.r
//     colorArray[I + 1] = color.g
//     colorArray[I + 2] = color.b
//   }
//   geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionArray), 3))
//   geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorArray), 3))
//   // Material
//   const material = starsMaterial
//   // Object
//   const starsMesh = new THREE.Points(geometry, material)
//   // Add
//   firstScene.add(starsMesh)
//   return starsMesh
// }

// function deleteStars() {
//   firstScene.remove(starsMesh)
//   starsMesh.geometry.dispose()
// }

// ================== Update

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

  // Update camera
  camera.aspect = iw / ih
  camera.updateProjectionMatrix()

  // Update planet
  const planetRotationAxis = instanceParameters.planet.axis
  planetMesh.rotateOnAxis(planetRotationAxis, deltaTimeInSeconds * 0.15)

  // Update rings
  ringsData.forEach((ringDatum) => {
    ringDatum.forEach((ringBitDatum) => {
      const ang = deltaTimeInSeconds * ringBitDatum.speed
      ringBitDatum.ringBitMesh.position.applyAxisAngle(planetRotationAxis, ang) // Rotate the position
      ringBitDatum.ringBitMesh.rotateOnAxis(planetRotationAxis, ang) // Rotate the object
    })
  })

  // Update moon
  moonsData.forEach((moonDatum) => {
    const ang = deltaTimeInSeconds * moonDatum.speed
    moonDatum.moonMesh.position.applyAxisAngle(moonDatum.axis, ang) // Rotate the position
    moonDatum.moonMesh.rotateOnAxis(moonDatum.axis, ang) // Rotate the object
  })
}

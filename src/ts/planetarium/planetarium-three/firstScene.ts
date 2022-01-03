import * as THREE from 'three'
import { InstanceParametersType } from './instanceParameters'
import { randFloatTriangular, randFromArray } from './common'
import crossTextureSrc from '../../../img/crossTexture.png'

const crossTexture = new THREE.TextureLoader().load(crossTextureSrc)
crossTexture.minFilter = THREE.NearestFilter
crossTexture.magFilter = THREE.NearestFilter

type RingsDatumType = THREE.Points
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
  const ringMaterial = new THREE.ShaderMaterial(getRingShaderParameters())
  // Object
  const starsMesh = new THREE.Points(ringGeometry, ringMaterial)
  // Add
  scene.add(starsMesh)
  return starsMesh
}
function despawnRings(scene: THREE.Scene, ringsData: RingsDataType) {
  ringsData.forEach((ringDatum) => {
    scene.remove(ringDatum)
    ringDatum.geometry.dispose()
    if (ringDatum.material instanceof Array) {
      ringDatum.material.forEach((x) => x.dispose())
    } else {
      ringDatum.material.dispose()
    }
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
    const ang = deltaTimeInSeconds * 1
    ringDatum.rotateOnAxis(planetRotationAxis, ang)
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

// ======================================================================== Shaders

/* const trailMaterial = new THREE.ShaderMaterial({
  uniforms: { size: { value: 1 } },
  vertexShader: `
      uniform float size;
      void main() {
        gl_PointSize = size;
        gl_Position = projectionMatrix * modelViewMatrix  * vec4(position, 1.0);
      }
    `,
  fragmentShader: `
      void main() {
        gl_FragColor = vec4(0.5,0.5,0.5,0.5);
      }
    `,
}) */

function getRingShaderParameters(): THREE.ShaderMaterialParameters {
  return {
    uniforms: {
      crossTexture: { value: crossTexture },
    },
    vertexShader: `
      varying vec3 vColor;
      varying float vSize;
      attribute vec3 color;
      attribute float size;

      void main() {
        vColor = color;
        vSize = size;
        gl_PointSize = size;
        gl_Position = projectionMatrix * modelViewMatrix  * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vSize;
      uniform sampler2D crossTexture;

      void main() {
        if (vSize == 3.0) {
          vec2 uv = vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y );
          vec4 mapTexel = texture2D( crossTexture, uv );
          gl_FragColor = vec4(vColor.xyz, mapTexel[3]);
          if ( gl_FragColor.a < 0.001 ) {
            discard;
          }
        } else {
          gl_FragColor = vec4(vColor.xyz, 1);
        }
      }
    `,
  }
}

/* function getStarShaderParameters(pixelSize: number): THREE.ShaderMaterialParameters {
  return {
    uniforms: {
      size: { value: pixelSize > 1 ? 1 : 2 },
    },
    vertexShader: `
      varying vec3 vColor;

      attribute vec3 color;

      uniform float size;

      void main() {
        vColor = color;
        gl_PointSize = size;
        gl_Position = projectionMatrix * modelViewMatrix  * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        gl_FragColor = vec4(vColor,1);
      }
    `,
  }
} */

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

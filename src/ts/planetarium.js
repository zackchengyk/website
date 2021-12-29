import * as THREE from '/node_modules/three/src/Three'

const pixelSize = 2

const clearColor = 0x191108

const autoResetInterval = 15000 // 3428.6 // 140 BPM

// ================== VOCABULARY

const planetTypes = {
  earth: {
    probabilityWeight: 2,
    radiusRange: [9.5, 11],
    possibleRingCounts: makeDist([
      [0, 3],
      [1, 2],
      [2, 1],
    ]),
    possibleRingTypes: makeDist([
      ['icy', 1],
      ['metallic', 3],
      ['dusty', 3],
    ]),
    possibleMoonCounts: makeDist([
      [0, 2],
      [1, 9],
      [2, 5],
      [3, 2],
      [4, 1],
    ]),
    stretchFactorRange: [0, 0],
    icecapFactorRange: [0, 0.5],
    colorThresholds: [-0.1, 0, 0.1, 0.4, 0.5],
    colors: [0x2a7fad, 0x62b9d9, 0xebe8b1, 0x99c97f, 0x9c8c67, 0xffffff],
  },
  gas: {
    probabilityWeight: 1,
    radiusRange: [12.5, 14],
    possibleRingCounts: makeDist([
      [0, 1],
      [1, 2],
      [2, 2],
      [3, 1],
    ]),
    possibleRingTypes: makeDist([
      ['icy', 3],
      ['metallic', 3],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makeDist([
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 3],
      [4, 5],
      [5, 3],
      [6, 1],
    ]),
    stretchFactorRange: [5, 10],
    icecapFactorRange: [0.75, 0.85],
    colorThresholds: [-0.1, 0.05, 0.2, 0.35, 0.5],
    colors: [0xbd9371, 0xb55e4c, 0xd9c9a7, 0xbd9371, 0xd9c9a7, 0xf2f2d5],
  },
  blue: {
    probabilityWeight: 1,
    radiusRange: [12.5, 14],
    possibleRingCounts: makeDist([
      [0, 1],
      [1, 2],
      [2, 2],
      [3, 1],
    ]),
    possibleRingTypes: makeDist([
      ['icy', 3],
      ['metallic', 3],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makeDist([
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 3],
      [4, 5],
      [5, 3],
      [6, 1],
    ]),
    stretchFactorRange: [5, 10],
    icecapFactorRange: [0.75, 0.85],
    colorThresholds: [-0.1, 0.05, 0.2, 0.35, 0.5],
    colors: [0x3c76b5, 0x4e7fbf, 0x346bb3, 0x4289b3, 0x2b50b5, 0x6e9ecb],
  },
  rocky: {
    probabilityWeight: 1,
    radiusRange: [8, 9.5],
    possibleRingCounts: makeDist([
      [0, 5],
      [1, 3],
      [2, 1],
    ]),
    possibleRingTypes: makeDist([
      ['icy', 1],
      ['metallic', 1],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makeDist([
      [0, 3],
      [1, 10],
      [2, 4],
      [3, 1],
    ]),
    stretchFactorRange: [0, 0],
    icecapFactorRange: [0, 1],
    colorThresholds: [-0.3, -0.05, 0.15, 0.3, 0.4],
    colors: [0x5c4326, 0x6b543a, 0x8c6d49, 0x6b543a, 0x5c4326, 0xa8b3b5],
  },
  icy: {
    probabilityWeight: 1,
    radiusRange: [8, 9.5],
    possibleRingCounts: makeDist([
      [0, 5],
      [1, 3],
      [2, 1],
    ]),
    possibleRingTypes: makeDist([
      ['icy', 1],
      ['metallic', 1],
      ['dusty', 1],
    ]),
    possibleMoonCounts: makeDist([
      [0, 3],
      [1, 10],
      [2, 4],
      [3, 1],
    ]),
    stretchFactorRange: [0, 0],
    icecapFactorRange: [0, 1.5],
    colorThresholds: [-0.1, -0.0, 0.1, 0.3, 0.4],
    colors: [0xd8e6e8, 0xcadde0, 0xbcced1, 0xcadde0, 0xd8e6e8, 0xe6eeef],
  },
  proto: {
    probabilityWeight: 1,
    radiusRange: [6.5, 8],
    possibleRingCounts: makeDist([
      [0, 2],
      [1, 1],
      [2, 1],
    ]),
    possibleRingTypes: makeDist([
      ['metallic', 2],
      ['dusty', 3],
    ]),
    possibleMoonCounts: makeDist([
      [0, 2],
      [1, 5],
      [2, 1],
    ]),
    stretchFactorRange: [0, 0],
    icecapFactorRange: [0, 0],
    colorThresholds: [-0.3, -0.19, 0.09, 0.2, 0.4],
    colors: [0xd14920, 0x3c231b, 0x0e0a0a, 0x3c231b, 0xd14920, 0x0e0a0a],
  },
}

const possiblePlanetTypes = makeDist(Object.entries(planetTypes).map(([k, v]) => [k, v.probabilityWeight]))

// Rings

const ringTypes = {
  icy: {
    colorSet: [0xbee8ed, 0x62b9d9],
  },
  metallic: {
    colorSet: [0x8c7a65, 0x7a4751],
  },
  dusty: {
    colorSet: [0xe8963f, 0xa14f1d],
  },
}

for (const ringType of Object.values(ringTypes)) {
  ringType.materialSet = ringType.colorSet.map(
    (x) =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(x),
      })
  )
}

// Moons

const possibleMoonColors = [
  ...Array(3).fill(0x7a4751),
  ...Array(3).fill(0xa69990),
  ...Array(3).fill(0xbee8ed),
  ...Array(3).fill(0x8c7a65),
  ...planetTypes.earth.colors,
]

const possibleMoonMaterials = possibleMoonColors.map(
  (x) =>
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(x),
    })
)

// ================== GLOBAL PARAMETERS

let globalParameters

function initGlobalParameters() {
  // Camera
  const cameraDof = 25
  const cameraDistance = 225
  // Planet
  const currentPlanetType = globalParameters?.planet?.type
  const planetType = randFromArray(possiblePlanetTypes.filter((x) => x !== currentPlanetType))
  const planetRadius = randFloat(...planetTypes[planetType].radiusRange)
  const planetStretchFactor = randFloat(...planetTypes[planetType].stretchFactorRange)
  const planetIcecapFactor = randFloat(...planetTypes[planetType].icecapFactorRange)
  const planetColorThresholds = planetTypes[planetType].colorThresholds
  const planetColors = planetTypes[planetType].colors
  const [planetPhi, planetTheta, planetRotationAxis] = generatePlanetAxis()
  // Rings
  const ringCount = randFromArray(planetTypes[planetType].possibleRingCounts)
  const radHelper = (x) => (x * x) / 2 + 4.5 * x // 0, 4, 9, 15, 22 ...
  const ringRadOffset = Math.min(4, planetRadius) + 1.25 * planetRadius
  const rings = Array(ringCount)
    .fill()
    .map((_, i) => {
      const ringType = randFromArray(planetTypes[planetType].possibleRingTypes)
      const ringMaterialSet = ringTypes[ringType].materialSet
      const ringInnerRad = radHelper(i) + ringRadOffset + i
      const ringOuterRad = radHelper(i + 1) + ringRadOffset + i
      return {
        type: ringType,
        materialSet: ringMaterialSet,
        bitCount: Math.floor((ringOuterRad * ringOuterRad - ringInnerRad * ringInnerRad) / 2),
        minBitSize: 0.25,
        maxBitSize: 0.75,
        innerRad: ringInnerRad,
        outerRad: ringOuterRad,
      }
    })
  // Moons
  const moonCount = randFromArray(planetTypes[planetType].possibleMoonCounts)
  const moons = Array(moonCount).fill()
  // Save
  globalParameters = {
    camera: {
      dof: cameraDof,
      distance: cameraDistance,
    },
    planet: {
      type: planetType,
      radius: planetRadius,
      phi: planetPhi,
      theta: planetTheta,
      axis: planetRotationAxis,
      stretchFactor: planetStretchFactor,
      icecapFactor: planetIcecapFactor,
      colorThresholds: planetColorThresholds,
      colors: planetColors,
    },
    rings: rings,
    moons: moons,
    starField: {
      starCount: 2000,
      boundingBoxRadius: 5000,
      noGoZoneRadius: 1.5 * cameraDistance,
      colors: [
        0xf0e5bb, // yellow
        0xfcedb3, // yellow
        0xfabb93, // orange
        0xd16a45, // orange-red
        0xcf5a4a, // red
        0x5992e3, // blue
        0xc7deff, // white-blue
        0xf0bbde, // pink
        ...Array(12).fill(0xffffff),
      ],
    },
  }
  // console.log(globalParameters)
}

// ================== SHADERS

const getPlanetShaderParameters = (radius, axis, stretchFactor, icecapFactor, thresholds, colors) => ({
  uniforms: {
    scale: { type: 'f', value: radius / 10 },
    seed: { type: 'f', value: new Date().getTime() % 10000 },
    planetAxis: { type: 'f', value: axis },
    stretchFactor: { type: 'f', value: stretchFactor },
    icecapFactor: { type: 'f', value: icecapFactor },
    color0: { type: 'vec3', value: new THREE.Color(colors[0]) },
    threshold1: { type: 'f', value: thresholds[0] },
    color1: { type: 'vec3', value: new THREE.Color(colors[1]) },
    threshold2: { type: 'f', value: thresholds[1] },
    color2: { type: 'vec3', value: new THREE.Color(colors[2]) },
    threshold3: { type: 'f', value: thresholds[2] },
    color3: { type: 'vec3', value: new THREE.Color(colors[3]) },
    threshold4: { type: 'f', value: thresholds[3] },
    color4: { type: 'vec3', value: new THREE.Color(colors[4]) },
    threshold5: { type: 'f', value: thresholds[4] },
    color5: { type: 'vec3', value: new THREE.Color(colors[5]) },
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
})

const starShaderParameters = {
  uniforms: {
    size: { type: 'f', value: pixelSize > 1 ? 1 : 2 },
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

const pixelScreenShaderParameters = {
  depthWrite: false,
  vertexShader: `
    varying vec2 vUv; 
    void main() {
      vUv = uv; 
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    void main() {
      gl_FragColor = texture2D( tDiffuse, vUv );
    }
  `,
}

// ================== FIRST SCENE FUNCTIONS

let firstScene, firstCamera
let ambientLight

function initFirstScene(iw, ih) {
  // Camera
  if (!firstCamera) {
    firstCamera = new THREE.PerspectiveCamera(
      globalParameters.camera.dof,
      iw / ih,
      0.1,
      2 * globalParameters.camera.distance + 2 * globalParameters.starField.boundingBoxRadius + 1000
    )
    firstCamera.position.setZ(globalParameters.camera.distance)
  }
  // Scene
  if (!firstScene) {
    firstScene = new THREE.Scene()
  }
}

function onWindowResizeFirstScene(iw, ih) {
  // Camera
  firstCamera.aspect = iw / ih
  firstCamera.updateProjectionMatrix()
}

function populateFirstScene() {
  // Planet
  if (planetMesh) deletePlanet()
  spawnPlanet(globalParameters.planet)
  // Rings
  if (ringsData.length) deleteRings()
  spawnRings(globalParameters.planet, globalParameters.rings)
  // Moons
  if (moonsData.length) deleteMoons()
  spawnMoons(globalParameters.moons)
  // Stars
  if (!starsMesh) {
    starsMesh = spawnStars(globalParameters.starField)
  }
  // Lights
  if (!ambientLight) {
    ambientLight = new THREE.AmbientLight(0xffffff)
    firstScene.add(ambientLight)
  }
}

// Planet

let planetMesh

function spawnPlanet({ type, radius, axis, stretchFactor, icecapFactor, colorThresholds, colors }) {
  const geometry = new THREE.SphereGeometry(radius, radius * 5, radius * 5)
  const material = new THREE.ShaderMaterial(
    getPlanetShaderParameters(radius, axis, stretchFactor, icecapFactor, colorThresholds, colors)
  )
  planetMesh = new THREE.Mesh(geometry, material)
  firstScene.add(planetMesh)
}

function deletePlanet() {
  firstScene.remove(planetMesh)
  planetMesh.geometry.dispose()
  planetMesh.material.dispose()
}

// Rings

let ringsData = []

function spawnRings(globalParametersPlanet, globalParametersRings) {
  ringsData = globalParametersRings.map((x) => spawnRingBits(globalParametersPlanet, x))
}

function spawnRingBits(
  { phi, theta, axis },
  { materialSet, bitCount, minBitSize, maxBitSize, innerRad, outerRad }
) {
  if (!bitCount) {
    return []
  }
  const ringDatum = Array(bitCount).fill()
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
    firstScene.add(ringBitMesh)
    // Save data
    ringDatum[i] = { speed, ringBitMesh }
  }
  return ringDatum
}

function deleteRings() {
  ringsData.forEach((ringDatum) => {
    ringDatum.forEach((ringBitDatum) => {
      firstScene.remove(ringBitDatum.ringBitMesh)
      ringBitDatum.ringBitMesh.geometry.dispose()
    })
  })
  ringsData = []
}

// Moons

let moonsData = []

function spawnMoons(globalParametersMoons) {
  moonsData = globalParametersMoons.map(() => spawnMoon())
}

function spawnMoon() {
  // Geometry
  const moonSize = randFloatTriangular(0.5, 3)
  const geometry = new THREE.SphereGeometry(moonSize, 10, 10)
  // Material
  const material = randFromArray(possibleMoonMaterials)
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
  firstScene.add(moonMesh)
  return { radius, axis, speed, moonMesh }
}

function deleteMoons() {
  moonsData.forEach((moonDatum) => {
    firstScene.remove(moonDatum.moonMesh)
    moonDatum.moonMesh.geometry.dispose()
  })
  moonsData = []
}

// Stars

let starsMesh
let starsMaterial = new THREE.ShaderMaterial(starShaderParameters)

function spawnStars({ starCount, boundingBoxRadius, noGoZoneRadius, colors }) {
  // Geometry
  const geometry = new THREE.BufferGeometry()
  const positionArray = Array(starCount * 3).fill()
  const colorArray = Array(starCount * 3).fill()
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
  firstScene.add(starsMesh)
  return starsMesh
}

function deleteStars() {
  firstScene.remove(starsMesh)
  starsMesh.geometry.dispose()
}

function updateFirstScene(deltaTime) {
  const deltaTimeInSeconds = deltaTime / 1000
  const planetRotationAxis = globalParameters.planet.axis
  planetMesh.rotateOnAxis(planetRotationAxis, deltaTimeInSeconds * 0.15)
  ringsData.forEach((ringDatum) => {
    ringDatum.forEach((ringBitDatum) => {
      const ang = deltaTimeInSeconds * ringBitDatum.speed
      ringBitDatum.ringBitMesh.position.applyAxisAngle(planetRotationAxis, ang) // Rotate the position
      ringBitDatum.ringBitMesh.rotateOnAxis(planetRotationAxis, ang) // Rotate the object
    })
  })
  moonsData.forEach((moonDatum) => {
    const ang = deltaTimeInSeconds * moonDatum.speed
    moonDatum.moonMesh.position.applyAxisAngle(moonDatum.axis, ang) // Rotate the position
    moonDatum.moonMesh.rotateOnAxis(moonDatum.axis, ang) // Rotate the object
  })
}

function generatePlanetAxis() {
  const phi = THREE.MathUtils.randFloatSpread(Math.PI / 2)
  const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2)
  return [
    phi,
    theta,
    new THREE.Vector3(
      Math.sin(theta) * Math.sin(phi),
      Math.cos(phi),
      Math.cos(theta) * Math.sin(phi)
    ).normalize(),
  ]
}

// ================== SECOND SCENE FUNCTIONS

let secondScene, secondCamera
let pixelRenderTarget // render the first scene to this
let screenMaterial // this has the above texture
let screen // this has the above material

function initSecondScene(iw, ih) {
  // Camera
  if (!secondCamera) {
    secondCamera = new THREE.OrthographicCamera(iw / -2, iw / 2, ih / 2, ih / -2, 0, 2)
    secondCamera.position.setZ(0)
  }
  // Scene
  if (!secondScene) {
    secondScene = new THREE.Scene()
  }
}

function onWindowResizeSecondScene(iw, ih) {
  // Camera
  secondCamera.left = iw / -2
  secondCamera.right = iw / 2
  secondCamera.top = ih / 2
  secondCamera.bottom = ih / -2
  secondCamera.updateProjectionMatrix()
  // Pixelation texture
  pixelRenderTarget.setSize(iw / pixelSize, ih / pixelSize)
  // Pixelation screen
  screen.scale.set(iw, ih, 0)
}

function populateSecondScene(iw, ih) {
  // Pixelation texture
  if (!pixelRenderTarget) {
    pixelRenderTarget = new THREE.WebGLRenderTarget(iw / pixelSize, ih / pixelSize, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBFormat,
    })
  }
  // Pixelation screen material
  if (!screenMaterial) {
    screenMaterial = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: pixelRenderTarget.texture } },
      ...pixelScreenShaderParameters,
    })
  }
  // Pixelation screen
  if (!screen) {
    screen = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), screenMaterial)
    screen.scale.set(iw, ih, 0) // use scale for easy resizing
    screen.position.z = -1
    secondScene.add(screen)
  }
}

// ================== MAIN

let renderer
let prevTime = 0
let nextAnimationReq

// const container = document.getElementById('planetarium-container')
// const canvas = document.getElementById('planetarium')
// window.onload = firstSet

let container, canvas
export function firstSet(container, canvas) {
  container = document.getElementById('planetarium-container')
  canvas = document.getElementById('planetarium')
  init(container, canvas)
  requestAnimationFrame(animate)
  // Add resize listener
  // addOnWindowResizeListener()
  // Add reset capability
  // addResetListener()
  // addAutoResetInterval()
}

function resetAll() {
  cancelAnimationFrame(nextAnimationReq)
  init()
  requestAnimationFrame(animate)
}

function init(container, canvas) {
  // Get screen size
  const iw = container.clientWidth
  const ih = container.clientHeight
  // Initialize global parameters
  initGlobalParameters()
  // Initialize scenes
  initFirstScene(iw, ih)
  initSecondScene(iw, ih)
  // Populate scenes
  populateFirstScene(iw, ih)
  populateSecondScene(iw, ih)
  // Renderer
  if (!renderer) {
    renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(clearColor)
    renderer.setSize(iw, ih)
    renderer.autoClear = false
  }
}

function animate(time) {
  nextAnimationReq = requestAnimationFrame(animate)
  render(time)
}

function render(time) {
  const deltaTime = time - prevTime
  prevTime = time
  updateFirstScene(deltaTime)
  // Render first scene to texture
  renderer.setRenderTarget(pixelRenderTarget)
  renderer.clear()
  renderer.render(firstScene, firstCamera)
  // Render second scene to screen
  renderer.setRenderTarget(null)
  renderer.clear()
  renderer.render(secondScene, secondCamera)
}

// ================== RESET HANDLING

const resetData = {
  allowReset: false,
  resetHandle: undefined,
  autoResetInterval: autoResetInterval,
}

function addResetListener() {
  resetData.allowReset = true

  function doADebouncedResetAll() {
    if (resetData.allowReset) {
      resetData.allowReset = false
      resetAll()
      if (resetData.resetHandle !== undefined) {
        clearInterval(resetData.resetHandle)
      }
      resetData.resetHandle = setInterval(resetAll, resetData.autoResetInterval)
      // Set timeout for allowing reset
      setTimeout(() => {
        resetData.allowReset = true
      }, 50)
    }
  }

  // Touch
  canvas.addEventListener('touchstart', () => canvas.classList.add('active'), { passive: true })
  canvas.addEventListener('touchcancel', () => canvas.classList.remove('active'), { passive: true })
  canvas.addEventListener(
    'touchend',
    (e) => {
      e.preventDefault() // prevent click from happening next
      doADebouncedResetAll()
      canvas.classList.remove('active')
    },
    { passive: true }
  )

  // Mouse
  canvas.addEventListener(
    'click',
    () => {
      doADebouncedResetAll()
      canvas.blur()
    },
    { passive: true }
  )

  // Keyboard
  canvas.addEventListener(
    'keydown',
    (e) => {
      if (e.key !== 'Enter' && e.key !== 'r') {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      canvas.classList.add('active')
    },
    { passive: true }
  )
  canvas.addEventListener(
    'keyup',
    (e) => {
      if (e.key !== 'Enter' && e.key !== 'r') {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      doADebouncedResetAll()
      canvas.classList.remove('active')
    },
    { passive: true }
  )
}

function addAutoResetInterval() {
  if (resetData.resetHandle === undefined) {
    resetData.resetHandle = setInterval(resetAll, resetData.autoResetInterval)
  }
}

// ================== RESIZE HANDLING

const resizeData = {
  allowResize: false,
  prevIw: 0,
  prevIh: 0,
}

function addOnWindowResizeListener() {
  resizeData.allowResize = true
  window.addEventListener('resize', onWindowResize, { passive: true })
}

function onWindowResize(container) {
  // Get screen size
  const iw = container.clientWidth
  const ih = container.clientHeight
  // Perform resize if needed
  if (resizeData.allowResize && (iw !== resizeData.prevIw || ih !== resizeData.prevIh)) {
    // console.log('Resizing')
    resizeData.allowResize = false
    resizeData.prevIw = iw
    resizeData.prevIh = ih
    // Update scenes
    onWindowResizeFirstScene(iw, ih)
    onWindowResizeSecondScene(iw, ih)
    // Update renderer
    renderer.setSize(iw, ih)
    // Set timeout for allowing resize
    setTimeout(() => {
      resizeData.allowResize = true
    }, 10)
  }
}

// ================== UTIL

function randFromArray(arr) {
  return arr[(Math.random() * arr.length) >> 0]
}

function randFloat(low, high) {
  return THREE.MathUtils.randFloat(low, high)
}

function randFloatTriangular(low, high) {
  return randFloat(low / 2, high / 2) + randFloat(low / 2, high / 2)
}

function makeDist(arr) {
  const res = []
  for (const [val, qty] of arr) {
    res.push(...Array(qty).fill(val))
  }
  return res
}

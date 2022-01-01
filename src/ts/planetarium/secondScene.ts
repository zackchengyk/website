import * as THREE from 'three'
import { InstanceParametersType } from './instanceParameters'
import { pixelSize } from './main'

export type SecondSceneHandlesType = {
  camera: THREE.OrthographicCamera
  scene: THREE.Scene
  pixelRenderTarget: THREE.WebGLRenderTarget // render the first scene to this
  screenMaterial: THREE.ShaderMaterial // this has the above texture
  screen: THREE.Mesh // this has the above material
}

// ======================================================================== Init

export function initSecondScene(
  iw: number,
  ih: number,
  instanceParameters: InstanceParametersType
): SecondSceneHandlesType {
  // Camera
  const camera = new THREE.OrthographicCamera(iw / -2, iw / 2, ih / 2, ih / -2, 0, 2)
  camera.position.setZ(0)

  // Scene
  const scene = new THREE.Scene()
  scene.background = null

  // Render target
  const pixelRenderTarget = new THREE.WebGLRenderTarget(iw / pixelSize, ih / pixelSize, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
  })

  // Screen material
  const screenMaterial = new THREE.ShaderMaterial({
    uniforms: { tDiffuse: { value: pixelRenderTarget.texture } },
    ...getPixelScreenShaderParameters(),
  })

  // Screen
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), screenMaterial)
  screen.scale.set(iw, ih, 0) // use scale for easy resizing
  screen.position.z = -1
  scene.add(screen)

  return { camera, scene, pixelRenderTarget, screenMaterial, screen }
}

// ======================================================================== Populate

export function populateSecondScene(
  iw: number,
  ih: number,
  instanceParameters: InstanceParametersType,
  secondSceneHandles: SecondSceneHandlesType
) {
  // Do nothing!
}

// ======================================================================== Update

export function updateSecondScene(
  deltaTime: number,
  iw: number,
  ih: number,
  instanceParameters: InstanceParametersType,
  secondSceneHandles: SecondSceneHandlesType
) {
  // Update camera
  secondSceneHandles.camera.left = iw / -2
  secondSceneHandles.camera.right = iw / 2
  secondSceneHandles.camera.top = ih / 2
  secondSceneHandles.camera.bottom = ih / -2
  secondSceneHandles.camera.updateProjectionMatrix()

  // Update render target
  secondSceneHandles.pixelRenderTarget.setSize(iw / pixelSize, ih / pixelSize)

  // Update screen
  secondSceneHandles.screen.scale.set(iw, ih, 0)
}

// ======================================================================== Helpers

function getPixelScreenShaderParameters(): THREE.ShaderMaterialParameters {
  return {
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
}

import * as THREE from 'three'

const clearColor = 0x191108

const autoResetInterval = 15000 // 3428.6 // 140 BPM

// ================== SHADERS

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

// ================== FIRST SCENE FUNCTIONS

// ================== MAIN

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

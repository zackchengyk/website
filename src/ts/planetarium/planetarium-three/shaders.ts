import * as THREE from 'three'
import crossTextureSrc from '../../../img/crossTexture.png'
import { InstanceParametersType } from './instanceParameters'
import { pixelSize } from './main'

const crossTexture = new THREE.TextureLoader().load(crossTextureSrc)
crossTexture.minFilter = THREE.NearestFilter
crossTexture.magFilter = THREE.NearestFilter

// ======================================================================== Shaders

/* export const trailMaterial = new THREE.ShaderMaterial({
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

export const ringShaderMaterial = new THREE.ShaderMaterial({
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
})

/* export const starShaderParameters = new THREE.ShaderMaterial({
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
}) */

export function getPlanetShaderParameters(
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

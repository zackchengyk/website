import imageSrc from './maps-image-small.png'
import recording1WebmSrc from './maps-recording-1-small.webm'
import recording1Mp4Src from './maps-recording-1-small.mp4'
import recording2WebmSrc from './maps-recording-2-small.webm'
import recording2Mp4Src from './maps-recording-2-small.mp4'
import recording3WebmSrc from './maps-recording-3-small.webm'
import recording3Mp4Src from './maps-recording-3-small.mp4'

export default {
  image: { aspect: { x: 1144, y: 708 }, src: imageSrc },
  recording1: { aspect: { x: 384, y: 238 }, webmSrc: recording1WebmSrc, mp4Src: recording1Mp4Src },
  recording2: { aspect: { x: 384, y: 238 }, webmSrc: recording2WebmSrc, mp4Src: recording2Mp4Src },
  recording3: { aspect: { x: 384, y: 238 }, webmSrc: recording3WebmSrc, mp4Src: recording3Mp4Src },
}

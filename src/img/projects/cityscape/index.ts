import image1Src from './cityscape-image-1-small.png'
import image2Src from './cityscape-image-2-small.png'
import image3Src from './cityscape-image-3-small.png'
import recordingWebmSrc from './cityscape-recording-small.webm'
import recordingMp4Src from './cityscape-recording-small.mp4'
import recordingPosterSrc from './cityscape-recording-small-poster.png'

export default {
  recording: {
    aspect: { x: 1027, y: 698 },
    webmSrc: recordingWebmSrc,
    mp4Src: recordingMp4Src,
    posterSrc: recordingPosterSrc,
  },
  image1: { aspect: { x: 500, y: 339 }, src: image1Src },
  image2: { aspect: { x: 500, y: 339 }, src: image2Src },
  image3: { aspect: { x: 500, y: 339 }, src: image3Src },
}

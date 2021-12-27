import PixelStarField from './PixelStarField'
import { XY } from './types'

const pixelSize = 4

type PixelSVGProps = {
  containerDimensions: XY
}

function PixelSVG({ containerDimensions }: PixelSVGProps) {
  const { x: xDim, y: yDim } = containerDimensions

  const pixelDimensions: XY = { x: Math.floor(xDim / pixelSize), y: Math.floor(yDim / pixelSize) }

  return (
    <svg
      id="PixelSVG"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${pixelDimensions.x} ${pixelDimensions.y}`}
      style={{
        position: 'fixed',
        inset: '0',
        height: yDim + 'px',
        width: xDim + 'px',
      }}>
      <PixelStarField pixelDimensions={pixelDimensions} />
    </svg>
  )
  // const svgFragment: any[] = []
  // let xOffsetAccumulator = 0
  // const baseXOffset = pixDimensions.x / 2 - textX / 2
  // const baseYOffset = pixDimensions.y / 2 - textY / 2
  // for (let i = 0; i < letterArray.length; i++) {
  //   const letter = letterArray[i]
  //   svgFragment.push(
  //     <PixelLetterSVGFragmentMemoized
  //       key={i}
  //       data={letter.data}
  //       // Subsequent information no longer necessary once it becomes text
  //       xyOffset={{ x: xOffsetAccumulator + baseXOffset, y: baseYOffset }}
  //       pixDimensions={pixDimensions}
  //     />
  //   )
  //   xOffsetAccumulator += letter.width + 1
  // }

  // function onClick() {
  //   setClassName('coalesce')
  //   setTimeout(() => {
  //     setClassName('text')
  //   }, timing.starShiftDuration * 1000)
  // }
}

export default PixelSVG

import { useState, useEffect } from 'react'
import { XY } from './common'

const terminateIntervalDelay = 50

function getWindowDimensions(): XY {
  const hw = { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight }
  return hw
}

export function useWindowDimensions(): XY {
  const [windowDimensions, setWindowDimensions] = useState<XY>(getWindowDimensions)

  useEffect(() => {
    let nextFrameReq = 0
    let handle = 0

    // Function to update windowDimensions with animation frames
    function updateSizeViaRAF() {
      nextFrameReq = requestAnimationFrame(updateSizeViaRAF)

      // Update windowDimensions if it changed
      const hw = getWindowDimensions()
      if (hw.x === windowDimensions.x && hw.y === windowDimensions.y) {
        return
      }
      setWindowDimensions(hw)
    }

    function resizeHandler() {
      // Start throttled windowDimensions-updating if not already started
      if (!nextFrameReq) {
        nextFrameReq = requestAnimationFrame(updateSizeViaRAF)
      }

      // Terminate throttled windowDimensions-updating after some time of no resizing
      clearTimeout(handle)
      handle = setTimeout(
        () => (cancelAnimationFrame(nextFrameReq), (nextFrameReq = 0)),
        terminateIntervalDelay
      )
    }

    // Add event listener
    window.addEventListener('resize', resizeHandler, { passive: true })
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return windowDimensions
}

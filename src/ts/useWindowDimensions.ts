import { useState, useEffect } from 'react'
import { XY } from './common'

const throttleDelay = 100

function getWindowDimensions(): XY {
  const hw = { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight }
  return hw
}

export function useWindowDimensions(): XY {
  const [windowDimensions, setWindowDimensions] = useState<XY>(getWindowDimensions)

  useEffect(() => {
    // Attach *passive* scroll listener to self
    let waiting = false
    function resizeHandler() {
      // Throttle
      if (waiting) return
      waiting = true
      setTimeout(() => (waiting = false), throttleDelay)
      // Set window dimensions
      const hw = getWindowDimensions()
      if (hw.x === windowDimensions.x && hw.y === windowDimensions.y) {
        return
      }
      setWindowDimensions(hw)
    }

    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return windowDimensions
}

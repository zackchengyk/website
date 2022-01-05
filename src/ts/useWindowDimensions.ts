import { useState, useEffect } from 'react'
import { XY } from './common'

const debounceDelay = 50

function getWindowDimensions(): XY {
  const hw = { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight }
  return hw
}

export function useWindowDimensions(): XY {
  const [windowDimensions, setWindowDimensions] = useState<XY>(getWindowDimensions)

  useEffect(() => {
    let handle = 0
    function resizeHandler() {
      // Debounce
      clearTimeout(handle)
      handle = setTimeout(() => {
        // Set window dimensions
        const hw = getWindowDimensions()
        if (hw.x === windowDimensions.x && hw.y === windowDimensions.y) {
          return
        }
        setWindowDimensions(hw)
      }, debounceDelay)
    }

    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return windowDimensions
}

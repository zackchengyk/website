import { useState, useEffect } from 'react'
import { XY } from './common'

const debounceDelay = 10

function getWindowDimensions(): XY {
  const hw = { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight }
  return hw
}

export function useWindowDimensions(): XY {
  const [windowDimensions, setWindowDimensions] = useState<XY>(getWindowDimensions)

  useEffect(() => {
    let isWaiting: number = 0

    const debouncedHandleResize = () => {
      clearTimeout(isWaiting)
      isWaiting = setTimeout(() => {
        isWaiting = 0
        const hw = getWindowDimensions()
        if (hw.x === windowDimensions.x && hw.y === windowDimensions.y) {
          return
        }
        setWindowDimensions(hw)
      }, debounceDelay)
    }

    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [])

  return windowDimensions
}

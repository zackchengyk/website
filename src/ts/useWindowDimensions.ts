import { useState, useEffect } from 'react'

const debounceDelay = 10

export type HWDimensions = {
  height: number
  width: number
}

function getWindowDimensions(): HWDimensions {
  return { height: window.innerHeight, width: window.innerWidth }
}

export function useWindowDimensions(): HWDimensions {
  const [windowDimensions, setWindowDimensions] = useState<HWDimensions>(getWindowDimensions)

  useEffect(() => {
    let isWaiting: number = 0

    const debouncedHandleResize = () => {
      clearTimeout(isWaiting)
      isWaiting = setTimeout(() => {
        isWaiting = 0
        const hw = getWindowDimensions()
        if (hw.height === windowDimensions.height && hw.width === windowDimensions.width) {
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

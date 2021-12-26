import { useState, useEffect } from 'react'

const debounceDelay = 100

function getWindowDimensions() {
  return { height: window.innerHeight, width: window.innerWidth }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions)

  useEffect(() => {
    let isWaiting: number = 0

    const debouncedHandleResize = () => {
      if (isWaiting) {
        return
      }

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

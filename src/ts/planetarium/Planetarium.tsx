import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import { main, PlanetariumType, resetAll } from './planetarium-three/main'
import PlanetariumBackground from './PlanetariumBackground'
import '../../css/planetarium/Planetarium.scss'

function Planetarium() {
  const fullWindowElement = useRef<any>()
  const containerElement = useRef<any>()
  const canvasElement = useRef<any>()

  const [clickHandler, setClickHandler] = useState<any>()
  const [mouseMoveHandler, setMouseMoveHandler] = useState<any>()
  const [mouseLeaveHandler, setMouseLeaveHandler] = useState<any>()

  const planetarium = useRef<PlanetariumType>()

  useEffect(() => {
    // console.warn('Caution! This should run exactly once.')

    // Create the instance
    planetarium.current = main(containerElement.current!, canvasElement.current!)

    // Create a reset function
    function resetFunction() {
      planetarium.current = resetAll(planetarium.current!)
    }

    // Create a function to set the mouse position on mouse move
    const throttleDelay = 1000 / 60
    let waiting = false
    function tempMouseMoveHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      // Throttle
      if (waiting) return
      waiting = true
      setTimeout(() => (waiting = false), throttleDelay)
      // Get normalized mouse position
      const rect = fullWindowElement.current!.getBoundingClientRect()
      const minDim = Math.min(rect.width, rect.height)
      planetarium.current!.normMousePos = {
        x: (e.clientX - rect.left - rect.width / 2) / minDim,
        y: (e.clientY - rect.top - rect.height / 2) / minDim,
      }
    }

    // Create a function to unset the mouse position and de-focus on mouse leave
    function tempMouseLeaveHandler() {
      planetarium.current!.normMousePos = { x: 0, y: 0 }
      fullWindowElement.current?.blur()
    }

    // Remember that setState can take a function... be careful not to call it
    setClickHandler(() => resetFunction)
    setMouseMoveHandler(() => tempMouseMoveHandler)
    setMouseLeaveHandler(() => tempMouseLeaveHandler)
  }, [])

  return (
    <div
      id="planetarium-full-window"
      ref={fullWindowElement}
      onClick={clickHandler}
      onMouseMove={mouseMoveHandler}
      onMouseLeave={mouseLeaveHandler}
      tabIndex={0}>
      <div id="planetarium-container" ref={containerElement}>
        <canvas id="planetarium" ref={canvasElement} />
      </div>
      <PlanetariumBackground />
    </div>
  )
}

export default React.memo(Planetarium, () => true)

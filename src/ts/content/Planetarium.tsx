import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import { main, PlanetariumType, resetAll } from '../planetarium/main'
import PlanetariumBackground from './PlanetariumBackground'
import '../../css/content/Planetarium.scss'

function Planetarium() {
  const fullWindowElement = useRef(null)
  const containerElement = useRef(null)
  const canvasElement = useRef(null)

  const [resetFunction, setResetFunction] = useState<any>()

  const planetarium = useRef<PlanetariumType>()

  useEffect(() => {
    console.warn('Caution! This should run exactly once.')

    // Create the instance
    planetarium.current = main(containerElement.current!, canvasElement.current!)

    // Create a reset function
    function tempResetFunction() {
      planetarium.current = resetAll(planetarium.current!)
    }

    // Remember that setState can take a function... be careful not to call it
    setResetFunction(() => tempResetFunction)
  }, [])

  return (
    <div
      id="planetarium-full-window"
      ref={fullWindowElement}
      onClick={resetFunction}
      onMouseLeave={() => fullWindowElement.current?.blur()}
      tabIndex={0}>
      <div id="planetarium-container" ref={containerElement}>
        <canvas id="planetarium" ref={canvasElement} />
      </div>
      <PlanetariumBackground />
    </div>
  )
}

export default React.memo(Planetarium, () => true)

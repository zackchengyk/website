import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import '../../css/content/Planetarium.scss'
import { main, PlanetariumType, resetAll } from '../planetarium/main'

function Planetarium() {
  const containerElement = useRef(null)
  const canvasElement = useRef(null)

  // const resetData = useRef({
  //   allowReset: false,
  //   resetHandle: undefined,
  //   autoResetInterval: autoResetInterval,
  // })
  const [resetFunction, setResetFunction] = useState<any>()

  const planetarium = useRef<PlanetariumType>()

  useEffect(() => {
    console.warn("WARNING! THIS SHOULDN'T HAPPEN MORE THAN ONCE")
    planetarium.current = main(containerElement.current!, canvasElement.current!)

    // Create a reset function
    function tempResetFunction() {
      planetarium.current = resetAll(planetarium.current!)
    }

    // Remember that setState can take a function... be careful not to call it
    setResetFunction(() => tempResetFunction)
  }, [])

  return (
    <div id="planetarium-container" ref={containerElement}>
      <canvas id="planetarium" onClick={resetFunction} ref={canvasElement} tabIndex={0} />
    </div>
  )
}

export default React.memo(Planetarium, () => true)

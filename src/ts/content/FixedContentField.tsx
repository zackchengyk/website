import { XY } from '../common'
import '../../css/content.scss'
import ScrollingContentField from './ScrollingContentField'
import { useEffect } from 'react'
import { firstSet } from '../planetarium.js'

type FixedContentFieldProps = {
  className: string
}

function FixedContentField({ className }: FixedContentFieldProps) {
  useEffect(() => {
    // firstSet()
  }, [])

  const style = {
    backgroundColor: '#FFEFD6',
    height: '20vh',
    width: '100vw',
    position: 'fixed',
    bottom: '0px',
  }

  return (
    <div id="fixed-content-div" className={className}>
      <div style={style}> </div>
      {/* <h2 id="subtitle">Designer, Developer, Engineer</h2>
      <ScrollingContentField /> */}
      {/* <div id="planetarium-container">
        <canvas id="planetarium" tabIndex={0} style={{ height: '100%', width: '100%' }}>
          <div id="planetarium-noscript">
            <div className="panel-body">
              Hmm... it seems your browser isn't supporting the canvas element. Otherwise, you
              <em>should</em> see a pretty cool graphic here!
            </div>
          </div>
        </canvas>
        <div id="planetarium-shadow-provider"></div> */}
      {/* </div> */}
    </div>
  )
}

export default FixedContentField

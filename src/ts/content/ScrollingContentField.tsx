type ScrollingContentFieldProps = {}

function ScrollingContentField({}: ScrollingContentFieldProps) {
  return (
    <div id="scrolling-content-div">
      {[...Array(10).keys()].map((e) => {
        const style = {
          '--animation-delay': e / 8 + 's',
        } as React.CSSProperties
        return (
          <div className="panel" style={style}>
            {e}
          </div>
        )
      })}
    </div>
  )
}

export default ScrollingContentField

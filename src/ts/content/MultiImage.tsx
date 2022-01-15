type MultiImageProps = {
  children?: React.ReactNode
  style?: React.CSSProperties
  gridTemplateAreas: string
}

function MultiImage({ children, style, gridTemplateAreas }: MultiImageProps) {
  return (
    <div className="multi-image" style={{ ...style, gridTemplateAreas }}>
      {children}
    </div>
  )
}

export default MultiImage

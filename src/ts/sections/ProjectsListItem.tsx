import React, { useEffect, useRef, useState } from 'react'
import { stringToId, XY } from '../common'

export type ProjectsListItemContentProps = {
  projectName: string
  imgChildren?: React.ReactNode
  projectTitle?: React.ReactNode
  projectSubtitle?: React.ReactNode
  projectBody?: React.ReactNode
}
type ProjectsListItemProps = {
  sleeved: string
  sleevedStyle: React.CSSProperties
  evenOdd: string
  isOpen: boolean
  toggleIsOpen: () => void
  windowDimensions: XY
} & ProjectsListItemContentProps

function ProjectsListItem({
  projectName,
  imgChildren,
  projectTitle,
  projectSubtitle,
  projectBody,
  sleeved,
  sleevedStyle,
  evenOdd,
  isOpen,
  toggleIsOpen,
  windowDimensions,
}: ProjectsListItemProps) {
  const contentRef = useRef<any>()
  const [style, setStyle] = useState<React.CSSProperties>({
    '--current-height': contentRef.current?.scrollHeight + 'px',
  } as React.CSSProperties)

  const id = stringToId(projectName)
  const buttonId = `projects-${id}-button`
  const contentId = `projects-${id}-content`

  useEffect(() => {
    setStyle({ '--current-height': contentRef.current?.scrollHeight + 'px' } as React.CSSProperties)
  }, [windowDimensions.x, contentRef])

  useEffect(() => {
    setStyle({ '--current-height': contentRef.current?.scrollHeight + 'px' } as React.CSSProperties)
    setTimeout(
      () => setStyle({ '--current-height': contentRef.current?.scrollHeight + 'px' } as React.CSSProperties),
      500
    )
  }, [isOpen])

  return (
    <li id={`projects-${id}`} className={'projects-li'}>
      <h3>
        <button
          id={buttonId}
          className="projects-li-button"
          onClick={toggleIsOpen}
          aria-controls={contentId}
          aria-expanded={isOpen}>
          <span className={sleeved} style={sleevedStyle}>
            {projectName}
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        aria-labelledby={buttonId}
        className={'projects-li-content ' + (isOpen ? '' : 'collapsed')}
        style={style}>
        <div ref={contentRef} className={'projects-li-content-inner ' + evenOdd}>
          <div className="projects-img-container">{imgChildren}</div>
          <div className="projects-text">
            <h4 className="title-text">{projectTitle}</h4>
            <h5 className="subtitle-text">{projectSubtitle}</h5>
            <div className="body-text">{projectBody}</div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProjectsListItem

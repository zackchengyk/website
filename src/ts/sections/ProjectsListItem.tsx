import React from 'react'
import { stringToId } from '../common'

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
  isOpen: boolean
  toggleIsOpen: () => void
} & ProjectsListItemContentProps

function ProjectsListItem({
  projectName,
  imgChildren,
  projectTitle,
  projectSubtitle,
  projectBody,
  sleeved,
  sleevedStyle,
  isOpen,
  toggleIsOpen,
}: ProjectsListItemProps) {
  const id = 'projects-' + stringToId(projectName)
  const liId = id
  const buttonId = id + '-button'
  const divId = id + '-content'

  return (
    <li id={liId} className={'projects-li'}>
      <h3>
        <button
          id={buttonId}
          className="projects-li-button"
          onClick={toggleIsOpen}
          aria-controls={divId}
          aria-expanded={isOpen}>
          <span className={sleeved} style={sleevedStyle}>
            {projectName}
          </span>
        </button>
      </h3>
      <div
        id={divId}
        aria-labelledby={buttonId}
        className={'projects-li-content ' + (isOpen ? '' : 'collapsed')}>
        <div className="projects-li-content-inner">
          <div className="projects-img">{imgChildren}</div>
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

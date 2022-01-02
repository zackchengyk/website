import { stringToId } from '../common'

export type ProjectsListItemContentProps = {
  projectName: string
  children?: React.ReactNode
}
type ProjectsListItemProps = {
  sleeved: string
  sleevedStyle: React.CSSProperties
  isOpen: boolean
  toggleIsOpen: () => void
} & ProjectsListItemContentProps

function ProjectsListItem({
  projectName,
  children,
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
      <div id={divId} aria-labelledby={buttonId} className={'projects-li-div ' + (isOpen ? '' : 'collapsed')}>
        <div>{children}</div>
      </div>
    </li>
  )
}

export default ProjectsListItem

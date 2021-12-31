import { useState } from 'react'
import '../../css/content/ProjectsSection.scss'
import { stringToId } from '../common'

type ProjectsListItemProps = {
  projectName: string
  extraClassName?: string
  children?: React.ReactNode
  currentOpen: string
  setCurrentOpen: (id: string) => void
}

function ProjectsListItem({
  projectName,
  extraClassName,
  children,
  currentOpen,
  setCurrentOpen,
}: ProjectsListItemProps) {
  const id = 'projects-' + stringToId(projectName)
  const isOpen = currentOpen === id

  const liId = id
  const buttonId = id + '-button'
  const divId = id + '-content'

  return (
    <li id={liId} className={'projects-li ' + extraClassName}>
      <button
        id={buttonId}
        className="projects-li-button"
        onClick={() => (isOpen ? setCurrentOpen('') : setCurrentOpen(id))}
        aria-controls={divId}
        aria-expanded={isOpen}>
        <span>{projectName}</span>
      </button>
      <div id={divId} aria-labelledby={buttonId} className={'projects-li-div ' + (isOpen ? '' : 'collapsed')}>
        <div>{children}</div>
      </div>
    </li>
  )
}

type ProjectsSectionProps = {
  extraClassName: string
}

function ProjectsSection({ extraClassName }: ProjectsSectionProps) {
  const [currentOpen, setCurrentOpen] = useState<string>('')
  const common = { currentOpen, setCurrentOpen }

  return (
    <section id="projects-section" className={extraClassName}>
      <h3 id="projects-header" className="section-header subtitle-text">
        {'PROJECTS'}
      </h3>
      <div id="projects-body" className="section-body">
        <ul id="projects-ul">
          <ProjectsListItem projectName={'This Website'} {...common}>
            {'Hello!'}
          </ProjectsListItem>
          <ProjectsListItem projectName={'Cityscape'} {...common}>
            {'Hello!'}
          </ProjectsListItem>
          <ProjectsListItem projectName={'Maps'} {...common}>
            {'Hello!'}
          </ProjectsListItem>
          <ProjectsListItem projectName={'Voxel Coloring'} {...common}>
            {'Hello!'}
          </ProjectsListItem>
          <ProjectsListItem projectName={'Override'} {...common}>
            {'Hello!'}
          </ProjectsListItem>
          <ProjectsListItem projectName={'Spacewar!'} {...common}>
            {'Hello!'}
          </ProjectsListItem>
        </ul>
      </div>
    </section>
  )
}

export default ProjectsSection

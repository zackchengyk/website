import { useEffect, useState } from 'react'
import { stringToId } from '../common'
import '../../css/sections/ProjectsSection.scss'
import { projectsText } from '../content/text'

// ======================================================================== Component: ProjectsListItem

export type ProjectsListItemContentProps = {
  projectName: string
  extraClassName?: string
  children?: React.ReactNode
}
type ProjectsListItemProps = {
  isOpen: boolean
  toggleIsOpen: () => void
} & ProjectsListItemContentProps

function ProjectsListItem({
  projectName,
  extraClassName,
  children,
  isOpen,
  toggleIsOpen,
}: ProjectsListItemProps) {
  const id = 'projects-' + stringToId(projectName)

  const liId = id
  const buttonId = id + '-button'
  const divId = id + '-content'

  return (
    <li id={liId} className={'projects-li ' + extraClassName}>
      <h3>
        <button
          id={buttonId}
          className="projects-li-button"
          onClick={toggleIsOpen}
          aria-controls={divId}
          aria-expanded={isOpen}>
          <span>{projectName}</span>
        </button>
      </h3>
      <div id={divId} aria-labelledby={buttonId} className={'projects-li-div ' + (isOpen ? '' : 'collapsed')}>
        <div>{children}</div>
      </div>
    </li>
  )
}

// ======================================================================== Component: ProjectsSection

const projectNames = ['website', 'cityscape', 'maps', 'voxels', 'override', 'spacewar'] as const
export type ProjectName = typeof projectNames[number]

type ProjectsSectionProps = {
  extraClassName?: string
}

function ProjectsSection({ extraClassName }: ProjectsSectionProps) {
  const [currentOpen, setCurrentOpen] = useState<Record<ProjectName, boolean>>(
    projectNames.reduce((acc, ele) => ((acc[ele] = false), acc), {} as Record<ProjectName, boolean>)
  )

  function getToggleIsOpenFunction(projectName: ProjectName): () => void {
    return () => setCurrentOpen((prev) => ({ ...currentOpen, [projectName]: !prev[projectName] }))
  }

  return (
    <section id="projects" className={extraClassName}>
      <h2 id="projects-header" className="section-header subtitle-text">
        <span>{'PROJECTS'}</span>
      </h2>
      <div id="projects-body" className="section-body">
        <ul id="projects-ul">
          {projectNames.map((projectName) => (
            <ProjectsListItem
              isOpen={currentOpen[projectName]}
              toggleIsOpen={getToggleIsOpenFunction(projectName)}
              {...projectsText[projectName]}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProjectsSection

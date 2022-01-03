import { useEffect, useRef, useState } from 'react'
import { XY } from '../common'
import '../../css/sections/ProjectsSection.scss'
import { projectsText } from '../content/text'
import ProjectsListItem from './ProjectsListItem'

const projectNames = ['website', 'cityscape', 'maps', 'voxels', 'override', 'spacewar'] as const
export type ProjectName = typeof projectNames[number]

// ======================================================================== Component: ProjectsSection

type ProjectsSectionProps = {
  windowDimensions: XY
  scrollTop: number
  extraClassName?: string
}

function ProjectsSection({ windowDimensions, scrollTop, extraClassName }: ProjectsSectionProps) {
  // Animate

  const self = useRef<any>()
  const [sleeved, setSleeved] = useState<string>('sleeved')

  useEffect(() => {
    if (sleeved && scrollTop + 0.75 * windowDimensions.y > self.current!.offsetTop) {
      setSleeved('')
    }
  }, [scrollTop])

  // Accordion

  const [currentOpen, setCurrentOpen] = useState<Record<ProjectName, boolean>>(
    projectNames.reduce((acc, ele) => ((acc[ele] = false), acc), {} as Record<ProjectName, boolean>)
  )

  function getToggleIsOpenFunction(projectName: ProjectName): () => void {
    return () => setCurrentOpen((prev) => ({ ...currentOpen, [projectName]: !prev[projectName] }))
  }

  return (
    <section id="projects" className={extraClassName} ref={self}>
      <h2 id="projects-header" className="section-header">
        <span>{'PROJECTS'}</span>
      </h2>
      <div id="projects-body" className="section-body">
        <ul id="projects-ul">
          {projectNames.map((projectName, i) => (
            <ProjectsListItem
              sleeved={sleeved}
              sleevedStyle={{ '--slide-up-delay': i / 8 + 's' } as React.CSSProperties}
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

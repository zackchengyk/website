import { XY } from '../common'
import { useEffect, useState } from 'react'
import projectsContent, { ProjectName, projectNames } from '../content/projectsContent'
import ProjectsListItem from './ProjectsListItem'
import '../../css/sections/ProjectsSection.scss'
import React from 'react'

type ProjectsSectionProps = {
  windowDimensions: XY
  scrollTop: number
}

const ProjectsSection = React.forwardRef<HTMLElement, ProjectsSectionProps>(
  ({ windowDimensions, scrollTop }, ref) => {
    // ================== Animate
    const [sleeved, setSleeved] = useState<string>('sleeved')
    useEffect(() => {
      // @ts-ignore
      if (sleeved && scrollTop + 0.75 * windowDimensions.y > ref?.current!.offsetTop) {
        setSleeved('')
      }
    }, [scrollTop, windowDimensions.x, windowDimensions.y])

    // ================== Accordion
    const [currentOpen, setCurrentOpen] = useState<Record<ProjectName, boolean>>(
      projectNames.reduce((acc, ele) => ((acc[ele] = false), acc), {} as Record<ProjectName, boolean>)
    )
    function getToggleCurrentOpenFunction(projectName: ProjectName): () => void {
      return () => setCurrentOpen((prev) => ({ ...currentOpen, [projectName]: !prev[projectName] }))
    }

    return (
      <section id="projects" ref={ref}>
        <h2 id="projects-header" className="section-header">
          <span>{'PROJECTS'}</span>
        </h2>
        <div id="projects-body" className="section-body">
          <ul id="projects-ul">
            {projectNames.map((projectName, i) => (
              <ProjectsListItem
                key={projectName}
                sleeved={sleeved}
                sleevedStyle={{ '--slide-up-delay': i / 8 + 's' } as React.CSSProperties}
                evenOdd={i % 2 ? 'even' : 'odd'}
                isOpen={currentOpen[projectName]}
                toggleIsOpen={getToggleCurrentOpenFunction(projectName)}
                windowDimensions={windowDimensions}
                {...projectsContent[projectName]}
              />
            ))}
          </ul>
        </div>
      </section>
    )
  }
)

export default ProjectsSection

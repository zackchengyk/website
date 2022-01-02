import brgdSrc from '../../img/experience/brgd-logo-small.png'
import brownSrc from '../../img/experience/brown-logo.svg'
import govtechSrc from '../../img/experience/govtech-logo-purple-small.png'
import OutLink from './OutLink'
import { ExperienceListItemContentProps, ExperienceName } from '../sections/ExperienceSection'
import { ProjectName, ProjectsListItemContentProps } from '../sections/ProjectsSection'

// ================== About

export const personalIntro = "hi! I'm zack,"
export const personalBlurb = (
  <>
    <p>
      {'a self-professed lover of all things '}
      <strong>{'design'}</strong>
      {' (art, tech, interaction, engineering, instruction... you name it!).'}
    </p>
    <p>
      {'My passion is crafting '}
      <strong>{'beautiful, functional, and accessible'}</strong>
      {
        " interactive experiences, and my work centers on creating communication: previously, it's taken the form of software & web dev, "
      }
      <abbr title="user interface / user experience design">{'UI/UX'}</abbr>
      {', computer graphics, and '}
      <OutLink href="https://www.risd.edu/steam">
        <abbr title="science, technology, art, engineering, and math">{'STEAM'}</abbr>
        {' education.'}
      </OutLink>
    </p>
    <p>
      {"I'm currently a junior at Brown University, where I study "}
      <OutLink href="https://engineering.brown.edu/undergraduate/concentrations/computer-engineering">
        {'computer engineering'}
      </OutLink>
      {' and '}
      <OutLink href="https://cs.brown.edu">
        <abbr title="computer science">{'CS'}</abbr>
      </OutLink>
      {', with a dash of '}
      <OutLink href="https://www.brown.edu/academics/visual-art/home">{'visual art'}</OutLink>
      {
        ". Outside of class, you'll typically find me cooking, doing crosswords, or dabbling in video game development."
      }
    </p>
  </>
)

// ================== Experience

export const experienceText: Record<ExperienceName, ExperienceListItemContentProps> = {
  govtech: {
    experienceName: 'Govtech',
    imgSrc: govtechSrc,
    experienceTitle: 'Frontend Software Developer',
    experienceSubtitle: 'Government Technology Agency',
    experienceBody: (
      <p>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
        }
      </p>
    ),
  },
  brgd: {
    experienceName: 'BRGD',
    imgSrc: brgdSrc,
    experienceTitle: 'Executive Board Member',
    experienceSubtitle: 'Brown-RISD Game Developers',
    experienceBody: (
      <p>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
        }
      </p>
    ),
  },
  csci1430: {
    experienceName: 'CSCI 1430',
    imgSrc: brownSrc,
    experienceTitle: 'Head Teaching Assistant',
    experienceSubtitle: (
      <>
        {'CSCI 0031: '}
        <em>{'Computer Vision'}</em>
      </>
    ),
    experienceBody: (
      <p>
        {"I'm one of two "}
        <abbr title="head teaching assistants">{'HTAs'}</abbr>
        {' for '}
        <OutLink href="https://browncsci1430.github.io/webpage/index.html">
          {'CSCI 1430 (Computer Vision)'}
        </OutLink>
        {', Spring 2022.'}
      </p>
    ),
  },
  engn0031: {
    experienceName: 'ENGN 0031',
    imgSrc: brownSrc,
    experienceTitle: 'Undergraduate Teaching Assistant',
    experienceSubtitle: (
      <>
        {'ENGN 0031: '}
        <em>{'Honors Intro to Engineering'}</em>
      </>
    ),
    experienceBody: (
      <p>
        {'I was one of four '}
        <abbr title="undergraduate teaching assistants">{'UTAs'}</abbr>
        {' for ENGN 0031 (Honors Intro to Engineering), Spring 2021.'}
      </p>
    ),
  },
}

// ================== Projects

export const projectsText: Record<ProjectName, ProjectsListItemContentProps> = {
  website: {
    projectName: 'Website',
    children: <>{'Hello'}</>,
  },
  cityscape: {
    projectName: 'Cityscape',
    children: <>{'Hello'}</>,
  },
  maps: {
    projectName: 'Maps',
    children: <>{'Hello'}</>,
  },
  voxels: {
    projectName: 'Voxel Reconstruction',
    children: <>{'Hello'}</>,
  },
  override: {
    projectName: 'Override',
    children: <>{'Hello'}</>,
  },
  spacewar: {
    projectName: 'Spacewar!',
    children: <>{'Hello'}</>,
  },
}

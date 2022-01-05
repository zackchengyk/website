import brgdSrc from '../../img/experience/brgd-logo-small.png'
import brownSrc from '../../img/experience/brown-logo.svg'
import govtechSrc from '../../img/experience/govtech-logo-purple-small.png'
import { ExperienceListItemContentProps } from '../sections/ExperienceListItem'
import OutLink from './OutLink'

export const experienceNames = ['govtech', 'brgd', 'csci1430', 'engn0031']
export type ExperienceName = typeof experienceNames[number]

// ======================================================================== Govtech

const govtech: ExperienceListItemContentProps = {
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
}

// ======================================================================== BRGD

const brgd: ExperienceListItemContentProps = {
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
}

// ======================================================================== CSCI 1430

const csci1430: ExperienceListItemContentProps = {
  experienceName: 'CSCI 1430',
  imgSrc: brownSrc,
  experienceTitle: 'Head Teaching Assistant',
  experienceSubtitle: 'CSCI 1430: Computer Vision',
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
}

// ======================================================================== ENGN 0031

const engn0031: ExperienceListItemContentProps = {
  experienceName: 'ENGN 0031',
  imgSrc: brownSrc,
  experienceTitle: 'Undergraduate Teaching Assistant',
  experienceSubtitle: 'ENGN 0031: Honors Intro to Engineering',
  experienceBody: (
    <p>
      {'I was one of four '}
      <abbr title="undergraduate teaching assistants">{'UTAs'}</abbr>
      {' for ENGN 0031 (Honors Intro to Engineering), Spring 2021.'}
    </p>
  ),
}

// ======================================================================== Export

export const experienceContent: Record<ExperienceName, ExperienceListItemContentProps> = {
  govtech,
  brgd,
  csci1430,
  engn0031,
}

export default experienceContent

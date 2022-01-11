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
  experienceTitle: 'Frontend Developer',
  experienceSubtitle: 'Government Technology Agency',
  experienceBody: (
    <>
      <p>
        {'While contributing to the development of '}
        <OutLink href="https://supportgowhere.life.gov.sg">
          <strong>{'SupportGoWhere'}</strong>
        </OutLink>
        {', I built a library of '}
        <strong>{'React'}</strong>
        {' components for user '}
        <strong>{'input/interaction'}</strong>
        {' and kickstarted '}
        <strong>
          <abbr title="accessibility">{'a11y'}</abbr>
        </strong>
        {" efforts as the team's primary "}
        <strong>{'accessibility reviewer'}</strong>
        {'.'}
      </p>
      <p>
        {'I also designed and developed a '}
        <strong>{'data pipeline + CMS'}</strong>
        {' to manage dynamic, multilingual content provided by external partners.'}
      </p>
    </>
  ),
}

// ======================================================================== BRGD

const brgd: ExperienceListItemContentProps = {
  experienceName: 'BRGD',
  imgSrc: brgdSrc,
  experienceTitle: 'Executive Board Member',
  experienceSubtitle: (
    <>
      {'Brown-'}
      <abbr title="Rhode Island School of Design">{'RISD'}</abbr>
      {' Game Developers'}
    </>
  ),
  experienceBody: (
    <p>
      {'Right now, I just help to run the club and oversee game design and development, '}
      {'and, of course, '}
      <a href="#projects-override">{'make games'}</a>
      {". In the near future, I'll also be working on improving our "}
      <strong>{'Unity and C# instruction'}</strong>
      {', to get our new programmers up to speed.'}
    </p>
  ),
}

// ======================================================================== CSCI 1430

const csci1430: ExperienceListItemContentProps = {
  experienceName: 'CSCI 1430',
  imgSrc: brownSrc,
  experienceTitle: 'Head Teaching Assistant',
  experienceSubtitle: 'CSCI 1430: Computer Vision, Spring 2022',
  experienceBody: (
    <p>
      {"I'm currently one of two "}
      <abbr title="head teaching assistants">{'HTAs'}</abbr>
      {' for '}
      <OutLink href="https://browncsci1430.github.io/webpage/index.html">
        {'CSCI 1430 (Computer Vision)'}
      </OutLink>
      {". We're still in the midst of preparations, including reviewing "}
      <strong>{'course content'}</strong>
      {', updating '}
      <strong>{'assignments'}</strong>
      {', and designing '}
      <strong>{'interactive demos'}</strong>
      {'. Check back later!'}
    </p>
  ),
}

// ======================================================================== ENGN 0031

const engn0031: ExperienceListItemContentProps = {
  experienceName: 'ENGN 0031',
  imgSrc: brownSrc,
  experienceTitle: 'Undergraduate Teaching Assistant',
  experienceSubtitle: 'ENGN 0031: Honors Intro to Engineering, Spring 2021',
  experienceBody: (
    <>
      <p>
        {'I guided students through problem sets and coding in '}
        <strong>{'MATLAB'}</strong>
        {' and '}
        <strong>{'Mathematica'}</strong>
        {', almost always extending my hours to help those who stuck around. '}
        {" I had heckin' good time as a UTA, especially figuring out "}
        <strong>{'effective ways to explain things'}</strong>
        {' :)'}
      </p>
    </>
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

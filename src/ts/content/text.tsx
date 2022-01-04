import { ExperienceName } from '../sections/ExperienceSection'
import { ExperienceListItemContentProps } from '../sections/ExperienceListItem'
import OutLink from './OutLink'
import { ProjectName } from '../sections/ProjectsSection'
import { ProjectsListItemContentProps } from '../sections/ProjectsListItem'

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

import brgdSrc from '../../img/experience/brgd-logo-small.png'
import brownSrc from '../../img/experience/brown-logo.svg'
import govtechSrc from '../../img/experience/govtech-logo-purple-small.png'

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

import cityscape from '../../img/projects/cityscape'
import maps from '../../img/projects/maps'
import voxels from '../../img/projects/voxels'
import override from '../../img/projects/override'
import spacewar from '../../img/projects/spacewar'

const embeddedVideoCommon = {
  preload: 'metadata',
  loop: true,
  muted: true,
  playsInline: true,
  controls: true,
}
const pseudoGifCommon = {
  className: 'pseudo-gif',
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true,
  controls: false,
}

export const projectsText: Record<ProjectName, ProjectsListItemContentProps> = {
  website: {
    projectName: 'Website',
    imgChildren: <img src={spacewar.imageSrc} alt="todo: Spacewar image" />,
    projectTitle: "I'm Talking 'Bout This Website (You're Looking At It)",
    projectSubtitle: 'React, Typescript, THREE.Js',
    projectBody: <p>{'My God this was tiring.'}</p>,
  },
  cityscape: {
    projectName: 'Cityscape',
    imgChildren: (
      <div style={{ display: 'grid', gridGap: 10, gridTemplateAreas: '"a a a" "b c d"' }}>
        <video {...embeddedVideoCommon} poster={cityscape.recordingPosterSrc} style={{ gridArea: 'a' }}>
          <source src={cityscape.recordingWebmSrc} type="video/webm" />
          <source src={cityscape.recordingMp4Src} type="video/mp4" />
        </video>
        <img src={cityscape.image3Src} alt="todo" />
        <img src={cityscape.image2Src} alt="todo" />
        <img src={cityscape.image1Src} alt="todo" />
      </div>
    ),
    projectBody: <p>{'Cityscape!'}</p>,
  },
  maps: {
    projectName: 'Maps',
    imgChildren: (
      <div style={{ display: 'grid', gridGap: 10, gridTemplateAreas: '"a a a" "b c d"' }}>
        <img src={maps.imageSrc} alt="todo" style={{ gridArea: 'a' }} />
        <video {...pseudoGifCommon}>
          <source src={maps.recording1WebmSrc} type="video/webm" />
          <source src={maps.recording1Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={maps.recording2WebmSrc} type="video/webm" />
          <source src={maps.recording2Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={maps.recording3WebmSrc} type="video/webm" />
          <source src={maps.recording3Mp4Src} type="video/mp4" />
        </video>
      </div>
    ),
    projectBody: (
      <>
        <p>
          {'I made a '}
          <strong>{'browser-based'}</strong>
          {', IntelliJ-themed map applet in React, with a Java backend.'}
        </p>
        <p>
          {'The app features pathfinding via '}
          <strong>
            <OutLink href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">
              {"Dijkstra's algorithm"}
            </OutLink>
          </strong>
          {', nearest-node searching using '}
          <strong>
            <abbr title="k-dimensional">{'k-d'}</abbr> {'trees'}
          </strong>
          {', and '}
          <strong>{'server- and client-side caching'}</strong>
          {'. Its UI is also fully '}
          <strong>{'keyboard-navigable'}</strong>
          {' and '}
          <strong>{'responsive'}</strong>.
        </p>
      </>
    ),
  },
  voxels: {
    projectName: 'Voxel Reconstruction',
    imgChildren: (
      <div style={{ display: 'grid', gridGap: 10, gridTemplateAreas: '"a b c d" "e f g h"' }}>
        <img src={voxels.imageBirdSrc} alt="todo" />
        <video {...pseudoGifCommon}>
          <source src={voxels.recordingBird10WebmSrc} type="video/webm" />
          <source src={voxels.recordingBird10Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={voxels.recordingBird20WebmSrc} type="video/webm" />
          <source src={voxels.recordingBird20Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={voxels.recordingBird100WebmSrc} type="video/webm" />
          <source src={voxels.recordingBird100Mp4Src} type="video/mp4" />
        </video>
        <img src={voxels.imagePigSrc} alt="todo" />
        <video {...pseudoGifCommon}>
          <source src={voxels.recordingPig10WebmSrc} type="video/webm" />
          <source src={voxels.recordingPig10Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={voxels.recordingPig20WebmSrc} type="video/webm" />
          <source src={voxels.recordingPig20Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={voxels.recordingPig180WebmSrc} type="video/webm" />
          <source src={voxels.recordingPig180Mp4Src} type="video/mp4" />
        </video>
      </div>
    ),
    projectBody: (
      <>
        <p>
          {'We implemented '}
          <strong>{'photorealistic scene reconstruction'}</strong>
          {' via '}
          <strong>{'voxel coloring'}</strong>
          {', and extended it to produce 3D-printable '}
          <strong>{'.obj files'}</strong>
          {' based on '}
          <strong>{'images'}</strong>
          {' taken from multiple vantage points. Our three-person team was inspired by '}
          <OutLink href="https://doi.org/10.1023/A:1008176507526">{'this paper'}</OutLink>
          {', and we built our app using '}
          <strong>{'Python'}</strong>
          {' and '}
          <strong>{'MATLAB'}</strong>.
        </p>
      </>
    ),
  },
  override: {
    projectName: 'Override',
    imgChildren: (
      <div style={{ display: 'grid', gridGap: 10, gridTemplateAreas: '"a a a" "b c d"' }}>
        <video {...pseudoGifCommon} style={{ gridArea: 'a' }}>
          <source src={override.recording1WebmSrc} type="video/webm" />
          <source src={override.recording1Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={override.recording2WebmSrc} type="video/webm" />
          <source src={override.recording2Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={override.recording3WebmSrc} type="video/webm" />
          <source src={override.recording3Mp4Src} type="video/mp4" />
        </video>
        <video {...pseudoGifCommon}>
          <source src={override.recording4WebmSrc} type="video/webm" />
          <source src={override.recording4Mp4Src} type="video/mp4" />
        </video>
      </div>
    ),
    projectBody: (
      <>
        <p>
          {'With some very talented teammates from the '}
          <OutLink href="https://twitter.com/brownrisdgames">
            {'Brown-'}
            <abbr title="Rhode Island School of Design">{'RISD'}</abbr>
            {' Game Developers club'}
          </OutLink>
          {', we made an arcade-style shoot-em-up where you take control of your enemies: '}
          <OutLink href="https://rainydey.itch.io/override">{'Override! (available on Itch.io)'}</OutLink>
        </p>
        <p>
          {
            'I worked on game design, movement, particle effects, and code organization; mostly, this was a chance to brush up on my '
          }
          <strong>{'Unity'}</strong>
          {' and '}
          <strong>{'C#'}</strong>
          {', plus some UI design and real-time graphics fundamentals.'}
        </p>
      </>
    ),
  },
  spacewar: {
    projectName: 'Spacewar!',
    imgChildren: <img src={spacewar.imageSrc} alt="todo" />,
    projectTitle: 'Spacewar!',
    projectSubtitle: 'HTML5 Canvas',
    projectBody: (
      <>
        <p>
          {'Alan Kay once noted: "the game of '}
          <cite>
            <OutLink href="https://en.wikipedia.org/wiki/Spacewar!">{'Spacewar!'}</OutLink>
          </cite>
          {
            ' blossoms spontaneously wherever there is a graphics display connected to a computer". So, here\'s '
          }
          <OutLink href="https://zackchengyk.github.io/spacewar/">
            <em>{'my'}</em>
            {' version'}
          </OutLink>
          {' of the original 1962 game :)'}
        </p>
        <p>
          {'I kept the project files simple so that non-'}
          <abbr title="computer science">{'CS'}</abbr>
          {' art students could not only '}
          <strong>
            <em>{'play'}</em>
            {' the game'}
          </strong>
          {', but also '}
          <strong>
            <em>{'play with its source code'}</em>
          </strong>
          {
            '. Through their involvement as viewers in the creation of the experience of interacting with the work, I hoped to help them learn about '
          }
          <OutLink href="https://en.wikipedia.org/wiki/Early_history_of_video_games">
            {'early video games'}
          </OutLink>
          {' as an offshoot of interactive media/art.'}
        </p>
        <p>
          <OutLink href="https://zackchengyk.github.io/spacewar/">{'> Play it here!'}</OutLink>
        </p>
      </>
    ),
  },
}

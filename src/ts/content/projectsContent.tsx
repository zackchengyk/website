import planetariumSrc from '../../img/projects/planetarium'
import cityscapeSrc from '../../img/projects/cityscape'
import mapsSrc from '../../img/projects/maps'
import voxelsSrc from '../../img/projects/voxels'
import overrideSrc from '../../img/projects/override'
import spacewarSrc from '../../img/projects/spacewar'
import { ProjectsListItemContentProps } from '../sections/ProjectsListItem'
import OutLink from './OutLink'
import MultiImage from './MultiImage'
import EmbeddedVideo from './EmbeddedVideo'
import PseudoGif from './PseudoGif'

export const projectNames = ['planetarium', 'cityscape', 'maps', 'voxels', 'override', 'spacewar'] as const
export type ProjectName = typeof projectNames[number]

// ======================================================================== Planetarium

const planetarium: ProjectsListItemContentProps = {
  projectName: 'Planetarium',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a a a" "b c d"'>
      <img src={planetariumSrc.image1MediumSrc} alt="todo" style={{ gridArea: 'a' }} />
      <img src={planetariumSrc.image2SmallSrc} alt="todo" />
      <img src={planetariumSrc.image3SmallSrc} alt="todo" />
      <img src={planetariumSrc.image4SmallSrc} alt="todo" />
    </MultiImage>
  ),
  projectTitle: 'Planetarium',
  projectSubtitle: 'Typescript, THREE.js',
  projectBody: <p>{'My God this was tiring.'}</p>,
}

// ======================================================================== Cityscape

const cityscape: ProjectsListItemContentProps = {
  projectName: 'Cityscape',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a a a" "b c d"'>
      <EmbeddedVideo
        webmSrc={cityscapeSrc.recordingWebmSrc}
        mp4Src={cityscapeSrc.recordingMp4Src}
        posterSrc={cityscapeSrc.recordingPosterSrc}
        style={{ gridArea: 'a' }}
      />
      <img src={cityscapeSrc.image3Src} alt="todo" />
      <img src={cityscapeSrc.image2Src} alt="todo" />
      <img src={cityscapeSrc.image1Src} alt="todo" />
    </MultiImage>
  ),
  projectBody: <p>{'Cityscape!'}</p>,
}

// ======================================================================== Maps

const maps: ProjectsListItemContentProps = {
  projectName: 'Maps',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a a a" "b c d"'>
      <img src={mapsSrc.imageSrc} alt="todo" style={{ gridArea: 'a' }} />
      <PseudoGif webmSrc={mapsSrc.recording1WebmSrc} mp4Src={mapsSrc.recording1Mp4Src} />
      <PseudoGif webmSrc={mapsSrc.recording2WebmSrc} mp4Src={mapsSrc.recording2Mp4Src} />
      <PseudoGif webmSrc={mapsSrc.recording3WebmSrc} mp4Src={mapsSrc.recording3Mp4Src} />
    </MultiImage>
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
}

// ======================================================================== Voxels

const voxels: ProjectsListItemContentProps = {
  projectName: 'Voxel Reconstruction',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a b c d" "e f g h"'>
      <img src={voxelsSrc.imageBirdSrc} alt="todo" />
      <PseudoGif webmSrc={voxelsSrc.recordingBird10WebmSrc} mp4Src={voxelsSrc.recordingBird10Mp4Src} />
      <PseudoGif webmSrc={voxelsSrc.recordingBird20WebmSrc} mp4Src={voxelsSrc.recordingBird20Mp4Src} />
      <PseudoGif webmSrc={voxelsSrc.recordingBird100WebmSrc} mp4Src={voxelsSrc.recordingBird100Mp4Src} />
      <img src={voxelsSrc.imagePigSrc} alt="todo" />
      <PseudoGif webmSrc={voxelsSrc.recordingPig10WebmSrc} mp4Src={voxelsSrc.recordingPig10Mp4Src} />
      <PseudoGif webmSrc={voxelsSrc.recordingPig20WebmSrc} mp4Src={voxelsSrc.recordingPig20Mp4Src} />
      <PseudoGif webmSrc={voxelsSrc.recordingPig80WebmSrc} mp4Src={voxelsSrc.recordingPig80Mp4Src} />
    </MultiImage>
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
}

// ======================================================================== Override

const override: ProjectsListItemContentProps = {
  projectName: 'Override',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a a a" "b c d"'>
      <PseudoGif
        webmSrc={overrideSrc.recording1WebmSrc}
        mp4Src={overrideSrc.recording1Mp4Src}
        style={{ gridArea: 'a' }}
      />
      <PseudoGif webmSrc={overrideSrc.recording2WebmSrc} mp4Src={overrideSrc.recording2Mp4Src} />
      <PseudoGif webmSrc={overrideSrc.recording3WebmSrc} mp4Src={overrideSrc.recording3Mp4Src} />
      <PseudoGif webmSrc={overrideSrc.recording4WebmSrc} mp4Src={overrideSrc.recording4Mp4Src} />
    </MultiImage>
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
}

// ======================================================================== Spacewar

const spacewar: ProjectsListItemContentProps = {
  projectName: 'Spacewar!',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a"'>
      <img src={spacewarSrc.imageSrc} alt="todo" />
    </MultiImage>
  ),
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
}

// ======================================================================== Export

const projectsContent: Record<ProjectName, ProjectsListItemContentProps> = {
  planetarium,
  cityscape,
  maps,
  voxels,
  override,
  spacewar,
}

export default projectsContent

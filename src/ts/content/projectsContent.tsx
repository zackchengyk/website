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
import EmbeddedImage from './EmbeddedImage'

export const projectNames = ['planetarium', 'cityscape', 'maps', 'voxels', 'override', 'spacewar'] as const
export type ProjectName = typeof projectNames[number]

// ======================================================================== Planetarium

const planetarium: ProjectsListItemContentProps = {
  projectName: 'Planetarium',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a a a" "b c d"'>
      <EmbeddedImage {...planetariumSrc.image1Medium} alt="todo" style={{ gridArea: 'a' }} />
      <EmbeddedImage {...planetariumSrc.image2Small} alt="todo" />
      <EmbeddedImage {...planetariumSrc.image3Small} alt="todo" />
      <EmbeddedImage {...planetariumSrc.image4Small} alt="todo" />
    </MultiImage>
  ),
  projectTitle: 'Planetarium',
  projectSubtitle: 'THREE.js, Typescript',
  projectBody: (
    <>
      <p>
        {'These '}
        <strong>{'procedural pixel planets'}</strong>
        {' are the result of my recent obsession with getting good at '}
        <OutLink href="https://threejs.org">{'THREE.js'}</OutLink>
        {', combined with my love for '}
        <strong>{'generative art'}</strong>
        {', '}
        <strong>{'crunchy pixels'}</strong>
        {', and '}
        <strong>{'outer space'}</strong>
        {'.'}
      </p>
      <p>
        {'To achieve the look I wanted, I had the generator randomly select from a predefined dictionary of '}
        <strong>{' parameter ranges and distributions'}</strong>
        {'. '}
        <strong>{'Multi-octave Perlin noise'}</strong>
        {' (by way of a '}
        <em>{'massive'}</em>
        {' fragment shader), some simplified orbital mechanics, and a '}
        <strong>{' two-pass pixelization effect'}</strong>
        {' tied up the rest.'}
      </p>
      <p>
        {"Since it's entirely browser-based, optimizing it for "}
        <strong>{'performance'}</strong>
        {' was the biggest challenge by far. '}
        {'A more detailed write-up is in the works, so stay tuned for that!'}
      </p>
      <p>
        {"Heavily inspired by Daniel Linssen's "}
        <OutLink href="https://managore.itch.io/planetarium">{'Planetarium'}</OutLink>
        {'.'}
      </p>
      <p>
        <a href="#home">
          <strong>{'> Live demo (just scroll up!)'}</strong>
        </a>
      </p>
      <p>
        <OutLink href="https://github.com/zackchengyk/website/tree/master/src/ts/planetarium">
          <strong>{'> GitHub'}</strong>
        </OutLink>
      </p>
    </>
  ),
}

// ======================================================================== Cityscape

const cityscape: ProjectsListItemContentProps = {
  projectName: 'Cityscape',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a a a" "b c d"'>
      <EmbeddedVideo {...cityscapeSrc.recording} style={{ gridArea: 'a' }} />
      <EmbeddedImage {...cityscapeSrc.image3} alt="todo" />
      <EmbeddedImage {...cityscapeSrc.image2} alt="todo" />
      <EmbeddedImage {...cityscapeSrc.image1} alt="todo" />
    </MultiImage>
  ),
  projectTitle: 'Cityscape',
  projectSubtitle: 'THREE.js, Javascript',
  projectBody: (
    <>
      <p>
        {'For our graphics final project, we created an infinite, '}
        <strong>{'procedurally-generated'}</strong>
        {' cityscape, which you can '}
        <OutLink href="https://zackchengyk.github.io/cityscape/">{'explore right in your browser'}</OutLink>
        {'!'}
      </p>
      <p>
        {'In a way, this project was one big excuse for me to experiment with '}
        <strong>{'WebGL'}</strong>
        {'. I figured out how to create '}
        <strong>{'rounded outlines'}</strong>
        {' using vertex shader-extruded geometry, sneaky '}
        <strong>{'backface culling'}</strong>
        {', and '}
        <strong>{'stencil buffers'}</strong>
        {'; implemented '}
        <strong>{'bloom'}</strong>
        {' and '}
        <strong>{'overlay'}</strong>
        {' via custom shader passes; and also made a movement system and day-night cycle.'}
      </p>
      <p>
        <strong>{'Fun facts: '}</strong>
        <br />
        {"- The camera doesn't actually move! Instead, everything else moves in the opposite direction."}
        <br />
        {
          "- The buildings don't change in height (that wouldn't be performant) or scale (it would mess up textures) "
        }
        {'\u2014 instead, they descend underground... that made outline generation a real pain.'}
      </p>
      <p>
        <OutLink href="https://zackchengyk.github.io/cityscape/">
          <strong>{'> Visit our city!'}</strong>
        </OutLink>
      </p>
      <p>
        <OutLink href="https://github.com/zackchengyk/cityscape">
          <strong>{'> GitHub'}</strong>
        </OutLink>
      </p>
    </>
  ),
}

// ======================================================================== Maps

const maps: ProjectsListItemContentProps = {
  projectName: 'Maps',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a a a" "b c d"'>
      <EmbeddedImage {...mapsSrc.image} alt="todo" style={{ gridArea: 'a' }} />
      <PseudoGif {...mapsSrc.recording1} />
      <PseudoGif {...mapsSrc.recording2} />
      <PseudoGif {...mapsSrc.recording3} />
    </MultiImage>
  ),
  projectTitle: 'Maps',
  projectSubtitle: 'HTML5 Canvas, React, Java',
  projectBody: (
    <>
      <p>
        {'I made a '}
        <strong>{'browser-based'}</strong>
        {', IntelliJ-themed map applet in React, with a Java backend server. '}
        {'This was for class, but I put way too much effort into it not to show it off haha.'}
      </p>
      <p>
        {'The app features pathfinding via '}
        <strong>
          <OutLink href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">
            {"Dijkstra's algorithm"}
          </OutLink>
        </strong>
        {', nearest-neighbor searching with '}
        <strong>
          <OutLink href="https://en.wikipedia.org/wiki/K-d_tree">
            <abbr title="k-dimensional">{'k-d'}</abbr> {'trees'}
          </OutLink>
        </strong>
        {', and '}
        <strong>{'server- and client-side caching'}</strong>
        {'.'}
      </p>
      <p>
        {'Its '}
        <strong>{'UI'}</strong>
        {' is also fully '}
        <OutLink href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets">
          <strong>{'keyboard-navigable'}</strong>
        </OutLink>
        {' and '}
        <strong>{'responsive'}</strong>
        {', and I threw in '}
        <strong>{'tooltips'}</strong>
        {', '}
        <strong>{'loading indicators'}</strong>
        {', and '}
        <strong>{'toast notifications'}</strong>
        {" for the heck of it (it wasn't feeling "}
        <em>{'IntelliJ'}</em>
        {" enough yet). Rendering is done on a plain'ol canvas element."}
      </p>
      <p>
        <OutLink href="https://github.com/zackchengyk/maps">
          <strong>{'> GitHub'}</strong>
        </OutLink>
      </p>
    </>
  ),
}

// ======================================================================== Voxels

const voxels: ProjectsListItemContentProps = {
  projectName: 'Voxel Coloring',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a b c d" "e f g h"' style={{ gridTemplate: '1fr 1fr / repeat(4, 1fr)' }}>
      <EmbeddedImage {...voxelsSrc.imageBird} alt="todo" />
      <PseudoGif {...voxelsSrc.recordingBird10} />
      <PseudoGif {...voxelsSrc.recordingBird20} />
      <PseudoGif {...voxelsSrc.recordingBird100} />
      <EmbeddedImage {...voxelsSrc.imagePig} alt="todo" />
      <PseudoGif {...voxelsSrc.recordingPig10} />
      <PseudoGif {...voxelsSrc.recordingPig20} />
      <PseudoGif {...voxelsSrc.recordingPig80} />
    </MultiImage>
  ),
  projectTitle: "Wait, It's All Voxels?",
  projectSubtitle: 'Python, MATLAB',
  projectBody: (
    <>
      <p>
        {'For our computer vision final project, we implemented '}
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
      <p>
        <OutLink href="https://github.com/zackchengyk/voxel-coloring">
          <strong>{'> GitHub'}</strong>
        </OutLink>
      </p>
    </>
  ),
}

// ======================================================================== Override

const override: ProjectsListItemContentProps = {
  projectName: 'Override',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a a a" "b c d"'>
      <PseudoGif {...overrideSrc.recording1} style={{ gridArea: 'a' }} />
      <PseudoGif {...overrideSrc.recording2} />
      <PseudoGif {...overrideSrc.recording3} />
      <PseudoGif {...overrideSrc.recording4} />
    </MultiImage>
  ),
  projectTitle: 'Override!',
  projectSubtitle: 'Unity, C#',
  projectBody: (
    <>
      <p>
        {'With some very talented teammates from the '}
        <OutLink href="https://twitter.com/brownrisdgames">
          {'Brown-'}
          <abbr title="Rhode Island School of Design">{'RISD'}</abbr>
          {' Game Developers'}
        </OutLink>
        {' club, we made an arcade-style shoot-em-up where you take control of your enemies: '}
        <OutLink href="https://rainydey.itch.io/override">{'Override! (available on Itch.io)'}</OutLink>
      </p>
      <p>
        {"I worked on the game's overall design, its movement system, some particle effects, "}
        {'and general code organization. It was a great chance to brush up on my '}
        <strong>{'Unity'}</strong>
        {' and '}
        <strong>{'C#'}</strong>
        {', plus brush up on some UI design and real-time graphics fundamentals.'}
      </p>
      <p>
        <OutLink href="https://rainydey.itch.io/override">
          <strong>{'> Play or download it here!'}</strong>
        </OutLink>
      </p>
      <p>
        <OutLink href="https://github.com/whatnameshouldiuse/BRGD-Jumping-Asteroids">
          <strong>{'> GitHub'}</strong>
        </OutLink>
      </p>
    </>
  ),
}

// ======================================================================== Spacewar

const spacewar: ProjectsListItemContentProps = {
  projectName: 'Spacewar!',
  imgChildren: (
    <MultiImage gridTemplateAreas='"a"'>
      <EmbeddedImage {...spacewarSrc.image} alt="todo" />
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
        {"Even though there's an entire game engine in there, I kept the project files simple so that non-"}
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
        {', thereby co-creating their own experience of the work. '}
        {'I like to think it makes a convincing case for '}
        <OutLink href="https://en.wikipedia.org/wiki/Video_games_as_an_art_form">{'video games'}</OutLink>
        {' as interactive art!'}
      </p>
      <p>
        <OutLink href="https://zackchengyk.github.io/spacewar/">
          <strong>{'> Play it here!'}</strong>
        </OutLink>
      </p>
      <p>
        <OutLink href="https://github.com/zackchengyk/spacewar">
          <strong>{'> GitHub'}</strong>
        </OutLink>
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

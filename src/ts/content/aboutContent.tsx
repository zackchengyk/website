import OutLink from './OutLink'

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

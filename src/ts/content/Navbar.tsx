import '../../css/content/Navbar.scss'

type NavbarProps = {
  extraClassName: string
}

function Navbar({ extraClassName }: NavbarProps) {
  return (
    <nav id="navbar" className={extraClassName}>
      <div id="navbar-right">
        <a id="navbar-home" className="navbar-item active" href="#home">
          home
        </a>
        <a id="navbar-about" className="navbar-item inactive" href="#about">
          about
        </a>
        <a id="navbar-experience" className="navbar-item inactive" href="#experience">
          experience
        </a>
        <a id="navbar-projects" className="navbar-item inactive" href="#projects">
          projects
        </a>
      </div>
    </nav>
  )
}

export default Navbar

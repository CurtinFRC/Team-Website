import React from 'react'
import Link from 'next/link'
import { Slant as Hamburger } from 'hamburger-react'

const navbarData = {
  pages: [
    {
      title: 'Robots',
      url: '/robots',
    },
      {
      title: 'Socials',
      url: '/socials',
    }, 
    {
      title: 'Sponsors',
      url: '/sponsors',
    },
    {
      title: 'Warp',
      url: '/warp',
    },
  ],
}

export default class Navbar extends React.Component {
  navRef;
  logoRef;
  pagesRef;
  constructor(props) {
    super(props)
    this.navRef = React.createRef()
    this.logoRef = React.createRef()
    this.pagesRef = React.createRef()
    this.state = {
      setOpen: false,
      showDropdown: false,
      openDropdownInt: 0,
      openDropdownColor: 'rgba(0, 0, 0, 0)',
    }
    this.componentDidResize = this.componentDidResize.bind(this)
    this.componentDidRotate = this.componentDidRotate.bind(this)
    this.changeDropdown = this.changeDropdown.bind(this)
  }
  componentDidMount() {
    this.componentDidRotate(this)
    window.addEventListener('resize', this.componentDidResize)
    window.addEventListener('orientationchange', this.componentDidRotate)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.componentDidResize)
    window.removeEventListener('orientationchange', this.componentDidRotate)
  }
  componentDidResize(showDropdown) {
    this.setState(
      {
        showDropdown: false,
      },
      function () {
        this.setState({
          showDropdown:
            this.logoRef.current.offsetWidth +
              this.pagesRef.current.offsetWidth >=
            this.navRef.current.offsetWidth / 1.2,
        })
      },
    )
  }
  componentDidRotate(showDropdown) {
    setTimeout(() => {
      this.componentDidResize(this)
    }, 10)
  }
  changeDropdown(x) {
    this.setState(() => ({
      setOpen: x,
      openDropdown: x,
      openDropdownInt: x ? 1 : 0,
      openDropdownColor: x ? 'var(--color-overlay)' : 'rgba(0, 0, 0, 0)',
    }))
  }
  render() {
    return (
      <div
        className="navbar"
        ref={this.navRef}
        // style={{ backgroundColor: this.state.openDropdownColor}}
        // style={{ backgroundColor: 'rgba(0, 0, 0, 0)'}}
        style={{backgroundColor: "${this.state.openDropdownColor}"}}
      >
        <div
          className="dropdown"
          style={{
            transform: `translate(0, 50vh) scale(1, 0)`,
            opacity: 0,
          }}
        >
          <div
            className="column"
            style={{ justifyContent: 'flex-start' }}
            onClick={() => {
              this.changeDropdown(false)
            }}
          >
            <Link href="/" passHref legacyBehavior>
              <a
                className="button"
                style={{
                  transform: "scale(${this.state.openDropdownInt}, ${this.state.openDropdownInt})",
                }}
              >
                Home
              </a>
            </Link>
            {navbarData.pages.map((page) => (
              <Link
                key={`_${page.title}`}
                href={page.url}
                passHref
                legacyBehavior
              >
                <a
                  className="button"
                  style={{
                    transform: "scale(${this.state.openDropdownInt}, ${this.state.openDropdownInt})",
                  }}
                >
                  {page.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div ref={this.logoRef}>
          <Link href="/" passHref legacyBehavior>
            <a
            className="button logo"
            onClick={() => {
              this.changeDropdown(false)
            }}
          >
            4788
          </a>
          </Link>
        </div>
        <div ref={this.pagesRef} hidden={false}>
          {navbarData.pages.map((page) => (
            <Link key={page.title} href={page.url} passHref legacyBehavior>
              <a className="button">{page.title}</a>
            </Link>
          ))}
        </div>
        <div hidden={true}>
          <Hamburger
            toggled={false}
            toggle={this.changeDropdown}
            size={37.5}
            direction='left'
            duration={0.4}
            distance="sm"
            color="var(--color-foreground)"
            easing="ease-out"
            rounded={true}
          />
        </div>
      </div>
    )
  }
}
import Link from "next/link";
import React from "react";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.logoRef = React.createRef();
    this.pagesRef = React.createRef();
    this.dropdownRef = React.createRef();
    this.state = {
      useDropdown: false,
      openDropdown: false,
      reverseIcon: false,
      openDropdownInt: 0,
      openDropdownColor: "rgba(0, 0, 0, 0)",
    };
    this.componentDidResize = this.componentDidResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.componentDidResize);
    this.componentDidResize(this);
  }
  componentWillUnmount() {
    window.addEventListener("resize", null);
  }
  componentDidResize(useDropdown) {
    this.setState(
      {
        useDropdown: false,
      },
      function () {
        this.setState(
          {
            useDropdown:
              this.logoRef.current.offsetWidth +
                this.pagesRef.current.offsetWidth >=
              this.navRef.current.offsetWidth / 1.4,
          }
        );
      }
    );
  }
  changeDropdown() {
    this.setState(() => ({
      openDropdown: !this.state.openDropdown,
    }));
    this.setState(() => ({
      openDropdownInt: !this.state.openDropdown ? 1 : 0,
    }));
    this.setState(() => ({
      openDropdownColor: !this.state.openDropdown ? "var(--color-background)" : "rgba(0, 0, 0, 0)",
    }));
  }
  render() {
    return (
      <div>
        <div className="navbar" ref={this.navRef} style={{ backgroundColor: this.state.openDropdownColor }}>
          <div
            className="dropdown"
            style={{
              transform: `translate(0, 50vh) scale(1, ${this.state.openDropdownInt})`,
              opacity: this.state.openDropdownInt,
            }}
          >
            <div
              className="column"
              style={{ justifyContent: "flex-start" }}
              onClick={() => {
                this.changeDropdown();
                this.setState(() => ({ reverseIcon: !this.state.reverseIcon }));
              }}
            >
              <Link href="/" passHref legacyBehavior>
                <a
                  className="button"
                  style={{
                    transform: `scale(${this.state.openDropdownInt}, ${this.state.openDropdownInt})`,
                  }}
                >
                  Home
                </a>
              </Link>
              <Link href="/robots" passHref legacyBehavior>
                <a
                  className="button"
                  style={{
                    transform: `scale(${this.state.openDropdownInt}, ${this.state.openDropdownInt})`,
                  }}
                >
                  Robots
                </a>
              </Link>
              <Link href="/socials" passHref legacyBehavior>
                <a
                  className="button"
                  style={{
                    transform: `scale(${this.state.openDropdownInt}, ${this.state.openDropdownInt})`,
                  }}
                >
                  Socials
                </a>
              </Link>
              <Link href="/sponsors" passHref legacyBehavior>
                <a
                  className="button"
                  style={{
                    transform: `scale(${this.state.openDropdownInt}, ${this.state.openDropdownInt})`,
                  }}
                >
                  Sponsors
                </a>
              </Link>
              <Link href="/warp" passHref legacyBehavior>
                <a
                  className="button"
                  style={{
                    transform: `scale(${this.state.openDropdownInt}, ${this.state.openDropdownInt})`,
                  }}
                >
                  Warp
                </a>
              </Link>
            </div>
          </div>
          <div ref={this.logoRef}>
            <Link href="/" passHref legacyBehavior>
              <a
                className="button logo"
                onClick={() => {
                  if (this.state.useDropdown && this.state.openDropdown) {
                    this.changeDropdown();
                    this.setState(() => ({
                      reverseIcon: !this.state.reverseIcon,
                    }));
                  }
                }}
              >
                4788
              </a>
            </Link>
          </div>
          <div ref={this.pagesRef} hidden={this.state.useDropdown}>
            <Link href="/robots" passHref legacyBehavior>
              <a className="button">Robots</a>
            </Link>
            <Link href="/socials" passHref legacyBehavior>
              <a className="button">Socials</a>
            </Link>
            <Link href="/sponsors" passHref legacyBehavior>
              <a className="button">Sponsors</a>
            </Link>
            <Link href="/warp" passHref legacyBehavior>
              <a className="button">Warp</a>
            </Link>
          </div>
          <div ref={this.dropdownRef} hidden={!this.state.useDropdown}>
            <UseAnimations
              speed={3}
              reverse={this.state.reverseIcon}
              size={65}
              strokeColor={"var(--color-foreground)"}
              onClick={() => {
                this.changeDropdown();
                this.setState(() => ({ reverseIcon: !this.state.reverseIcon }));
              }}
              autoPlay={true}
              animation={menu4}
            />
          </div>
        </div>
      </div>
    );
  }
}
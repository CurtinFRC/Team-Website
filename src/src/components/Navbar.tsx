'use client';

import { Component, createRef, RefObject } from 'react';
import Link from 'next/link';
import { Slant as Hamburger } from 'hamburger-react';

interface NavbarState {
  showDropdown: boolean;
  openDropdown: boolean;
}

const navbarData = {
  pages: [
    {
      title: 'Robots',
      url: '/robots',
    },
    {
      title: 'Sponsors',
      url: '/sponsors',
    },
    {
      title: 'WARP',
      url: '/warp',
    },
    {
      title: 'Outreach',
      url: '/outreach',
    },
    {
      title: 'Join',
      url: 'https://payments.curtin.edu.au/WorkshopsandEvents1/tran?uds_action_data=ZypTcEYwX3NOWCNxRkJDci8jQnRAWUIbWjFCXg5HXEAOQFxR',
    },
  ],
};

export default class Navbar extends Component<{}, NavbarState> {
  navRef: RefObject<HTMLDivElement>;
  logoRef: RefObject<HTMLAnchorElement>;
  pagesRef: RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.navRef = createRef<HTMLDivElement>();
    this.logoRef = createRef<HTMLAnchorElement>();
    this.pagesRef = createRef<HTMLDivElement>();
    this.state = {
      showDropdown: false,
      openDropdown: false,
    };
  }

  componentDidMount() {
    this.updateNav();
    window.addEventListener('resize', this.updateNav);
    window.addEventListener('orientationchange', this.updateNav);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateNav);
    window.removeEventListener('orientationchange', this.updateNav);
  }

  updateNav = () => {
    setTimeout(() => {
      this.setState({ showDropdown: false }, () => {
        const state =
          (this.logoRef.current?.offsetWidth || 0) +
            (this.pagesRef.current?.offsetWidth || 0) +
            136 >=
          (this.navRef.current?.offsetWidth || 0);
        this.setState({ showDropdown: state });
      });
    }, 125);
  };

  changeDropdown = (state: boolean) => {
    this.setState({ openDropdown: state }, () => {
      document.documentElement.setAttribute(
        'data-nav-dropdown',
        state.toString()
      );
    });
  };

  render() {
    const { showDropdown, openDropdown } = this.state;

    return (
      <nav>
        <div className='container' ref={this.navRef}>
          <div className='dropdown'>
            <div
              className='column'
              onClick={() => {
                this.changeDropdown(false);
              }}
            >
              <Link href='/' passHref>
                <p>Home</p>
              </Link>
              {navbarData.pages.map((page) => (
                <Link key={`_${page.title}`} href={page.url} passHref>
                  <p>{page.title}</p>
                </Link>
              ))}
            </div>
          </div>
          <Link href='/' passHref title='Home' ref={this.logoRef}>
            <p className='nav-logo'>4788</p>
          </Link>
          <div className='row-fixed' ref={this.pagesRef} hidden={showDropdown}>
            {navbarData.pages.map((page) => (
              <Link key={page.title} href={page.url} passHref>
                <p>{page.title}</p>
              </Link>
            ))}
          </div>
          <div hidden={!showDropdown}>
            <Hamburger
              toggled={openDropdown}
              toggle={this.changeDropdown}
              size={37.5}
              direction='left'
              duration={0.25}
              distance='sm'
              color='var(--color-foreground)'
              easing='ease-out'
              rounded={true}
              label='Show menu'
            />
          </div>
        </div>
      </nav>
    );
  }
}

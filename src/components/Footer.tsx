import React, { Component } from 'react';
import Link from 'next/link';
import { Logo, NewLogo } from './Icons';

// class Footer extends Component {
function Footer() {
  // render() {
  return (
    <div className='footer'>
      <p>&copy; 2024 Can&apos;t Control Curtin FRC Team </p>
      <div id='footer-socials'>
        <p>Socials!</p>
        <div className='links'>
          <Link href='https://www.facebook.com/CurtinFrc/'>Facebook</Link>
          <br />
          <Link href='https://www.instagram.com/waroboticsplayoffs/'>
            Instagram
          </Link>
          <br />
          <Link href='https://www.youtube.com/@CurtinFRC4788CantControl'>
            Youtube
          </Link>
          <br />
        </div>
      </div>
    </div>
  );
  // }
}

export default Footer;

import React, { Component } from 'react';
import Link from 'next/link';
import { Logo, NewLogo } from './Icons';

// class Footer extends Component {
function Footer() {
  // render() {
    return (
      <div className='footer'>
        <div id='footer-sponsors'>
          <p>Sponsors!</p>
          <div className='sponsor-links'>
              <Link href="/sponsors">Curtin University</Link><br/>
              <Link href="/sponsors">Defence Australa</Link><br/>
              <Link href="/sponsors">Altronics</Link><br/>
            </div>
          
        </div>
        <div id='footer-license'>
          <Logo id='cool-logo'/><br/>
          {/* <Image id='cool-logo' src='public/' alt='MIT License' height={100} width={20}*/}
          <p id="license-text">MIT License</p> 

          <p>&copy; 2024 Can't Control Curtin FRC Team </p>
        </div>
        <div id='footer-socials'>
          <p>Socials!</p>
          <div className='links'>
              <Link href="https://www.facebook.com/CurtinFrc/">Facebook</Link><br/>
              <Link href="https://www.instagram.com/waroboticsplayoffs/">Instagram</Link><br/>
              <Link href="https://www.youtube.com/@CurtinFRC4788CantControl">Youtube</Link><br/>
            </div>
          
        </div>
        
				
      </div>
    );
	// }
}

export default Footer;
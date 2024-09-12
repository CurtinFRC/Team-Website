import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  var iconsize = 35;

  return (
    <div className='footer'>
      <div className='license'>
        <p>&copy; 2024 Curtin FRC</p>
      </div>
      <div className='icons'>
        <FaGithub size={iconsize} className='icon'>
          <Link href='https://github.com/CurtinFRC' />
        </FaGithub>
        <FaFacebook size={iconsize} className='icon'>
          <Link href='https://www.facebook.com/CurtinFrc/' />
        </FaFacebook>
        <FaInstagram size={iconsize} className='icon'>
          <Link href='https://www.instagram.com/waroboticsplayoffs/' />
        </FaInstagram>
        <FaYoutube size={iconsize} className='icon'>
          <Link href='https://www.youtube.com/@CurtinFRC4788CantControl' />
        </FaYoutube>
      </div>
    </div>
  );
};

export default Footer;

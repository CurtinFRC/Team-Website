import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer'>
      <p style={{ justifyContent: 'left' }}>
        &copy; 2024 Can&apos;t Control Curtin FRC Team{' '}
      </p>
      <FaGithub size={20} style={{ padding: 0, justifyContent: 'right' }}>
        <Link href='https://github.com/CurtinFRC' />
      </FaGithub>
      <FaFacebook size={20}>
        <Link href='https://www.facebook.com/CurtinFrc/' />
      </FaFacebook>
      <FaInstagram size={20}>
        <Link href='https://www.instagram.com/waroboticsplayoffs/' />
      </FaInstagram>
      <FaYoutube size={20}>
        <Link href='https://www.youtube.com/@CurtinFRC4788CantControl' />
      </FaYoutube>
    </div>
  );
}

export default Footer;

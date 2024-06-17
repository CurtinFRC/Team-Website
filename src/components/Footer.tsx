import React, { Component } from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <div className='footer'>
            <p>&copy; 2024 Can&apos;t Control Curtin FRC Team </p>
            <Link href='https://www.facebook.com/CurtinFrc/'>Facebook</Link>
            <Link href='https://www.instagram.com/waroboticsplayoffs/'>
                Instagram
            </Link>
            <Link href='https://www.youtube.com/@CurtinFRC4788CantControl'>
                Youtube
            </Link>
        </div>
    );
}

export default Footer;

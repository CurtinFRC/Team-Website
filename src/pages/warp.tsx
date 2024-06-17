import Head from 'next/head';
import { Arrows, Logo } from '../components/Icons';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';
import Image from 'next/image';

function showPopup1() {
  const popup = document.getElementById('popup1');
  popup.classList.add('active');
}
function hidePopup1() {
  const popup = document.getElementById('popup1');
  popup.classList.remove('active');
}
function showPopup2() {
  const popup = document.getElementById('popup2');
  popup.classList.add('active');
}
function hidePopup2() {
  const popup = document.getElementById('popup2');
  popup.classList.remove('active');
}
function showPopup3() {
  const popup = document.getElementById('popup3');
  popup.classList.add('active');
}
function hidePopup3() {
  const popup = document.getElementById('popup3');
  popup.classList.remove('active');
}
export default function Home() {
  var w = 1397;
  var h = 1468;
  return (
    <>
      <Head>
        <title>WARP | 4788</title>
        <meta
          name='description'
          content="WARP Curtin FRC's offseason competition"
        />
      </Head>
      <div className='page'>
        <div className='hero-no-padding'>
          <div className='column'>
            <Image
              className='logo'
              id='logo-filter'
              src='/warp-logo.png'
              alt='warp logo'
              width={w}
              height={h}
            />
            <Marquee speed={25} gradient={false} style={{ opacity: 0.8 }}>
              <h1>Warp</h1>
            </Marquee>
            <Arrows className='arrows' />
          </div>
        </div>

        <div className='heros'>
          {/* <Link href='https://www.facebook.com/CurtinFrc/'>
            <h2>Curtin's Facebook</h2>
          </Link> */}
          {/* <Link href='https://www.instagram.com/waroboticsplayoffs/' >
            <h2 onMouseEnter={showPopup1} onMouseLeave={hidePopup1}> Instagram </h2>
          </Link> */}
          <div id='parent'>
            <h2>
              <a
                href='https://www.instagram.com/waroboticsplayoffs/'
                onMouseEnter={showPopup1}
                onMouseLeave={hidePopup1}
              >
                Instagram
              </a>
            </h2>
            <div style={{ marginLeft: '20%' }} className='popup' id='popup1'>
              <p>Bonk</p>
            </div>
          </div>
          {/* <Link href='https://www.facebook.com/people/WA-Robotics-Playoffs/100094239134377/'>
            <h2 onMouseEnter={showPopup2} onMouseLeave={hidePopup2}> Facebook </h2>
          </Link> */}
          <div id='parent'>
            <h2>
              <a
                href='https://www.facebook.com/people/WA-Robotics-Playoffs/100094239134377/'
                onMouseEnter={showPopup2}
                onMouseLeave={hidePopup2}
              >
                Facebook
              </a>
            </h2>
            <div style={{ marginLeft: '20%' }} className='popup' id='popup2'>
              <p>Bang</p>
            </div>
          </div>
          {/* <Link href='https://www.youtube.com/@waroboticsplayoffs'>
            <h2 onMouseEnter={showPopup3} onMouseLeave={hidePopup3}> Youtube </h2>
          </Link> */}
          <div id='parent'>
            <h2>
              <a
                href='https://www.youtube.com/@waroboticsplayoffs'
                onMouseEnter={showPopup3}
                onMouseLeave={hidePopup3}
              >
                Youtube
              </a>
            </h2>
            <div style={{ marginLeft: '20%' }} className='popup' id='popup3'>
              <p>Pop</p>
            </div>
          </div>
          <p style={{ marginBottom: '5%' }}></p>
        </div>
      </div>
    </>
  );
}

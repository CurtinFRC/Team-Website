import Head from 'next/head';
import { Arrows } from '../components/Icons';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import Link from 'next/link';

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
          <p>
            Curtin University, Murdoch University and the WA Department of
            Primary Industries and Regional Development are proud to bring you
            the WA Robotics Playoffs (WARP). WARP includes an off-season robot
            competition as part of the global FRC program. Teams are well
            underway with building their robots ready to compete at Curtin
            Stadium. Spectators are welcome at this event. Come along and see
            robot alliances competing for points. Find out how to get a team
            together for the 2024 competition.
          </p>
          <div id='parent'>
            <h2>
              <Link href='https://www.instagram.com/waroboticsplayoffs/'>
                Instagram
              </Link>
            </h2>
          </div>
          <div id='parent'>
            <h2>
              <Link href='https://www.facebook.com/people/WA-Robotics-Playoffs/100094239134377/'>
                Facebook
              </Link>
            </h2>
          </div>
          <div id='parent'>
            <h2>
              <Link href='https://www.youtube.com/@waroboticsplayoffs'>
                Youtube
              </Link>
            </h2>
          </div>
          <p style={{ marginBottom: '5%' }}></p>
        </div>
      </div>
    </>
  );
}

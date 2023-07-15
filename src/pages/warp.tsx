import Head from 'next/head'
import { Arrows, Logo } from '../components/Icons'
import Marquee from 'react-fast-marquee'
import { Youtube, Facebook, Instagram } from '../components/Post'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  var w = 1397;
  var h = 1468;
  return (
    <>
      <Head>
        <title>WARP | 4788</title>
        <meta name="description" content="WARP Curtin FRC's offseason competition" />
      </Head>
      <div className="page">
        <div className='hero-no-padding'>
          <div className="column">
            <Image className="logo" src="/copy-of-final.png" alt="warp logo" width={w} height={h}/>
            {/* <Logo className="logo" /> */}
            <Marquee speed={25} gradient={false} style={{ opacity: 0.80 }}>
              <h1>Warp</h1>
            </Marquee>
            <Arrows className="arrows" />
          </div>
        </div>
        <div className='heros'>
          {/* <Youtube url='https://www.youtube.com/@waroboticsplayoffs'/> */}
          {/* <Facebook url='https://www.facebook.com/people/WA-Robotics-Playoffs/100094239134377/'/> */}
          {/* <Instagram url='https://www.instagram.com/p/CulUayTvbrV/?img_index=1'/> */}
          <h2> WARP Official Social Media</h2>
          {/* <h2><a href='https://www.instagram.com/waroboticsplayoffs/'> Instagram </a></h2>
          <h2><a href='https://www.youtube.com/@waroboticsplayoffs'> Youtube </a></h2>
          <h2><a href='https://www.facebook.com/people/WA-Robotics-Playoffs/100094239134377/'> Facebook </a></h2> */}
          <Link href='https://www.instagram.com/waroboticsplayoffs/'>
            <h2> Instagram </h2>
          </Link>
          <Link href='https://www.facebook.com/people/WA-Robotics-Playoffs/100094239134377/'>
            <h2> Facebook </h2>
          </Link>
          <Link href='https://www.youtube.com/@waroboticsplayoffs'>
            <h2> Youtube </h2>
          </Link>
        </div>
      </div>
    </>
  )
}

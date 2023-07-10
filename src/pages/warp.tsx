import Head from 'next/head'
import { Arrows, Logo } from '../components/Icons'
import Marquee from 'react-fast-marquee'

export default function Home() {
  return (
    <>
      <Head>
        <title>WARP | 4788</title>
        <meta name="description" content="WARP Curtin FRC's offseason competition" />
      </Head>
      <div className="page">
        <div className='hero-no-padding'>
          <div className="column">
            <Logo className="logo" />
            <Marquee speed={25} gradient={false} style={{ opacity: 0.80 }}>
              <h1>Warp</h1>
            </Marquee>
            <Arrows className="arrows" />
          </div>
        </div>
        <div className='heros'> </div>
      </div>
    </>
  )
}

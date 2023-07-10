import Head from 'next/head'
import Image from 'next/image'
import { Arrows, Logo } from '../components/Icons'
import Marquee from 'react-fast-marquee'
import Sponsor from '../components/Sponsor'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sponsors | 4788</title>
        <meta name="description" content="Curtin FRC's Sponsors" />
      </Head>
      <div className="page">
        <div className='hero'>
          <Marquee speed={28} gradient={false} direction='right'>
            <h3>Sponsors//Sponsors//Sponsors//Sponsors//Sponsors//Sponsors//</h3>
          </Marquee>
          <div className="column">
            <Sponsor
              title="Curtin University"
              body="TMP"
              img="/tmp/Curtin.png"
              flipped={false}
            />
            <Sponsor
              title="Altronics"
              body="TMP"
              img="/tmp/Altronics.png"
              flipped={true}
            />
          </div>
        </div>
        <div className='heros'> </div>
      </div>
    </>
  )
}

import Head from 'next/head'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { Arrows } from '../components/Icons'
import { ACTION_SERVER_ACTION } from 'next/dist/client/components/router-reducer/router-reducer-types'

export default function Home() {
  return (
    <>
      <Head>
        <title>Robots | 4788</title>
        <meta name="description" content="Curtin FRC's robots" />
      </Head>
      <div className="page">
        <div className='hero-no-padding'>
          <div className="column">
            <Marquee speed={25} gradient={false} style={{ opacity: 0.80 }}>
              <h1>Robots</h1>
            </Marquee>
            <Image src="/5663_2019.jpg" alt="Our 2019 robot KillSwitch" width={600} height={336}/>
            <h3>Our 2019 robot Killswitch:</h3>
            <p>
                  Designed to be capable of scoring cargo quickly with a small hatch panel &apos;flooper&apos; this robot has been described as a cargo beast
		              <br/>
                  <br/>
                  Competed at:
                  <br/>
                  South Pacific Regional - Lost in Semi Finals
            </p>
            <h3>Our 2020 robot Overkill:</h3>
            <p>
              content content Content
              <br/>
              <br/>
              Competed at:
              <br/>
              Content content content
            </p>
          </div>
        </div>

      </div>
    </>
  )
}

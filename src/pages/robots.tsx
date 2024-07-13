import Head from 'next/head';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export default function Home() {
  return (
    <>
      <Head>
        <title>Robots | 4788</title>
        <meta name='description' content="Curtin FRC's robots" />
      </Head>
      <div className='page'>
        <div className='hero-no-padding'>
          <div className='column'>
            <Marquee speed={25} gradient={false} style={{ opacity: 1.0 }}>
              <h1>Robots</h1>
            </Marquee>

            <h3>Our 2024 Robot: Note Dog Millionare </h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/NoteDogMillionare.jpg'
                alt='Our 2024 robot Note Dog Millionare'
                width={1300}
                height={772}
              />
              <br />
              <p>
                After strategy deliberations we came to the conclusion that our
                best chance of performing well in the South Pacific Regional was
                to build a robot that focused on cycling the amp scoring
                mechanism as fast as possible while still scoring speaker to
                enable us and our alliance partners to score more amplified
                notes. This robot has been described as a note beast.
                <br />
                <br />
                Competed at:
                <br />
                South Pacific Regional semi finals alliance captain
              </p>
            </div>

            <h3>Our 2019 Robot: Killswitch</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/5663_2019.jpg'
                alt='Our 2019 robot KillSwitch'
                width={1300}
                height={772}
              />
              <br />
              <p>
                Designed to be capable of scoring cargo quickly with a small
                hatch panel &apos;flooper&apos; this robot has been described as
                a cargo beast
                <br />
                <br />
                Competed at:
                <br />
                South Pacific Regional - Made it to Semi Finals
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

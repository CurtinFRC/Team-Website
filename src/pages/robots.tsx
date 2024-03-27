import Head from 'next/head';
import Image from 'next/image';

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
            <Image
              src='/5663_2019.jpg'
              alt='Our 2019 robot KillSwitch'
              width={600}
              height={336}
            />
            <p>
              Our 2019 robot KillSwitch: Designed to be capable of scoring cargo
              quickly with a small hatch panel &apos;flooper&apos; this robot
              has been described as a cargo beast
              <br />
              Competed at: South Pacific Regional - Lost in Semi Finals
            </p>
          </div>
        </div>
        <div className='heros'> </div>
      </div>
    </>
  );
}

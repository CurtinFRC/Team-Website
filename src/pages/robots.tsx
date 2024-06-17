import Head from 'next/head';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { Arrows } from '../components/Icons';

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

            <h3>Our 2024 Robot: Notedog Millionare</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/robot_placeholder.png'
                alt='Our 2019 robot KillSwitch'
                width={1300}
                height={772}
              />

              <br />
              <p>
                Our 2019 robot KillSwitch: Designed to be capable of scoring
                cargo quickly with a small hatch panel &apos;flooper&apos; this
                robot has been described as a cargo beast
                <br />
                Competed at: South Pacific Regional - Lost in Semi Finals
              </p>
            </div>
            <h3>Our 2023 Robot: Whiplash</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/robot_placeholder.png'
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
                South Pacific Regional - Lost in Semi Finals
              </p>
            </div>
            <h3>Our 2022 Robot: Puddle</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/robot_placeholder.png'
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
                South Pacific Regional - Lost in Semi Finals
              </p>
            </div>
            <h3>Our 2021 Robot: West Coast Slinger</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/robot_placeholder.png'
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
                South Pacific Regional - Lost in Semi Finals
              </p>
            </div>
            <h3>Our 2020 Robot: Overkill</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/5663_2019.png'
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
                South Pacific Regional - Lost in Semi Finals
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
                South Pacific Regional - Lost in Semi Finals
              </p>
            </div>
            <h3>Our 2018 Robot: Overkill</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/robot_placeholder.png'
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
                South Pacific Regional - Lost in Semi Finals
              </p>
            </div>
            <h3>Our 2017 Robot: Overkill</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/robot_placeholder.png'
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
                South Pacific Regional - Lost in Semi Finals
              </p>
            </div>
            <h3>Our 2016 Robot: Overkill</h3>
            <div className='robot-info-left'>
              <Image
                className='img'
                src='/robot_placeholder.png'
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
                South Pacific Regional - Lost in Semi Finals
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import Head from 'next/head';
import Marquee from 'react-fast-marquee';
import { Arrows } from '../components/Icons';

export default function Outreach() {
  return (
    <>
      <Head>
        <title> Outreach </title>
        <meta
          name='description'
          content="A summary of Curtin FRC's Outreach Programs"
        />
      </Head>
      <div className='page'>
        <div className='hero-no-padding'>
          <div className='column'>
            <Marquee speed={25} gradient={false} style={{ opacity: 0.8 }}>
              <h1>Outreach</h1>
            </Marquee>
            <Arrows className='arrows' />
          </div>
        </div>

        <div className='heros'>
          {/* placeholders */}
          <h4 className='h1-normal'>ROBO ACADEMY</h4>
          <img
            src='https://s30991.pcdn.co/engage/wp-content/uploads/sites/6/2022/02/Robotics-high-shot-aspect-ratio-2-1.jpg.webp'
            width='1000'
            height='600'
          />
          <p>
            Robot Academy is school holiday workshops for children interested in
            coding and robotics. With beginners, intermediate and advanced
            sessions, students have fun learning how to program LEGO Mindstorm
            robots. Robo Academy BLAST workshops run for 1 day, 9am to 2pm at
            the Curtin University Bentley campus. The workshops are recommended
            for students aged 8-13 years old and have a maximum of 25
            participants. Students should choose the appropriate workshop for
            their level of experience:
          </p>
        </div>
      </div>
    </>
  );
}

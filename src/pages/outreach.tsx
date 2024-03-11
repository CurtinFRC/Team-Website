import Head from 'next/head';
import Marquee from 'react-fast-marquee';
import { Logo, Arrows } from '../components/Icons';
import Content from '../components/Outreach';

export default function Outreach() {
  var warpImage = { src: '/warp-logo.png', h: 1397 * 0.25, w: 1468 * 0.25 };
  var roboAcademyImage = { src: '/', h: 0, w: 0 };
  return (
    <>
      <Head>
        <title> Outreach </title>
        <meta
          name='description'
          content="A summary of Curtin FRC's Outreach Programs"
        />
      </Head>
      <div className="page">
        <div className="hero-no-padding">
          <div className="column">


            <Marquee speed={25} gradient={false} style={{ opacity: 1 }}>
              <h1>Outreach</h1>
            </Marquee>
            <Arrows className="arrows"/>
          </div>
        </div>

        <div className="heros">
          <h1 style={{"marginBottom": "0%","marginTop": "0%"}}>WARP</h1>
          <img className="logo-normal" src="/warp-logo.png" alt="warp logo" width={1397} height={1468}/>
          <p>Curtin University, Murdoch University and the WA Department of Primary Industries and Regional Development are proud to bring you the WA Robotics Playoffs (WARP).
WARP includes an off-season robot competition as part of the global FRC program. Teams are well underway with building their robots ready to compete at Curtin Stadium.
Spectators are welcome at this event. Come along and see robot alliances competing for points. Find out how to get a team together for the 2024 competition.</p>
          {/* placeholders */}
          <h4 className="h1-normal">ROBOT ACADEMY</h4>
          <img src="https://s30991.pcdn.co/engage/wp-content/uploads/sites/6/2022/02/Robotics-high-shot-aspect-ratio-2-1.jpg.webp" width="1000" height="600" /> {/* 650 325 */}
          <p>Robot Academy is school holiday workshops for children interested in coding and robotics. With beginners, intermediate and advanced sessions, students have fun learning how to program LEGO Mindstorm robots.
Robo Academy BLAST workshops run for 1 day, 9am to 2pm at the Curtin University Bentley campus. The workshops are recommended for students aged 8-13 years old and have a maximum of 25 participants. Students should choose the appropriate workshop for their level of experience:</p>
        </div>
      </div>
    </>
  );
}

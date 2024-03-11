import Head from 'next/head'
import Link from 'next/link'
import { Arrows, Logo } from '../components/Icons'
import Marquee from 'react-fast-marquee'

export default function Home() {
  return (
    <>
      <Head>
        <title>Team 4788</title>
        <meta name="description" content="Curtin FRC, Team 4788's websites" />
      </Head>
      <div className="page">
        <div className="hero-no-padding">
          <div className="column">
            <div className='logo' id="logo-effect"/>
                <Logo className="logo" id="logo-filter"/>
                
   
             
            <Marquee speed={25} gradient={false} style={{ opacity: 0.80 }}>
              <h1>Can&apos;t Control//</h1>
            </Marquee>
            <Arrows className="arrows" />
          </div>
        </div>
        <div className='heros'>
          <h2>Who are we?</h2>
          <p>We are a community First Robotics Competition team based out of Curtin University from Western Australia (WA). Founded in 2013 we were the very first First team in WA and have started a variety of First programs here in WA. Along with ths we have also competed very succesfully in FRC for many years.</p>
          <h2>What do we do?</h2>
          <p>Our primary focuses are on competing in the FIRST Robotics Competition and spreading STEAM (Science, Technology, Engineering, Arts, Maths) learning in our community. We run several programs FLL, RoboAcademy, WARP, TRS, and more, for details on this check out our outreach page. Through our programs we have helped start hundereds of FLL teams in metro and rural areas, created tens of FRC teams in WA schools, and reached thousands of young people though doing good STEM.</p>
          <h2>Our Vision?</h2>
          <p>Our vision is to IGNITE, IMPROVE, and INNOVATE FIRST in WA! This is to say that we leap to ignite a passion for STEM in students, improve the world around us for the betterment of all, and innovate programs and solutions on our robots and in our community.</p>      
        </div>
      </div>     
    </>
  )
}

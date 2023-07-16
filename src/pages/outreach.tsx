import Head from "next/head"
import Marquee from "react-fast-marquee"
import {Logo, Arrows} from '../components/Icons'
import Content from '../components/Outreach'

export default function Outreach() {
  var warpImage = {src: "/warp-logo.png", h: 1397 * 0.25, w: 1468 * 0.25}
  var roboAcademyImage = {src: "/", h: 0, w: 0}
  return (
    <>
      <Head>
        <title> Outreach </title>
        <meta name="description" content="A summary of Curtin FRC's Outreach Programs" />
      </Head>
      <div className="page">
        <div className="hero-no-padding">
          <div className="column">
            <Logo className="logo" />
            <Marquee speed={25} gradient={false} style={{ opacity: 0.80 }}>
              <h1>Outreach</h1>
            </Marquee>
            <Arrows className="arrows" />
          </div>
        </div>
        <div className="heros">
          <Content image={warpImage} url="https://www.facebook.com/profile.php?id=100094239134377" title="WARP" body="content content content"/>
          <Content image={roboAcademyImage} url="/" title="Robo Academy" body="content content more content" />
        </div>
      </div>
  </>
  )
}
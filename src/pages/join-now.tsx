import Head from "next/head"
import { Logo, Arrows } from "../components/Icons"
import Marquee from "react-fast-marquee"
import Link from "next/link"

export default function JoinNow() {
  return (
    <>
      <Head>
        <title> Join Curtin FRC Today! </title>
        <meta name="description" content="Join Curtin FRC today" />
      </Head>
      <div className="page">
        <div className="hero-no-padding">
            <Logo className="logo" />
            <Marquee speed={25} gradient={false} style={{ opacity: 0.80 }}>
              <h1>Join Today!</h1>
            </Marquee>
            <Link href="https://payments.curtin.edu.au/FRCTeam/menu">
              <h2> Click here! </h2>
            </Link>
            <Arrows className="arrows" />
          </div>
          <div className="heros">
            {/* <Link href="https://payments.curtin.edu.au/FRCTeam/menu">
              <h2> Click here! </h2>
            </Link> */}
          </div>
        </div>
    </>
  )
}
import Head from 'next/head'
import Image from 'next/image'
import { Arrows, Logo } from '@/components/Icons'
import Marquee from 'react-fast-marquee'

export default function Home() {
  return (
    <>
      <Head>
        <title>Team 4788</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="page">
        <hero-no-padding>
          <div className="column">
          </div>
        </hero-no-padding>
        <heros>
        </heros>
      </div>
    </>
  )
}
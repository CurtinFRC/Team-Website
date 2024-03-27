import Head from 'next/head';
import Marquee from 'react-fast-marquee';
import { Facebook, Instagram, Youtube } from '../components/Post';

export default function Home() {
  return (
    <>
      <Head>
        <title>Socials | 4788</title>
        <meta name='description' content="Curtin FRC's Socials" />
      </Head>
      <div className='page'>
        <div className='hero' style={{ justifyContent: 'flex-start' }}>
          <Marquee speed={28} gradient={false} direction='right'>
            <h3>Socials//Socials//Socials//Socials//Socials//Socials//</h3>
          </Marquee>
          <div className='column posts'>
            <Facebook url='https://www.facebook.com/photo?fbid=650239157108479&set=a.468333625299034' />
            <Instagram url='https://www.instagram.com/p/Cq5pNEChgbY/?hl=en' />
            <Youtube url='https://www.youtube.com/watch?v=UvU8SDmH-LA' />
          </div>
        </div>
        <div className='heros'> </div>
      </div>
    </>
  );
}

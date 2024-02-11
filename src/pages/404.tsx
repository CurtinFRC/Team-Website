import Head from 'next/head';
import Marquee from 'react-fast-marquee';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Page cannot be found</title>
        <meta name='description' content='Error 404, page cannot be found.' />
      </Head>
      <div className='page'>
        <div className='hero-no-padding'>
          <div className='column'>
            <Marquee
              speed={28}
              gradient={false}
              style={{ opacity: 0.8 }}
              direction='right'
            >
              <h2>
                Page Not Found//Page Not Found//Page Not Found//Page Not Found//
              </h2>
            </Marquee>
            <Marquee speed={50} gradient={false} style={{ opacity: 0.8 }}>
              <h1>Error 404/Error 404/</h1>
            </Marquee>
            <Marquee
              speed={5}
              gradient={false}
              style={{ opacity: 0.8 }}
              direction='right'
            >
              <h2>
                Page Not Found//Page Not Found//Page Not Found//Page Not Found//
              </h2>
            </Marquee>
          </div>
        </div>
      </div>
    </div>
  );
}

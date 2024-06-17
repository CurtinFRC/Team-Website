import Head from 'next/head';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

export function SponsorCategory({ title, children }) {
  return (
    <>
      <h2>{title}</h2>
      {children}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Sponsors | 4788</title>
        <meta name='description' content="Curtin FRC's Sponsors" />
      </Head>
      <div className='page'>
        <div className='hero'>
          <Marquee
            speed={25}
            gradient={false}
            direction='left'
            style={{ opacity: 1 }}
          >
            <h1>Sponsors</h1>
          </Marquee>

          <div className='column' id='diamond-sponsors'>
            <SponsorCategory title='Diamond Sponsors'>
              <Image
                src='/tmp/Curtin.png'
                alt='Curtin University'
                height={100.5}
                width={575}
              />
              <p>
                Curtin University, formerly known as Curtin University of
                Technology and Western Australian Institute of Technology, is an
                Australian public research university based in Bentley, Perth,
                Western Australia.
              </p>
            </SponsorCategory>
          </div>
          <div className='column' id='gold-sponsors'>
            <SponsorCategory title='Gold Sponsors'>
              <Image
                src='pathways.png'
                alt='Pathways'
                height={200}
                width={600}
              />
              <p>
                Defence Australia is a department of the Government of Australia
                charged with the responsibility to defend Australia and its
                national interests.
              </p>
              <Image
                src='artifactory.png'
                alt='artifactory'
                height={100}
                width={300}
              />
              <p>
                The Perth Artifactory is the Hackerspace/Makerspace in Perth,
                Western Australia.
              </p>
              <Image
                src='tengineer.png'
                alt='turner engineering'
                height={100}
                width={300}
              />
              <p>
                Wholesaler household appliances in Bibra Lake, Western Australia
              </p>
            </SponsorCategory>
          </div>
          <div className='column' id='silver-sponsors'>
            <SponsorCategory title='Silver Sponsors'>
              <Image
                src='/tmp/Altronics.png'
                alt='altronics'
                height={100}
                width={400}
              />
              <p>
                Altronics is a fully Australian owned and operated company that
                supplies electronic components and finished goods to customers
                throughout Australia and around the world.
              </p>
              <Image
                src='rockwell.svg'
                alt='rockwell automation'
                height={100}
                width={300}
              />
              <p>
                Rockwell Automation, Inc. is an American provider of industrial
                automation and digital transformation technologies.
              </p>
              <Image
                src='curry.png'
                alt='curry curry curry'
                height={100}
                width={300}
              />
              <p>
                Traditional Indian plates served in a mellow locale with a
                display of grab-&-go snacks & desserts.
              </p>
              <Image
                src='arabia.webp'
                alt='arab association'
                height={163}
                width={170}
              />
              <p>
                The Australian Arab Association of WA operates as a non-profit,
                non-political, and non-religious organization. Our primary
                objective is to offer support to Culturally and Linguistically
                Diverse (CaLd) communities in Australia.
              </p>
            </SponsorCategory>
          </div>
          <div id='bronze-sponsors' className='column'>
            <SponsorCategory title='Bronze Sponsors'>
              <Image src='noctus.svg' alt='noctus' height={90} width={300} />
              <p>
                Noctus 3D design, source and manufacture a wide range of
                affordable High-performance 3D Printer parts and kits, with a
                particular focus on speed-printing and Voron machines.
              </p>
            </SponsorCategory>
          </div>
        </div>
      </div>
      <div className='heros'></div>
    </>
  );
}

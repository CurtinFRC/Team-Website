import Head from 'next/head';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const SponsorCategory = ({ title, children }) => {
  return (
    <div className='sponsor-category'>
      <h2>{title}</h2>
      <div className='sponsor-content'>{children}</div>
    </div>
  );
};

const Sponsors = () => {
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
            className='marquee'
          >
            <h1>Sponsors</h1>
          </Marquee>

          <div id='diamond-sponsors' className='column'>
            <SponsorCategory title='Diamond Sponsors'>
              <Image
                src='/Curtin.png'
                alt='Curtin University'
                layout='intrinsic'
                height={100}
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

          <div id='gold-sponsors' className='column'>
            <SponsorCategory title='Gold Sponsors'>
              <Image
                src='/pathways.png'
                alt='Pathways'
                layout='intrinsic'
                height={200}
                width={600}
              />
              <p>
                Defence Australia is a department of the Government of Australia
                charged with the responsibility to defend Australia and its
                national interests.
              </p>
              <Image
                src='/Artifactory.png'
                alt='Artifactory'
                layout='intrinsic'
                height={100}
                width={300}
              />
              <p>
                The Perth Artifactory is the Hackerspace/Makerspace in Perth,
                Western Australia.
              </p>
            </SponsorCategory>
          </div>
          {/* Add other sponsor sections here */}
        </div>
      </div>
    </>
  );
};

export { SponsorCategory };
export default Sponsors;

import Head from "next/head";
import Marquee from "react-fast-marquee";
import { Arrows } from "../components/Icons";
import Image from "next/image";
import { useEffect, useState } from "react";

const Outreach = () => {
  const [imageWidth, setImageWidth] = useState(1000);

  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width < 1000) {
        setImageWidth(window.screen.width - 20); // Add padding/margin
      } else {
        setImageWidth(1000);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Head>
        <title> Outreach </title>
        <meta
          name="description"
          content="A summary of Curtin FRC's Outreach Programs"
        />
      </Head>
      <div className="page">
        <div className="hero-no-padding">
          <div className="column">
            <Marquee speed={25} gradient={false} style={{ opacity: 0.8 }}>
              <h1>Outreach</h1>
            </Marquee>
            <Arrows className="arrows" />
          </div>
        </div>

        <div className="heros">
          <h4 className="h1-normal">ROBO ACADEMY</h4>
          <div className="image-container">
            <Image
              src="https://s30991.pcdn.co/engage/wp-content/uploads/sites/6/2022/02/Robotics-high-shot-aspect-ratio-2-1.jpg.webp"
              alt="Robo Academy"
              width={imageWidth}
              height={(imageWidth / 1000) * 600}
            />
          </div>
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
};

export default Outreach;

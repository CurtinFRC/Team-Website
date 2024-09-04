import Image from 'next/image';
import Link from 'next/link';

type Props = {
  url: string;
  title: string;
  body: string;
  image: { src: string; w: number; h: number };
};

const outreach = (props: Props) => {
  return (
    <div className='content'>
      <h1> {props.title} </h1>
      <Image
        src={props.image.src}
        alt={props.title}
        width={props.image.w}
        height={props.image.h}
      />
      <p className='content'> {props.body} </p>
      <Link href={props.url}>To find out more click here!</Link>
    </div>
  );
};

export default outreach;

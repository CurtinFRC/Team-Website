import React from 'react';
import Image from 'next/image';

type Props = { title: string; body: string; img: string; flipped: boolean };

const Sponsor = (props: Props) => {
  return (
    <div className='sponsor'>
      <div className={'row${props.flipped ? reverse : 0}'}>
        <div className='text'>
          <h2>{props.title}</h2>
          {/* <p>{this.props.body}</p> */}
        </div>
        <div className='image'>
          <Image src={props.img} alt='' fill={true} />
        </div>
      </div>
    </div>
  );
};

export default Sponsor;

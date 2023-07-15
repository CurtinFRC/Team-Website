// TODO make sponsors closer
import React from "react";
import Image from 'next/image'

type Props = {title: string, body: string, img: string, flipped: boolean}

export default class Sponsor extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div className="sponsor">
        <div className={"row${this.props.flipped ? reverse : 0}"} >
          <div className="text">
            <h2>{this.props.title}</h2>
            {/* <p>{this.props.body}</p> */}
          </div>
          <div className="image">
            <Image src={this.props.img} alt="" fill={true} />
          </div>
        </div>
      </div>
    );
  }
}
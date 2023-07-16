import Image from "next/image";
import Link from "next/link";

type Props = {url: string, title: string, body: string, image: {src: string, w: number, h: number}}

export default function outreach(props: Props) {
  return (
    <div>
      <h1> {props.title} </h1>
      <Image src={props.image.src} alt={props.title} width={props.image.w} height={props.image.h}/>
      <p> {props.body} </p>
    </div>
  )
}
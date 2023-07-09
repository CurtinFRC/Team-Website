//TODO: Fix Facebook HTML embeds, for now the social page will be removed from the navbar
import React from 'react'
import {
  FacebookEmbed,
  InstagramEmbed,
  YouTubeEmbed,
} from 'react-social-media-embed'

function Facebook(input: {url: string}) {
    return (
      <div className="post">
        <FacebookEmbed url={input.url} width={550} />
      </div>
    )
}

function Instagram(input: {url: string}) {
    return (
      <div className="post">
        <InstagramEmbed url={input.url} width={328} />
      </div>
    )
    }

function Youtube(input: {url: string}) {
    return (
      <div className="post">
        <YouTubeEmbed url={input.url} width={325} height={220} />
      </div>
    )
    }

export { Facebook, Instagram, Youtube }

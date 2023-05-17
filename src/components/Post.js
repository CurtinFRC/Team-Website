//TODO: Fix Facebook HTML embeds, for now the social page will be removed from the navbar
import React from 'react'
import {
  FacebookEmbed,
  InstagramEmbed,
  YouTubeEmbed,
} from 'react-social-media-embed'

class Facebook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadPage: true,
    }
  }
  componentDidMount() {
    this.setState({ loadPage: false })
  }
  render() {
    return (this.state.loadPage ? null :
      <div className="post">
        <FacebookEmbed url="https://www.facebook.com/andrewismusic/posts/451971596293956" width={550} />
      </div>
    )
  }
}

class Instagram extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="post">
        <InstagramEmbed url={this.props.url} width={328} />
      </div>
    )
  }
}

class Youtube extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="post">
        <YouTubeEmbed url={this.props.url} width={325} height={220} />
      </div>
    )
  }
}

export { Facebook, Instagram, Youtube }

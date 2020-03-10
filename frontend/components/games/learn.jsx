import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';

class Learn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount() {
    this.props.fetchDecks().then(() => this.sortDecks(this.props.decks, 0));
    this.props.fetchUsers();
  }



  handleRedirect(deckId) {
    return e => {
      this.setState({ redirect: `/${deckId}/flash-cards` })
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }


    return (
      <div className="latest">
        <div className="latest-header">
          <h1>RECENT</h1>
          <Link to={`/${this.props.currentUser.id}/recent`}><p>View all</p><i className="fas fa-chevron-right"></i></Link>
        </div>
        <div className="medium-deck-tiles">
          {this.state.decks.map((deck, index) => (
            index > 5 ? "" :
              <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this)} className="medium-deck-tile">
                <div className="medium-deck-tile-inner">
                  <div className="medium-deck-tile-right">
                    <h3>{deck.title}</h3>
                    <p>{deck.cardCount} terms {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</p>
                    <Link>{this.props.users[deck.ownerId].username}</Link>
                  </div>
                  <div className="medium-deck-tile-right" >

                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Learn;
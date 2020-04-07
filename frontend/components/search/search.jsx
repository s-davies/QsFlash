import React from 'react';
import {
  Link,
  NavLink,
  Redirect
} from 'react-router-dom';

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      decksSorted: false,
      redirect: null,
      usersLoaded: false
    }
  }

  componentDidMount() {
    this.props.searchDecks(this.props.match.params.searchTerm);
    this.props.fetchCards();
    this.props.fetchUsers().then(() => this.setState({usersLoaded: true}));
  }

  //refetch with new term
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchTerm !== this.props.searchTerm) {
      this.props.searchDecks(nextProps.match.params.searchTerm);
    }
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

    if (!this.state.usersLoaded) return null;

    return (
      <div className="search">
        <div className="search-inner">
          <h1>{this.props.match.params.searchTerm}</h1>
          <h3 id="sets-h3">SETS</h3>
          {this.props.decks.map(deck => (
            <div onClick={this.handleRedirect(deck.id).bind(this)} key={deck.id} className="search-deck">
              <div className="search-deck-info">
                <div>
                  <p>{deck.cardCount} terms</p>
                  <Link to={`/${deck.ownerId}/created`}>{this.props.users[deck.ownerId].username}</Link>
                </div>
                <p>{deck.title}</p>
              </div>
              <div className="search-cards">
                {deck["1"] ? 
                  <div>
                    <h4>{deck["1"].term}</h4>
                    <p>{deck["1"].definition}</p>
                  </div>
                  : ""}
                {deck["2"] ?
                  <div>
                    <h4>{deck["2"].term}</h4>
                    <p>{deck["2"].definition}</p>
                  </div>
                  : ""}
                {deck["3"] ?
                  <div>
                    <h4>{deck["3"].term}</h4>
                    <p>{deck["3"].definition}</p>
                  </div>
                  : ""}
                {deck["4"] ?
                  <div>
                    <h4>{deck["4"].term}</h4>
                    <p>{deck["4"].definition}</p>
                  </div>
                  : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Search;
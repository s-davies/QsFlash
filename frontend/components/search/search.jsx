import React from 'react';
import {
  Link,
  NavLink,
  Redirect
} from 'react-router-dom';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 15%;
  border-top-color: rgb(66, 87, 178);
    border-top-style: solid;
    border-top-width: 4px;
    border-right-color: rgb(66, 87, 178);
    border-right-style: solid;
    border-right-width: 4px;
    border-bottom-color: transparent;
    border-bottom-style: solid;
    border-bottom-width: 4px;
    border-left-color: rgb(66, 87, 178);
    border-left-style: solid;
    border-left-width: 4px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
`;

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      decksSorted: false,
      redirect: null,
      usersLoaded: false,
      sortType: "Recent",
      loading: true
    }
  }

  componentDidMount() {
    this.props.searchDecks(this.props.match.params.searchTerm);
    this.props.fetchCards();
    this.props.fetchDeckStudies();
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

  handleSortingChange(e) {
    this.setState({ sortType: e.target.value })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    }

    if (!this.state.usersLoaded) {
      return <div className="search">
        <ClipLoader
          css={override}
          size={150}
          loading={this.state.loading}
        />
      </div>
    };

    let sortedDecks = this.props.decks;

    if (this.state.sortType === "Recent") {
      //sort in reverse id order, corresponds with most recently created
      sortedDecks = sortedDecks.sort((deck1, deck2) => {
        if (deck1.id < deck2.id) return 1;
        if (deck1.id > deck2.id) return -1;
      });
    } else if (this.state.sortType === "Popular") {
      sortedDecks = sortedDecks.sort((deck1, deck2) => {
        if (deck1.studiesCount < deck2.studiesCount) return 1;
        if (deck1.studiesCount > deck2.studiesCount) return -1;
        if (!deck1.ratSum) return 1;
        if (!deck2.ratSum) return -1;
        if (deck1.ratSum / deck1.ratCount < deck2.ratSum / deck2.ratCount) return 1;
        if (deck1.ratSum / deck1.ratCount > deck2.ratSum / deck2.ratCount) return -1;
      });
    } else if (this.state.sortType === "Rating") {
      sortedDecks = sortedDecks.sort((deck1, deck2) => {
        if (!deck1.ratSum) return 1;
        if (!deck2.ratSum) return -1;
        if (deck1.ratSum / deck1.ratCount < deck2.ratSum / deck2.ratCount) return 1;
        if (deck1.ratSum / deck1.ratCount > deck2.ratSum / deck2.ratCount) return -1;
        if (deck1.ratCount < deck2.ratCount) return 1;
        if (deck1.ratCount > deck2.ratCount) return -1;
      });
    }

    let stars0 = <div className="rating-stars rating-yellow">
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
    </div>
    let stars1 = <div className="rating-stars rating-yellow">
      <i className="fas fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
    </div>
    let stars15 = <div className="rating-stars rating-yellow">
      <i className="fas fa-star"></i>
      <i className="fas fa-star-half-alt"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
    </div>
    let stars2 = <div className="rating-stars rating-yellow">
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
    </div>
    let stars25 = <div className="rating-stars rating-yellow">
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star-half-alt"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
    </div>
    let stars3 = <div className={"rating-stars rating-yellow"}>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="far fa-star"></i>
      <i className="far fa-star"></i>
    </div>
    let stars35 = <div className={"rating-stars rating-yellow"}>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star-half-alt"></i>
      <i className="far fa-star"></i>
    </div>
    let stars4 = <div className={"rating-stars rating-yellow"}>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="far fa-star"></i>
    </div>
    let stars45 = <div className={"rating-stars rating-yellow"}>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star-half-alt"></i>
    </div>
    let stars5 = <div className={"rating-stars rating-yellow"}>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
      <i className="fas fa-star"></i>
    </div>


    return (
      <div className="search">
        <div className="search-inner">
          <div className="search-inner-top">
            <h1>{this.props.match.params.searchTerm}</h1>
            <div className="options-audio-div options-field">
              <select value={this.state.sortType} onChange={this.handleSortingChange.bind(this)}>
                <option value="Recent">
                  Recent
                </option>
                <option value="Popular">
                  Popular
                </option>
                <option value="Rating">
                  Rating
                </option>
              </select>
            </div>
            <h3 id="sets-h3">SETS</h3>
            {this.props.decks.length === 0 ? 
              <h2>Sorry, we couldn't find any search results.<br/>Try searching for another term.</h2>
                : ""
            }
          </div>
          {sortedDecks.map(deck => (
            <div onClick={this.handleRedirect(deck.id).bind(this)} key={deck.id} className="search-deck">
              <div className="search-deck-info">
                <div className="search-deck-info-top">
                  <div>
                    <p>{deck.cardCount} terms</p>
                    <Link to={`/${deck.ownerId}/created`}>{this.props.users[deck.ownerId].username}</Link>
                  </div>
                  <div>
                    <span>{deck.ratSum ? (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) + ` (${deck.ratCount})` : "No ratings"}</span>
                    {!deck.ratSum ?
                      stars0
                      : (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) >= 1 && (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) < 1.5 ? stars1
                        : (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) >= 1.5 && (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) < 2 ? stars15
                          : (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) >= 2 && (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) < 2.5 ? stars2
                            : (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) >= 2.5 && (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) < 3 ? stars25
                              : (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) >= 3 && (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) < 3.5 ? stars3
                                : (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) >= 3.5 && (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) < 4 ? stars35
                                  : (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) >= 4 && (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) < 4.5 ? stars4
                                    : (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) >= 4.5 && (Math.round((deck.ratSum / deck.ratCount) * 10) / 10).toFixed(1) < 5 ? stars45
                                      : stars5
                    }
                  </div>
                </div>
                <div className="search-deck-info-top">
                  <p>{deck.title}</p>
                  <span>{deck.studiesCount} <i className="fas fa-book-reader"></i></span> 
                </div>
                
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
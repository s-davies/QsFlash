import React from 'react';
import {
  Link,
  NavLink,
  Redirect
} from 'react-router-dom';

class Created extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      decksSorted: false,
      redirect: null,
    }
  }

  componentDidMount() {
    this.props.fetchDecks().then(() => this.sortDecks());
    this.props.fetchUsers();
  }

  sortDecks() {
    let sortedDecks = Object.assign([], this.props.decks);
    sortedDecks.sort((deck1, deck2) => {
      const createdYear1 = parseInt(deck1.updatedAt.slice(0, 4));
      let createdMonth1 = deck1.updatedAt.slice(5, 7);
      if (createdMonth1[0] === "0") createdMonth1 = createdMonth1.slice(1);
      createdMonth1 = parseInt(createdMonth1);
      let createdDay1 = deck1.updatedAt.slice(8, 10);
      if (createdDay1[0] === "0") createdDay1 = createdDay1.slice(1);
      createdDay1 = parseInt(createdDay1);
      let createdHour1 = deck1.updatedAt.slice(11, 13);
      if (createdHour1[0] === "0") createdHour1 = createdHour1.slice(1);
      createdHour1 = parseInt(createdHour1);
      let createdMinute1 = deck1.updatedAt.slice(14, 16);
      if (createdMinute1[0] === "0") createdMinute1 = createdMinute1.slice(1);
      createdMinute1 = parseInt(createdMinute1);
      let createdSecond1 = deck1.updatedAt.slice(17, 19);
      if (createdSecond1[0] === "0") createdSecond1 = createdSecond1.slice(1);
      createdSecond1 = parseInt(createdSecond1);

      const createdYear2 = parseInt(deck2.updatedAt.slice(0, 4));
      let createdMonth2 = deck2.updatedAt.slice(5, 7);
      if (createdMonth2[0] === "0") createdMonth2 = createdMonth2.slice(1);
      createdMonth2 = parseInt(createdMonth2);
      let createdDay2 = deck2.updatedAt.slice(8, 10);
      if (createdDay2[0] === "0") createdDay2 = createdDay2.slice(1);
      createdDay2 = parseInt(createdDay2);
      let createdHour2 = deck2.updatedAt.slice(11, 13);
      if (createdHour2[0] === "0") createdHour2 = createdHour2.slice(1);
      createdHour2 = parseInt(createdHour2);
      let createdMinute2 = deck2.updatedAt.slice(14, 16);
      if (createdMinute2[0] === "0") createdMinute2 = createdMinute2.slice(1);
      createdMinute2 = parseInt(createdMinute2);
      let createdSecond2 = deck2.updatedAt.slice(17, 19);
      if (createdSecond2[0] === "0") createdSecond2 = createdSecond2.slice(1);
      createdSecond2 = parseInt(createdSecond2);

      if (createdYear1 > createdYear2) return -1;
      if (createdYear2 > createdYear1) return 1;
      if (createdMonth1 > createdMonth2) return -1;
      if (createdMonth2 > createdMonth1) return 1;
      if (createdDay1 > createdDay2) return -1;
      if (createdDay2 > createdDay1) return 1;
      if (createdHour1 > createdHour2) return -1;
      if (createdHour2 > createdHour1) return 1;
      if (createdMinute1 > createdMinute2) return -1;
      if (createdMinute2 > createdMinute1) return 1;
      if (createdSecond1 > createdSecond2) return -1;
      if (createdSecond2 > createdSecond1) return 1;
    });

    this.setState({ decks: sortedDecks, decksSorted: true });
  }

  handleRedirect(deckId) {
    return e => {
      this.setState({ redirect: `/${deckId}/flash-cards`})
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    if (!this.props.user) return null;

    const currentDay = (new Date()).getDate();
    const currentMonth = (new Date()).getMonth();
    const currentYear = (new Date()).getFullYear();
    let today = [];
    let thisMonth = [];
    let lastMonth = [];
    let thisYear = [];
    let lastYear = [];

    for (let i = 0; i < this.state.decks.length; i++) {
      const deck = this.state.decks[i];
      const updatedDay = parseInt(deck.updatedAt.slice(8, 10));
      const updatedMonth = parseInt(deck.updatedAt.slice(5, 7));
      const updatedYear = parseInt(deck.updatedAt.slice(0, 4));

      if ( currentDay === updatedDay && currentMonth + 1 === updatedMonth && currentYear === updatedYear ||
        currentDay === updatedDay - 1 && currentMonth + 1 === updatedMonth && currentYear === updatedYear) {
        today.push(deck);
      } else if (currentMonth + 1 === updatedMonth && currentYear === updatedYear) {
        thisMonth.push(deck);
      } else if (currentMonth === updatedMonth && currentYear === updatedYear || currentMonth === 0 && updatedMonth === 12) {
        lastMonth.push(deck);
      } else if (currentYear === updatedYear) {
        thisYear.push(deck);
      } else {
        lastYear.push(deck);
      }
    }
    
    return (
      <div className="recent">
        <div className="user-header">
          <div className="user-header-right">
            <h1>{this.props.user.username}</h1>
            <div className="user-header-links">
              <NavLink to={`/${this.props.user.id}/recent`} activeClassName="user-header-selected" className="user-header-link">
                <p>Recent</p>
              </NavLink>
              <NavLink to={`/${this.props.user.id}/created`} activeClassName="user-header-selected" className="user-header-link">
                <p>Created ({this.props.createdDecksCount})</p>
              </NavLink>
              <NavLink to={`/${this.props.user.id}/studied`} activeClassName="user-header-selected" className="user-header-link">
                <p>Studied</p>
              </NavLink>
              <NavLink to={`/${this.props.user.id}/folders`} activeClassName="user-header-selected" className="user-header-link">
                <p>Folders</p>
              </NavLink>
              <NavLink to={`/${this.props.user.id}/classes`} activeClassName="user-header-selected" className="user-header-link">
                <p>Classes</p>
              </NavLink>
            </div>
          </div>
          
        </div>
        <div className="recent-bottom">
          <div className="small-deck-tiles">
            {today.length > 0 ? 
              <div className="recent-divider">
                <p>TODAY</p>
                <span></span>
              </div> : ""
            }
            {today.map((deck, index) => (
              <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this)} className="small-deck-tile">
                <div className="small-deck-tile-inner">
                  <div className="small-deck-tile-top">
                    <p>{deck.cardCount} Terms </p>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                  </div>
                </div>
              </div>
            ))}
            {thisMonth.length > 0 ?
              <div className="recent-divider">
                <p>THIS MONTH</p>
                <span></span>
              </div> : ""
            }
            {thisMonth.map((deck, index) => (
              <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this)} className="small-deck-tile">
                <div className="small-deck-tile-inner">
                  <div className="small-deck-tile-top">
                    <p>{deck.cardCount} Terms </p>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                  </div>
                </div>
              </div>
            ))}
            {lastMonth.length > 0 ?
              <div className="recent-divider">
                <p>LAST MONTH</p>
                <span></span>
              </div> : ""
            }
            {lastMonth.map((deck, index) => (
              <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this)} className="small-deck-tile">
                <div className="small-deck-tile-inner">
                  <div className="small-deck-tile-top">
                    <p>{deck.cardCount} Terms </p>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                  </div>
                </div>
              </div>
            ))}
            {thisYear.length > 0 ?
              <div className="recent-divider">
                <p>THIS YEAR</p>
                <span></span>
              </div> : ""
            }
            {thisYear.map((deck, index) => (
              <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this)} className="small-deck-tile">
                <div className="small-deck-tile-inner">
                  <div className="small-deck-tile-top">
                    <p>{deck.cardCount} Terms </p>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                  </div>
                </div>
              </div>
            ))}
            {lastYear.length > 0 ?
              <div className="recent-divider">
                <p>LAST YEAR</p>
                <span></span>
              </div> : ""
            }
            {lastYear.map((deck, index) => (
                <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this)} className="small-deck-tile">
                  <div className="small-deck-tile-inner">
                    <div className="small-deck-tile-top">
                      <p>{deck.cardCount} Terms </p>
                    </div>
                    <div className="small-deck-tile-bottom" >
                      <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Created;
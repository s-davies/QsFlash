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

class Studied extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      decks: [],
      decksSorted: false,
      redirect: null,
      dummy: null,
      loading: true
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
      .then(() => this.props.fetchDecks(this.props.user.id)
        .then(() => {
          if (this.props.decks.length > 0) {
            this.sortDecks(this.props.decks, 0);
          } else {
            this.setState({ loading: false });
          }
        }));

  }

  //refetch with new user
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.props.fetchDecks(nextProps.user.id).then(() => {
        if (this.props.decks.length > 0) {
          this.sortDecks(this.props.decks, 0);
        } else {
          this.setState({ loading: false });
        }
      });
    }
  }

  sortDecks(decks, currentDeckIdx) {
    let sortedDecks = Object.assign([], decks.map(deck => Object.assign({}, deck)));
    let that = this;
    // for (let i = 0; i < sortedDecks.length; i++) {
    const deck = sortedDecks[currentDeckIdx];
    if (currentDeckIdx === sortedDecks.length - 1) {
        this.props.fetchDeckStudy(deck.id, this.props.ownProps.match.params.userId)
        .then(() => {
          deck.deckStudyId = this.props.deckStudy.id;
          deck.deckStudyStudierId = this.props.deckStudy.studierId;
          deck.deckStudyUpdatedAt = this.props.deckStudy.updatedAt;
          deck.deckStudyCreatedAt = this.props.deckStudy.createdAt;
          //filtering out decks that have been looked at but not actually studied
          //will need to update this for saying games count as study
          let newSortedDecks = [];
          for (let i = 0; i < sortedDecks.length; i++) {
            const sdeck = sortedDecks[i];
            if (sdeck.deckStudyCreatedAt !== sdeck.deckStudyUpdatedAt &&
              sdeck.deckStudyStudierId === parseInt(that.props.ownProps.match.params.userId)) {
              newSortedDecks.push(sdeck);
            }
          }
          sortedDecks = newSortedDecks;
          sortedDecks.sort((deck1, deck2) => {
            const createdYear1 = parseInt(deck1.deckStudyUpdatedAt.slice(0, 4));
            let createdMonth1 = deck1.deckStudyUpdatedAt.slice(5, 7);
            if (createdMonth1[0] === "0") createdMonth1 = createdMonth1.slice(1);
            createdMonth1 = parseInt(createdMonth1);
            let createdDay1 = deck1.deckStudyUpdatedAt.slice(8, 10);
            if (createdDay1[0] === "0") createdDay1 = createdDay1.slice(1);
            createdDay1 = parseInt(createdDay1);
            let createdHour1 = deck1.deckStudyUpdatedAt.slice(11, 13);
            if (createdHour1[0] === "0") createdHour1 = createdHour1.slice(1);
            createdHour1 = parseInt(createdHour1);
            let createdMinute1 = deck1.deckStudyUpdatedAt.slice(14, 16);
            if (createdMinute1[0] === "0") createdMinute1 = createdMinute1.slice(1);
            createdMinute1 = parseInt(createdMinute1);
            let createdSecond1 = deck1.deckStudyUpdatedAt.slice(17, 19);
            if (createdSecond1[0] === "0") createdSecond1 = createdSecond1.slice(1);
            createdSecond1 = parseInt(createdSecond1);

            const createdYear2 = parseInt(deck2.deckStudyUpdatedAt.slice(0, 4));
            let createdMonth2 = deck2.deckStudyUpdatedAt.slice(5, 7);
            if (createdMonth2[0] === "0") createdMonth2 = createdMonth2.slice(1);
            createdMonth2 = parseInt(createdMonth2);
            let createdDay2 = deck2.deckStudyUpdatedAt.slice(8, 10);
            if (createdDay2[0] === "0") createdDay2 = createdDay2.slice(1);
            createdDay2 = parseInt(createdDay2);
            let createdHour2 = deck2.deckStudyUpdatedAt.slice(11, 13);
            if (createdHour2[0] === "0") createdHour2 = createdHour2.slice(1);
            createdHour2 = parseInt(createdHour2);
            let createdMinute2 = deck2.deckStudyUpdatedAt.slice(14, 16);
            if (createdMinute2[0] === "0") createdMinute2 = createdMinute2.slice(1);
            createdMinute2 = parseInt(createdMinute2);
            let createdSecond2 = deck2.deckStudyUpdatedAt.slice(17, 19);
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

          this.setState({ decks: sortedDecks, decksSorted: true, loading: false });
        });
      } else {
        this.props.fetchDeckStudy(deck.id, this.props.ownProps.match.params.userId).then(() => {
          deck.deckStudyId = this.props.deckStudy.id;
          deck.deckStudyStudierId = this.props.deckStudy.studierId;
          deck.deckStudyUpdatedAt = this.props.deckStudy.updatedAt;
          deck.deckStudyCreatedAt = this.props.deckStudy.createdAt;
          this.sortDecks(sortedDecks, currentDeckIdx + 1);
        });
      }
    
  }

  handleRedirect(deckId) {
    return e => {
      if (e.target.className !== "trash-link" && e.target.className !== "user-page-link") {
        this.setState({ redirect: `/${deckId}/flash-cards`})
      }
    }
  }

  handleDelete(deckStudyId, dkOwnerId, dsOwnerId, dkId) {
    return e => {
      if (dkOwnerId === dsOwnerId) {
        this.props.deleteDeckStudy(deckStudyId).then(() => this.props.createDeckStudy({ progress: 1, rating: null, studierId: dsOwnerId, deckId: dkId })).then(() => this.props.fetchDecks()).then(() => this.sortDecks(this.props.decks, 0));
      } else {
        this.props.deleteDeckStudy(deckStudyId);
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
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

      if (currentDay === updatedDay && currentMonth + 1 === updatedMonth && currentYear === updatedYear ||
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
            <ClipLoader
              css={override}
              size={150}
              loading={this.state.loading}
            />
            {this.state.decks.length === 0 && !this.state.loading && this.props.currentUser.id !== this.props.user.id ?
              <div className="no-latest">
                <h2>{this.props.user.username} has no studied decks</h2>
              </div>
              : this.state.decks.length === 0 && !this.state.loading ?
                <div className="no-latest">
                  <h2>Let's get started!</h2>
                  <Link to="/create-deck" className="large-create-card teal" >Create Deck</Link>
                </div>
                : ""
            }
            {today.length > 0 ?
              <div className="recent-divider">
                <p>TODAY</p>
                <span></span>
              </div> : ""
            }
            {today.map((deck, index) => (
                <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this) } className="small-deck-tile">
                  <div className="small-deck-tile-left">
                    <div className="small-deck-tile-top">
                      <p>{deck.cardCount} Terms </p>
                      <Link to={`/${deck.ownerId}/created`} className="user-page-link">{this.props.users[deck.ownerId].username}</Link>
                    </div>
                    <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                    </div>
                  </div>
                {this.props.user.id === this.props.currentUser.id ?
                  <div className="small-deck-tile-right dsdelete-dropdown">
                    <i className="fas fa-ellipsis-h dsdelete-dropbtn"></i>
                    <div className="dsdelete-dropdown-content">
                      
                      <span className="trash-link" onClick={this.handleDelete(deck.deckStudyId, deck.ownerId, deck.deckStudyStudierId, deck.id).bind(this)} ><i className="fas fa-trash-alt"></i><p>Remove</p></span>
                    </div>
                  </div>
                : "" }
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
                <div className="small-deck-tile-left">
                  <div className="small-deck-tile-top">
                    <p>{deck.cardCount} Terms </p>
                    <Link to={`/${deck.ownerId}/created`} className="user-page-link">{this.props.users[deck.ownerId].username}</Link>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                  </div>
                </div>
                {this.props.user.id === this.props.currentUser.id ?
                  <div className="small-deck-tile-right dsdelete-dropdown">
                    <i className="fas fa-ellipsis-h dsdelete-dropbtn"></i>
                    <div className="dsdelete-dropdown-content">

                      <span className="trash-link" onClick={this.handleDelete(deck.deckStudyId, deck.ownerId, deck.deckStudyStudierId, deck.id).bind(this)} ><i className="fas fa-trash-alt"></i><p>Remove</p></span>
                    </div>
                  </div>
                  : ""}
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
                <div className="small-deck-tile-left">
                  <div className="small-deck-tile-top">
                    <p>{deck.cardCount} Terms </p>
                    <Link to={`/${deck.ownerId}/created`} className="user-page-link">{this.props.users[deck.ownerId].username}</Link>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                  </div>
                </div>
                {this.props.user.id === this.props.currentUser.id ?
                  <div className="small-deck-tile-right dsdelete-dropdown">
                    <i className="fas fa-ellipsis-h dsdelete-dropbtn"></i>
                    <div className="dsdelete-dropdown-content">

                      <span className="trash-link" onClick={this.handleDelete(deck.deckStudyId, deck.ownerId, deck.deckStudyStudierId, deck.id).bind(this)} ><i className="fas fa-trash-alt"></i><p>Remove</p></span>
                    </div>
                  </div>
                  : ""}
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
                <div className="small-deck-tile-left">
                  <div className="small-deck-tile-top">
                    <p>{deck.cardCount} Terms </p>
                    <Link to={`/${deck.ownerId}/created`} className="user-page-link">{this.props.users[deck.ownerId].username}</Link>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                  </div>
                </div>
                {this.props.user.id === this.props.currentUser.id ?
                  <div className="small-deck-tile-right dsdelete-dropdown">
                    <i className="fas fa-ellipsis-h dsdelete-dropbtn"></i>
                    <div className="dsdelete-dropdown-content">

                      <span className="trash-link" onClick={this.handleDelete(deck.deckStudyId, deck.ownerId, deck.deckStudyStudierId, deck.id).bind(this)} ><i className="fas fa-trash-alt"></i><p>Remove</p></span>
                    </div>
                  </div>
                  : ""}
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
                <div className="small-deck-tile-left">
                  <div className="small-deck-tile-top">
                    <p>{deck.cardCount} Terms </p>
                    <Link to={`/${deck.ownerId}/created`} className="user-page-link">{this.props.users[deck.ownerId].username}</Link>
                  </div>
                  <div className="small-deck-tile-bottom" >
                    <h3>{deck.title} {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</h3>
                  </div>
                </div>
                {this.props.user.id === this.props.currentUser.id ?
                  <div className="small-deck-tile-right dsdelete-dropdown">
                    <i className="fas fa-ellipsis-h dsdelete-dropbtn"></i>
                    <div className="dsdelete-dropdown-content">

                      <span className="trash-link" onClick={this.handleDelete(deck.deckStudyId, deck.ownerId, deck.deckStudyStudierId, deck.id).bind(this)} ><i className="fas fa-trash-alt"></i><p>Remove</p></span>
                    </div>
                  </div>
                  : ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Studied;
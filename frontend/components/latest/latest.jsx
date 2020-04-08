import React from 'react';
import {
    Link,
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

class Latest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            decks: [],
            decksSorted: false,
            redirect: null,
            loading: true
        }
    }

    componentDidMount() {
        this.props.fetchDecks().then(() => 
            {
                if (this.props.decks.length > 0) {
                    this.sortDecks(this.props.decks, 0);
                } else {
                    this.setState({loading: false});
                }
            });
        this.props.fetchUsers();
    }

    sortDecks(decks, currentDeckIdx) {
        let sortedDecks = Object.assign([], decks.map(deck => Object.assign({}, deck)));
        // for (let i = 0; i < sortedDecks.length; i++) {
        const deck = sortedDecks[currentDeckIdx];
        if (currentDeckIdx === sortedDecks.length - 1) {
            this.props.fetchDeckStudy(deck.id)
                .then(() => {
                    deck.deckStudyUpdatedAt = this.props.deckStudy.updatedAt
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
            this.props.fetchDeckStudy(deck.id).then(() => {
                deck.deckStudyUpdatedAt = this.props.deckStudy.updatedAt;
                this.sortDecks(sortedDecks, currentDeckIdx + 1);
            });
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
        

        return (
            <div className="latest">
                <div className="latest-header">
                    <h1>RECENT</h1>
                    <Link to={`/${this.props.currentUser.id}/recent`}><p>View all</p><i className="fas fa-chevron-right"></i></Link>
                </div>
                <div className="medium-deck-tiles">
                    <ClipLoader
                        css={override}
                        size={150}
                        loading={this.state.loading}
                    />
                    {this.state.decks.length === 0 && !this.state.loading ?
                        <div className="no-latest">
                            <h2>Let's get started!</h2>
                            <Link to="/create-deck" className="large-create-card teal" >Create Deck</Link>
                        </div>
                            : ""
                    }
                    { this.state.decks.map((deck, index) => (
                        index > 5 ? "" :
                        <div key={deck.id} onClick={this.handleRedirect(deck.id).bind(this)} className="medium-deck-tile">
                            <div className="medium-deck-tile-inner">
                                <div className="medium-deck-tile-right">
                                    <h3>{deck.title}</h3>
                                    <p>{deck.cardCount} terms {deck.visibility === "Everyone" ? "" : <i className="fas fa-lock"></i>}</p>
                                    <Link to={`/${deck.ownerId}/created`}>{this.props.users[deck.ownerId].username}</Link>
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

export default Latest;
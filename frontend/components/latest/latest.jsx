import React from 'react'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../../util/route_util';

class Latest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            decks: [],
            decksSorted: false
        }
    }

    componentDidMount() {
        this.props.fetchDecks();
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
        
        this.setState({decks: sortedDecks, decksSorted: true});
    }


    render() {
        if (this.props.decks.length > 0 && this.state.decksSorted === false) {
            this.sortDecks();
        }

        return (
            <div className="latest">
                <div className="latest-header">
                    <h1>RECENT</h1>
                    <Link to="/"><p>View all</p><i className="fas fa-chevron-right"></i></Link>
                </div>
                <div className="medium-deck-tiles">
                    { this.state.decks.map(deck => (
                        <div className="medium-deck-tile">
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

export default Latest;
import React from 'react'
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../../util/route_util';

class MainContent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            decks: []
        }
    }

    componentDidMount() {
        this.props.fetchDecks();
        this.props.fetchUsers();
    }



    render() {
        
        return (
            <div className="latest">
                <div className="latest-header">
                    <h1>Recent</h1>
                    <Link to="/"><p>View all</p><i class="fas fa-chevron-right"></i></Link>
                </div>
                {this.props.decks.map(deck => (
                    <div className="medium-deck-tile">
                        <div className="medium-deck-tile-top">
                            <div className="medium-deck-tile-top-left">
                                <h3>{deck.title}</h3>
                                <p>{deck.card_count}</p>
                            </div>
                        </div>
                        <div className="medium-deck-tile-bottom" >
                            <p>{this.props.users[this.props.deck.ownerId]}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default MainContent;
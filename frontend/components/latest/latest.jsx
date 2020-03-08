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
                    <h1>RECENT</h1>
                    <Link to="/"><p>View all</p><i className="fas fa-chevron-right"></i></Link>
                </div>
                <div className="medium-deck-tiles">
                    { this.props.decks.map(deck => (
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
import { connect } from 'react-redux';
import { fetchDecks } from '../../actions/deck_actions';
import { fetchDeckStudy } from '../../actions/deck_study_actions'
import { fetchCards } from '../../actions/card_actions';
import { fetchUsers } from '../../actions/session_actions';
import Latest from './latest';

const mapStateToProps = (state) => {
    let allDecks = Object.keys(state.entities.decks).map(key => state.entities.decks[key]);
    let visibleDecks = [];
    for (let i = 0; i < allDecks.length; i++) {
        const deck = allDecks[i];
        if (deck.visibility === "Everyone" || (deck.visibility === "Just me" && deck.id === state.entities.users[state.session.id].id)) {
            visibleDecks.push(deck);
        }
    }
    return {
        decks: visibleDecks,
        deckStudy: Object.values(state.entities.deckStudies)[0],
        currentUser: state.entities.users[state.session.id],
        users: state.entities.users
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDecks: () => dispatch(fetchDecks()),
    fetchCards: (deckId) => dispatch(fetchCards(deckId)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchDeckStudy: deckId => dispatch(fetchDeckStudy(deckId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Latest);
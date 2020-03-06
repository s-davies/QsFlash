import { connect } from 'react-redux';
import { fetchDeck, deleteDeck } from '../../actions/deck_actions';
import { fetchCards } from '../../actions/card_actions';
import { fetchDeckStudy, fetchDeckStudies, updateDeckStudy } from '../../actions/deck_study_actions';
import { fetchUsers } from '../../actions/session_actions';
import DeckPage from './deck_page'

const mapStateToProps = (state, ownProps) => {
    let creator = state.entities.decks[ownProps.match.params.deckId] === undefined ? {} : state.entities.users[state.entities.decks[ownProps.match.params.deckId].ownerId]
    // debugger
    return {
        deck: state.entities.decks[ownProps.match.params.deckId],
        cards: Object.keys(state.entities.cards).map(key => state.entities.cards[key]).sort((a, b) => (a.order > b.order) ? 1 : -1),
        deckStudies: Object.values(state.entities.deckStudies),
        creator: creator,
        currentUser: state.entities.users[state.session.id]
        // deckStudies: Object.values(state.entities.deckStudies)
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDeck: deckId => dispatch(fetchDeck(deckId)),
    deleteDeck: deckId => dispatch(deleteDeck(deckId)),
    fetchCards: (deckId) => dispatch(fetchCards(deckId)),
    fetchDeckStudy: (deckId) => dispatch(fetchDeckStudy(deckId)),
    fetchDeckStudies: (deckId) => dispatch(fetchDeckStudies(deckId)),
    updateDeckStudy: (deckStudy) => dispatch(updateDeckStudy(deckStudy)),
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckPage);
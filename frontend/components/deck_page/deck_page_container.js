import { connect } from 'react-redux';
import { fetchDeck, deleteDeck } from '../../actions/deck_actions';
import { fetchCards } from '../../actions/card_actions';
import { fetchDeckStudy, fetchDeckStudies, updateDeckStudy } from '../../actions/deck_study_actions';
import DeckPage from './deck_page'

const mapStateToProps = (state, ownProps) => {
    return {
        deck: state.entities.decks[ownProps.match.params.deckId],
        cards: Object.keys(state.entities.cards).map(key => state.entities.cards[key]).sort((a, b) => (a.order > b.order) ? 1 : -1),
        deckStudies: Object.values(state.entities.deckStudies),
        creator: state.entities.users[state.entities.decks[ownProps.match.params.deckId].ownerId],
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
    // fetchUsers: ()
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckPage);
import { connect } from 'react-redux';
import { fetchDeck, deleteDeck } from '../../actions/deck_actions';
import { fetchCards } from '../../actions/card_actions';
import { fetchDeckStudy, fetchDeckStudies, updateDeckStudy } from '../../actions/deck_study_actions';
import { fetchUsers } from '../../actions/session_actions';
import MainContent from './deck_page'

const mapStateToProps = (state) => {

    return {
        decks: Object.keys(state.entities.decks).map(key => state.entities.decks[key]),
        cardCount: Object.keys(state.entities.cards).length,
        users: state.entities.users
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDecks: () => dispatch(fetchDecks()),
    fetchCards: (deckId) => dispatch(fetchCards(deckId)),
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
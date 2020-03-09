import { connect } from 'react-redux';
import { fetchDecks } from '../../actions/deck_actions';
import { fetchCards } from '../../actions/card_actions';
import { fetchUsers } from '../../actions/session_actions';
import Latest from './latest';

const mapStateToProps = (state) => {
    return {
        decks: Object.keys(state.entities.decks).map(key => state.entities.decks[key]),
        currentUser: state.entities.users[state.session.id],
        users: state.entities.users
    }
};

const mapDispatchToProps = dispatch => ({
    fetchDecks: () => dispatch(fetchDecks()),
    fetchCards: (deckId) => dispatch(fetchCards(deckId)),
    fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Latest);
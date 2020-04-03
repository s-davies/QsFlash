import { connect } from 'react-redux';
import { searchDecks } from '../../actions/deck_actions';
import { fetchCards } from '../../actions/card_actions';
import { fetchUsers } from '../../actions/session_actions';
import Search from './search';

const mapStateToProps = (state, ownProps) => {
  let decks = Object.assign({}, state.entities.decks);

    let allCards = Object.values(state.entities.cards);
    for (let i = 0; i < allCards.length; i++) {
      const card = allCards[i];
      if (decks.hasOwnProperty(card.deckId)) {
        decks[card.deckId][card.order] = card;
      }
    }
    let allDecks = Object.keys(decks).map(key => decks[key]);
  return {
    searchTerm: ownProps.match.params.searchTerm,
    decks: allDecks,
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
  }
};

const mapDispatchToProps = dispatch => ({
  searchDecks: (searchTerm) => dispatch(searchDecks(searchTerm)),
  fetchCards: (deckId) => dispatch(fetchCards(deckId)),
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
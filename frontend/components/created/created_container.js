import { connect } from 'react-redux';
import { fetchDecks } from '../../actions/deck_actions';
import { fetchCards } from '../../actions/card_actions';
import { fetchFolders } from '../../actions/folder_actions';
import { fetchUsers } from '../../actions/session_actions';
import Created from './created';

const mapStateToProps = (state, ownProps) => {
  let allDecks = Object.keys(state.entities.decks).map(key => state.entities.decks[key]);
  let createdDecksCt = 0;
  let createdDecks = [];

  for (let i = 0; i < allDecks.length; i++) {
    const deck = allDecks[i];
    if (deck.ownerId === parseInt(ownProps.ownProps.match.params.userId)
      && (deck.visibility === "Everyone" || (deck.visibility === "Just me" && parseInt(ownProps.ownProps.match.params.userId) === state.entities.users[state.session.id].id))) {
      createdDecksCt += 1;
      createdDecks.push(deck);
    }
  }

  let allFolders = Object.keys(state.entities.folders).map(key => state.entities.folders[key]);
  let createdFoldersCt = 0;

  for (let i = 0; i < allFolders.length; i++) {
    const folder = allFolders[i];
    if (folder.ownerId === parseInt(ownProps.ownProps.match.params.userId)) {
      createdFoldersCt += 1;
    }
  }

  return {
    decks: createdDecks,
    createdDecksCount: createdDecksCt,
    createdFoldersCount: createdFoldersCt,
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    user: state.entities.users[ownProps.ownProps.match.params.userId]
  }
};

const mapDispatchToProps = dispatch => ({
  fetchDecks: (optUserId) => dispatch(fetchDecks(optUserId)),
  fetchFolders: (optUserId) => dispatch(fetchFolders(optUserId)),
  fetchCards: (deckId) => dispatch(fetchCards(deckId)),
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Created);
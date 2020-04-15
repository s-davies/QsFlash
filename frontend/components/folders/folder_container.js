import { connect } from 'react-redux';
import { fetchDecks } from '../../actions/deck_actions';
import { fetchFolders, updateFolder, deleteFolder } from '../../actions/folder_actions';
import { fetchFolderDecks, createFolderDeck, deleteFolderDeck } from '../../actions/folder_deck_actions';
import { fetchUsers } from '../../actions/session_actions';
import Folder from './folder';

const mapStateToProps = (state, ownProps) => {
  let allDecks = Object.keys(state.entities.decks).map(key => Object.assign({}, state.entities.decks[key]));
  let folderDecks = {};
  for (let i = 0; i < Object.values(state.entities.folderDecks).length; i++) {
    const folderDeck = Object.values(state.entities.folderDecks)[i];
    folderDecks[folderDeck.deckId] = folderDeck;
  }
  let visibleDecks = [];
  let usersDecks = [];
  let folder = state.entities.folders[ownProps.ownProps.match.params.folderId];
  for (let i = 0; i < allDecks.length; i++) {
    const deck = allDecks[i];
    if (deck.visibility === "Everyone" || (deck.visibility === "Just me" && deck.ownerId === state.entities.users[state.session.id].id)) {
      if (folder && folderDecks[deck.id]) {
        deck.folderDeckId = folderDecks[deck.id].id;
        visibleDecks.push(deck);
      }
      usersDecks.push(deck);
    }
  }


  return {
    folder: folder,
    decks: visibleDecks,
    usersDecks: usersDecks,
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    user: state.entities.users[ownProps.ownProps.match.params.userId]
  }
};

const mapDispatchToProps = dispatch => ({
  fetchDecks: (optFolderId) => dispatch(fetchDecks(optFolderId)),
  fetchFolderDecks: (folderId) => dispatch(fetchFolderDecks(folderId)),
  createFolderDeck: (folderDeck) => dispatch(createFolderDeck(folderDeck)),
  deleteFolderDeck: (folderDeckId) => dispatch(deleteFolderDeck(folderDeckId)),
  fetchFolders: (optUserId) => dispatch(fetchFolders(optUserId)),
  updateFolder: (folder) => dispatch(updateFolder(folder)),
  deleteFolder: folderId => dispatch(deleteFolder(folderId)),
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
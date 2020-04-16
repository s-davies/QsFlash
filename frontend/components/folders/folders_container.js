import { connect } from 'react-redux';
import { fetchDecks } from '../../actions/deck_actions';
import { fetchFolders, createFolder } from '../../actions/folder_actions';
import { fetchFolderDecks } from '../../actions/folder_deck_actions';
import { fetchCards } from '../../actions/card_actions';
import { fetchUsers } from '../../actions/session_actions';
import Folders from './folders';

const mapStateToProps = (state, ownProps) => {
  let allFoldersObj = {};
  for (let i = 0; i < Object.values(state.entities.folders).length; i++) {
    const folder = Object.values(state.entities.folders)[i];
    allFoldersObj[folder.id] = Object.assign({}, folder);
    allFoldersObj[folder.id].deckCt = 0;
  }
  
  let folderDecks = Object.values(state.entities.folderDecks);
  for (let i = 0; i < folderDecks.length; i++) {
    const folderDeck = folderDecks[i];
    if (state.entities.folders[folderDeck.folderId] &&
      state.entities.decks[folderDeck.deckId] &&
      (state.entities.decks[folderDeck.deckId].visibility === "Everyone" ||
      (state.entities.decks[folderDeck.deckId].visibility === "Just me" && parseInt(ownProps.ownProps.match.params.userId) === state.entities.users[state.session.id].id))) {

        allFoldersObj[folderDeck.folderId].deckCt += 1;
    }
  }
  let allFolders = Object.keys(allFoldersObj).map(key => allFoldersObj[key]).reverse();
  let createdFoldersCt = 0;
  for (let i = 0; i < allFolders.length; i++) {
    const folder = allFolders[i];
    if (folder.ownerId === parseInt(ownProps.ownProps.match.params.userId)) {
      createdFoldersCt += 1;
    }
  }

  let allDecks = Object.keys(state.entities.decks).map(key => state.entities.decks[key]);
  let createdDecksCt = 0;

  for (let i = 0; i < allDecks.length; i++) {
    const deck = allDecks[i];
    if (deck.ownerId === parseInt(ownProps.ownProps.match.params.userId)
      && (deck.visibility === "Everyone" || (deck.visibility === "Just me" && parseInt(ownProps.ownProps.match.params.userId) === state.entities.users[state.session.id].id))) {
      createdDecksCt += 1;
    }
  }

  return {
    folders: allFolders,
    createdFoldersCount: createdFoldersCt,
    createdDecksCount: createdDecksCt,
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    user: state.entities.users[ownProps.ownProps.match.params.userId]
  }
};

const mapDispatchToProps = dispatch => ({
  fetchDecks: (optUserId) => dispatch(fetchDecks(optUserId)),
  fetchFolders: (optUserId) => dispatch(fetchFolders(optUserId)),
  fetchFolderDecks: () => dispatch(fetchFolderDecks()),
  createFolder: (folder) => dispatch(createFolder(folder)),
  fetchCards: (deckId) => dispatch(fetchCards(deckId)),
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
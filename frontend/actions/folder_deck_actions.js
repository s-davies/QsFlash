import * as FolderDeckApiUtil from '../util/folder_decks_api_util';

export const RECEIVE_ALL_FOLDER_DECKS = 'RECEIVE_ALL_FOLDER_DECKS';
export const RECEIVE_FOLDER_DECK = 'RECEIVE_FOLDER_DECK';
export const REMOVE_FOLDER_DECK = 'REMOVE_FOLDER_DECK';

const receiveAllFolderDecks = folderDecks => ({
  type: RECEIVE_ALL_FOLDER_DECKS,
  folderDecks
});

const receiveFolderDeck = folderDeck => {
  return {
    type: RECEIVE_FOLDER_DECK,
    folderDeck
  }
};

const removeFolderDeck = folderDeckId => ({
  type: REMOVE_FOLDER_DECK,
  folderDeckId
});

export const fetchFolderDecks = (folderId) => dispatch => (
  FolderDeckApiUtil.fetchFolderDecks(folderId)
    .then(folderDecks => dispatch(receiveAllFolderDecks(folderDecks)))
);

export const createFolderDeck = folderDeck => dispatch => (
  FolderDeckApiUtil.createFolderDeck(folderDeck)
    .then(folderDeck => dispatch(receiveFolderDeck(folderDeck)))
);

export const deleteFolderDeck = folderDeckId => dispatch => (
  FolderDeckApiUtil.deleteFolderDeck(folderDeckId)
    .then(() => dispatch(removeFolderDeck(folderDeckId)))
);

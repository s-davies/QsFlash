import {
  RECEIVE_ALL_FOLDER_DECKS,
  RECEIVE_FOLDER_DECK,
  REMOVE_FOLDER_DECK
} from '../actions/folder_deck_actions';

const folderDecksReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_FOLDER_DECKS:
      newState = action.folderDecks;
      return newState;
    case RECEIVE_FOLDER_DECK:
      newState = {};
      newState[action.folderDeck.id] = action.folderDeck;
      return newState;
    case REMOVE_FOLDER_DECK:
      delete newState[action.folderDeckId];
      return newState;
    default:
      return state;
  }
}
export default folderDecksReducer;
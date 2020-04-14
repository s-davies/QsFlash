import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import decksReducer from './decks_reducer';
import foldersReducer from './folders_reducer';
import cardsReducer from './cards_reducer';
import deckStudiesReducer from './deck_studies_reducer';
import cardStudiesReducer from './card_studies_reducer';

export default combineReducers({
  users: usersReducer,
  decks: decksReducer,
  folders: foldersReducer,
  cards: cardsReducer,
  deckStudies: deckStudiesReducer,
  cardStudies: cardStudiesReducer,
});

import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import decksReducer from './decks_reducer';
import cardsReducer from './cards_reducer';

export default combineReducers({
  users: usersReducer,
  decks: decksReducer,
  cards: cardsReducer
});

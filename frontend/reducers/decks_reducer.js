import {
    RECEIVE_ALL_DECKS,
    RECEIVE_DECK,
    REMOVE_DECK,
} from '../actions/deck_actions';

const decksReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_DECKS:
            newState = action.decks;
            return newState;
        case RECEIVE_DECK:
            newState[action.deck.id] = action.deck;
            return newState;
        case REMOVE_DECK:
            delete newState[action.deckId];
            return newState;
        default:
            return state;
    }
}
export default decksReducer;
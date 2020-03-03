import {
    RECEIVE_CARD_ERRORS,
    RECEIVE_CARD,
} from '../actions/deck_actions';

const cardsErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CARD_ERRORS:
            return action.errors;
        case RECEIVE_CARD:
            return [];
        default:
            return state;
    }
};

export default cardsErrorsReducer;
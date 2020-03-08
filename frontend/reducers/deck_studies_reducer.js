import {
    RECEIVE_ALL_DECK_STUDIES,
    RECEIVE_DECK_STUDY
} from '../actions/deck_study_actions';

const deckStudiesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_DECK_STUDIES:
            newState = action.deckStudies;
            return newState;
        case RECEIVE_DECK_STUDY:
            newState = {};
            newState[action.deckStudy.id] = action.deckStudy;
            return newState;
        default:
            return state;
    }
}
export default deckStudiesReducer;
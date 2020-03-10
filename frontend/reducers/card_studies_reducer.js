import {
  RECEIVE_ALL_CARD_STUDIES,
  RECEIVE_CARD_STUDY,
  REMOVE_CARD_STUDY
} from '../actions/card_study_actions';

const cardStudiesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_CARD_STUDIES:
      newState = action.cardStudies;
      return newState;
    case RECEIVE_CARD_STUDY:
      newState = {};
      newState[action.cardStudy.id] = action.cardStudy;
      return newState;
    case REMOVE_CARD_STUDY:
      delete newState[action.cardStudyId];
      return newState;
    default:
      return state;
  }
}
export default cardStudiesReducer;


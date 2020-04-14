import {
  RECEIVE_FOLDER_ERRORS,
  RECEIVE_FOLDER,
} from '../actions/folder_actions';

const foldersErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FOLDER_ERRORS:
      return action.errors;
    case RECEIVE_FOLDER:
      return [];
    default:
      return state;
  }
};

export default foldersErrorsReducer;
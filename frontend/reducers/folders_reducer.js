import {
  RECEIVE_ALL_FOLDERS,
  RECEIVE_FOLDER,
  REMOVE_FOLDER,
} from '../actions/folder_actions';

const foldersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_FOLDERS:
      newState = action.folders;
      return newState;
    case RECEIVE_FOLDER:
      newState[action.folder.id] = action.folder;
      return newState;
    case REMOVE_FOLDER:
      delete newState[action.folderId];
      return newState;
    default:
      return state;
  }
}
export default foldersReducer;
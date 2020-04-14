import * as FolderApiUtil from '../util/folders_api_util';

export const RECEIVE_ALL_FOLDERS = 'RECEIVE_ALL_FOLDERS';
export const RECEIVE_FOLDER = 'RECEIVE_FOLDER';
export const REMOVE_FOLDER = 'REMOVE_FOLDER';
export const RECEIVE_FOLDER_ERRORS = 'RECEIVE_FOLDER_ERRORS';

const receiveErrors = errors => ({
  type: RECEIVE_FOLDER_ERRORS,
  errors
});

const receiveAllFolders = folders => ({
  type: RECEIVE_ALL_FOLDERS,
  folders
});

const receiveFolder = folder => ({
  type: RECEIVE_FOLDER,
  folder
});

const removeFolder = folderId => ({
  type: REMOVE_FOLDER,
  folderId
});

export const fetchFolders = (optUserId) => dispatch => (
  FolderApiUtil.fetchFolders(optUserId)
    .then(folders => dispatch(receiveAllFolders(folders)), err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

// export const searchFolders = (searchTerm) => dispatch => (
//   FolderApiUtil.searchFolders(searchTerm)
//     .then(folders => dispatch(receiveAllFolders(folders)), err => (
//       dispatch(receiveErrors(err.responseJSON))
//     ))
// );

export const fetchFolder = folderId => dispatch => (
  FolderApiUtil.fetchFolder(folderId)
    .then(folder => dispatch(receiveFolder(folder)), err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

export const createFolder = folder => dispatch => (
  FolderApiUtil.createFolder(folder)
    .then(folder => dispatch(receiveFolder(folder)), err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

export const updateFolder = folder => dispatch => (
  FolderApiUtil.updateFolder(folder)
    .then(folder => dispatch(receiveFolder(folder)), err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

export const deleteFolder = folderId => dispatch => (
  FolderApiUtil.deleteFolder(folderId)
    .then(() => dispatch(removeFolder(folderId)), err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);
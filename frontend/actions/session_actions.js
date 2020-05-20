import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const receiveCurrentUser = currentUser => {
  return {
  type: RECEIVE_CURRENT_USER,
  currentUser
}};

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  }
};

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const fetchUsers = () => dispatch => {
  return APIUtil.fetchUsers().then(users => (
    dispatch(receiveUsers(users))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
};

export const signup = user => dispatch => {
  return APIUtil.signup(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
};

export const updateUser = user => dispatch => {
  return APIUtil.updateUser(user).then(user => (
    dispatch(logoutCurrentUser())
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
};

export const login = user => dispatch => (
  APIUtil.login(user).then(user => (
    dispatch(receiveCurrentUser(user))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(user => (
    dispatch(logoutCurrentUser())
  ))
);

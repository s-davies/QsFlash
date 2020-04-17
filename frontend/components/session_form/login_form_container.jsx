import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, fetchUsers } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    usernames: new Set(Object.keys(state.entities.users).map(key => state.entities.users[key].username)),
    emails: new Set(Object.keys(state.entities.users).map(key => state.entities.users[key].email)),
    formType: 'Log in'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    login: (user) => dispatch(login(user)),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

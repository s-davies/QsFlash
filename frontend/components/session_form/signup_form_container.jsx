import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, fetchUsers } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    usernames: new Set(Object.keys(state.entities.users).map(key => state.entities.users[key].username)),
    emails: new Set(Object.keys(state.entities.users).map(key => state.entities.users[key].email)),
    formType: 'Sign up',

  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
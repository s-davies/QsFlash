import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, fetchUsers, updateUser } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
  let loginInfoNum;
  for (let i = 0; i < Object.values(state.entities.users).length; i++) {
    const user = Object.values(state.entities.users)[i];
    if (user.username === "loginInfo") {
      //fetch login num for demo user, using school id as a dummy variable holder
      loginInfoNum = user.schoolId;
    }
  }
  return {
    errors: state.errors.session,
    usernames: new Set(Object.keys(state.entities.users).map(key => state.entities.users[key].username)),
    emails: new Set(Object.keys(state.entities.users).map(key => state.entities.users[key].email)),
    loginInfoNum: loginInfoNum,
    formType: 'Log in'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    login: (user) => dispatch(login(user)),
    updateUser: user => dispatch(updateUser(user)),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

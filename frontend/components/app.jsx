import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavbarContainer from './navbar/navbar_container'
import UserContent from './user_content/user_content'
import Splash from './splash/splash'
import CreateDeckFormContainer from './deck/create_deck_form_container'
import EditDeckFormContainer from './deck/edit_deck_form_container'

const App = () => (
  <div className="app group">
    <NavbarContainer />
    <AuthRoute exact path="/" component={Splash} />
    <ProtectedRoute exact path="/latest" component={UserContent} />
    <ProtectedRoute exact path="/create-deck" component={CreateDeckFormContainer} />
  </div>
);

export default App;

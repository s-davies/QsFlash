import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavbarContainer from './navbar/navbar_container'
import UserContent from './user_content/user_content'
import Splash from './splash/splash'

const App = () => (
  <div className="app group">
    <NavbarContainer />
    <AuthRoute exact path="/" component={Splash} />
    <ProtectedRoute exact path="/latest" component={UserContent} />
  </div>
);

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import NavbarContainer from './navbar/navbar_container'
import UserContent from './user_content/user_content'
import UserDecks from './user_decks/user_decks';
import StudiedDecks from './user_decks/studied_wrapper';
import CreatedDecks from './user_decks/created_wrapper';
import Splash from './splash/splash'
import CreateDeckFormContainer from './deck/create_deck_form_container'
import EditDeckFormContainer from './deck/edit_deck_form_container'
import DeckPageContainer from './deck_page/deck_page_container'

const App = () => (
  <div className="app group">
    <NavbarContainer />
    <AuthRoute exact path="/" component={Splash} />
    <div className="app-div">
      <ProtectedRoute exact path="/create-deck" component={CreateDeckFormContainer} />
      <ProtectedRoute exact path="/:deckId/edit" component={EditDeckFormContainer} />
      <ProtectedRoute exact path="/latest" component={UserContent} />
      <ProtectedRoute exact path="/:userId/recent" component={UserDecks} />
      <ProtectedRoute exact path="/:userId/created" component={CreatedDecks} />
      <ProtectedRoute exact path="/:userId/studied" component={StudiedDecks} />
      <ProtectedRoute exact path="/:deckId/flash-cards" component={DeckPageContainer} />
    </div>
  </div>
);

export default App;

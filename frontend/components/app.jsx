import React from 'react';
import { Provider } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
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
import LearnContainer from './games/learn_container';
import SpellContainer from './games/spell_container';
import SearchContainer from './search/search_container';

const App = () => (
  <div className="app group">
    <NavbarContainer />
    <AuthRoute exact path="/" component={Splash} />
    <ProtectedRoute exact path="/:deckId/flash-cards" component={DeckPageContainer} />
    <div className="app-div">
      <ProtectedRoute exact path="/create-deck" component={CreateDeckFormContainer} />
      <ProtectedRoute exact path="/:deckId/edit" component={EditDeckFormContainer} />
      <ProtectedRoute exact path="/latest" component={UserContent} />
      <ProtectedRoute exact path="/:userId/recent" component={UserDecks} />
      <ProtectedRoute exact path="/:userId/created" component={CreatedDecks} />
      <ProtectedRoute exact path="/:userId/studied" component={StudiedDecks} />
      
      <ProtectedRoute exact path="/:deckId/learn" component={LearnContainer} />
      <ProtectedRoute exact path="/:deckId/spell" component={SpellContainer} />
      <ProtectedRoute exact path="/search/:searchTerm" component={SearchContainer} />
    </div>
  </div>
);

export default withRouter(App);

import { connect } from 'react-redux';
import { fetchDecks } from '../../actions/deck_actions';
import { fetchDeckStudy, deleteDeckStudy, createDeckStudy } from '../../actions/deck_study_actions'
import { fetchCards } from '../../actions/card_actions';
import { fetchUsers } from '../../actions/session_actions';
import Studied from './studied';

const mapStateToProps = (state, ownProps) => {
  let allDecks = Object.keys(state.entities.decks).map(key => state.entities.decks[key]);
  let createdDecksCt = 0;
  for (let i = 0; i < allDecks.length; i++) {
    const deck = allDecks[i];
    if (deck.ownerId === state.entities.users[state.session.id].id) createdDecksCt += 1;
  }

  return {
    decks: allDecks,
    deckStudy: Object.values(state.entities.deckStudies)[0],
    createdDecksCount: createdDecksCt,
    users: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    user: state.entities.users[ownProps.ownProps.match.params.userId]
  }
};

const mapDispatchToProps = dispatch => ({
  fetchDecks: () => dispatch(fetchDecks()),
  fetchCards: (deckId) => dispatch(fetchCards(deckId)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchDeckStudy: deckId => dispatch(fetchDeckStudy(deckId)),
  deleteDeckStudy: deckStudyId => dispatch(deleteDeckStudy(deckStudyId)),
  createDeckStudy: deckStudy => dispatch(createDeckStudy(deckStudy))
});

export default connect(mapStateToProps, mapDispatchToProps)(Studied);
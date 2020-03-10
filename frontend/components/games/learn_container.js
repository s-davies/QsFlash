import { connect } from 'react-redux';
import { fetchCards } from '../../actions/card_actions'
import { fetchCardStudies } from '../../actions/card_study_actions';
import Learn from './learn';

const mapStateToProps = (state) => {
  let cards = Object.keys(state.entities.cards).map(key => state.entities.cards[key]);
  let cardStudies = state.entities.cardStudies;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.starred = cardStudies[card.id].starred;
    card.correctness_count = cardStudies[card.id].correctnessCount;
    card.learn_count = cardStudies[card.id].learnCount;
  }
  cards = cards.sort((a, b) => (a.order > b.order) ? 1 : -1);
  return {
    cards: cards,
    currentUser: state.entities.users[state.session.id]
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCards: (deckId) => dispatch(fetchCards(deckId)),
  fetchCardStudies: deckId => dispatch(fetchCardStudies(deckId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
import { connect } from 'react-redux';
import { fetchCardStudies } from '';
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
import { connect } from 'react-redux';
import { fetchCards } from '../../actions/card_actions'
import { fetchCardStudies, updateCardStudy } from '../../actions/card_study_actions';
import { fetchDeckStudy, updateDeckStudy } from '../../actions/deck_study_actions';
import FlashCards from './flashcards';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const mapStateToProps = (state) => {
  let cards = Object.keys(state.entities.cards).map(key => state.entities.cards[key]);
  let cardKeys = {};
  let cardStudies = Object.values(state.entities.cardStudies);

  if (Object.values(cardStudies).length > 0 && cards.length === cardStudies.length) {
    for (let i = 0; i < cardStudies.length; i++) {
      const cardStudy = cardStudies[i];
      cardKeys[cardStudy.cardId] = cardStudy;
    }
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      card.cardStudyId = cardKeys[card.id].id;
      card.starred = cardKeys[card.id].starred;
      card.correctnessCount = cardKeys[card.id].correctnessCount;
    }
  }

  // cards = cards.sort((a, b) => (a.order > b.order) ? 1 : -1);
  return {
    cards: cards,
    currentUser: state.entities.users[state.session.id],
    deckStudies: Object.values(state.entities.deckStudies)
  }
};

const mapDispatchToProps = dispatch => ({
  fetchCards: (deckId) => dispatch(fetchCards(deckId)),
  fetchCardStudies: deckId => dispatch(fetchCardStudies(deckId)),
  updateCardStudy: cardStudy => dispatch(updateCardStudy(cardStudy)),
  updateDeckStudy: (deckStudy) => dispatch(updateDeckStudy(deckStudy)),
  fetchDeckStudy: (deckId) => dispatch(fetchDeckStudy(deckId))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
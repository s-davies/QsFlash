import * as CardStudyApiUtil from '../util/card_studies_api_util';

export const RECEIVE_ALL_CARD_STUDIES = 'RECEIVE_ALL_CARD_STUDIES';
export const RECEIVE_CARD_STUDY = 'RECEIVE_CARD_STUDY';
export const REMOVE_CARD_STUDY = 'REMOVE_CARD_STUDY';

//needed for aggragating total studiers
const receiveAllCardStudies = cardStudies => ({
  type: RECEIVE_ALL_CARD_STUDIES,
  cardStudies
});

const receiveCardStudy = cardStudy => {
  return {
    type: RECEIVE_CARD_STUDY,
    cardStudy
  }
};

const removeCardStudy = cardStudyId => ({
  type: REMOVE_CARD_STUDY,
  cardStudyId
});

export const fetchCardStudies = (cardId) => dispatch => (
  CardStudyApiUtil.fetchCardStudies(cardId)
    .then(cardStudies => dispatch(receiveAllCardStudies(cardStudies)))
);

// export const fetchCardStudy = cardId => dispatch => {
//   return CardStudyApiUtil.fetchCardStudy(cardId)
//     .then(cardStudy => {
//       dispatch(receiveCardStudy(cardStudy))
//     }
//     )
// };

export const createCardStudy = cardStudy => dispatch => (
  CardStudyApiUtil.createCardStudy(cardStudy)
    .then(cardStudy => dispatch(receiveCardStudy(cardStudy)))
);

export const updateCardStudy = cardStudy => dispatch => (
  CardStudyApiUtil.updateCardStudy(cardStudy)
    .then(cardStudy => dispatch(receiveCardStudy(cardStudy)))
);

export const deleteCardStudy = cardStudyId => dispatch => (
  CardStudyApiUtil.deleteCardStudy(cardStudyId)
    .then(() => dispatch(removeCardStudy(cardStudyId)), err => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);
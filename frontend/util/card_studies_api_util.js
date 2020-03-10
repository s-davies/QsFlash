export const fetchCardStudies = (deckId) => (
  $.ajax({
    method: 'GET',
    url: `/api/decks/${deckId}/card_studies`
  })
);

// export const fetchCardStudy = (deckId) => (
//   $.ajax({
//     method: 'GET',
//     url: `/api/decks/${deckId}/card_studies/1000` //dummy number at end to send to show action
//   })
// );

export const createCardStudy = (cardStudy) => (
  $.ajax({
    method: 'POST',
    url: `/api/card_studies`,
    data: { cardStudy }
  })
);

export const updateCardStudy = (cardStudy) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/card_studies/${cardStudy.id}`,
    data: { cardStudy }
  })
);

export const deleteCardStudy = (cardStudyId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/card_studies/${cardStudyId}`
  })
);
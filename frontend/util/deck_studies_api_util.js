export const fetchDeckStudies = (deckId) => (
    $.ajax({
        method: 'GET',
        url: `/api/decks/${deckId}/deck_studies`
    })
);

export const fetchDeckStudy = (deckId) => (
    $.ajax({
        method: 'GET',
        url: `/api/decks/${deckId}/deck_studies/1000` //dummy number at end to send to show action
    })
);

export const createDeckStudy = (deckStudy) => (
    $.ajax({
        method: 'POST',
        url: `/api/deck_studies`,
        data: { deckStudy }
    })
);

export const updateDeckStudy = (deckStudy) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/deck_studies/${deckStudy.id}`,
        data: { deckStudy }
    })
);

export const fetchDecks = () => (
    $.ajax({
        method: 'GET',
        url: `/api/decks`
    })
);

export const fetchDeck = (deckId) => (
    $.ajax({
        method: 'GET',
        url: `/api/decks/${deckId}`
    })
);

export const createDeck = (deck) => (
    $.ajax({
        method: 'POST',
        url: `/api/decks`,
        data: {deck}
    })
);

export const updateDeck = (deck) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/decks/${deck.id}`,
        data: { deck }
    })
);

export const deleteDeck = (deckId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/decks/${deckId}`
    })
);
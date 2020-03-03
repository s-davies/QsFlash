export const fetchCards = (deckId) => (
    $.ajax({
        method: 'GET',
        url: `/api/cards`,
        data: deckId
    })
);

export const fetchCard = (cardId) => (
    $.ajax({
        method: 'GET',
        url: `/api/cards/${cardId}`
    })
);

export const createCard = (card) => (
    $.ajax({
        method: 'POST',
        url: `/api/cards`,
        data: { card }
    })
);

export const updateCard = (card) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/cards/${card.id}`,
        data: { card }
    })
);

export const deleteCard = (cardId) => (
    $.ajax({
        method: 'DELETE',
        url: `/api/cards/${cardId}`
    })
);
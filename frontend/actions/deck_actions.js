import * as DeckApiUtil from '../util/decks_api_util';

export const RECEIVE_ALL_DECKS = 'RECEIVE_ALL_DECKS';
export const RECEIVE_DECK = 'RECEIVE_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const RECEIVE_DECK_ERRORS = 'RECEIVE_DECK_ERRORS';

const receiveErrors = errors => ({
    type: RECEIVE_DECK_ERRORS,
    errors
});

const receiveAllDecks = decks => ({
    type: RECEIVE_ALL_DECKS,
    decks
});

const receiveDeck = deck => ({
    type: RECEIVE_DECK,
    deck
});

const removeDeck = deckId => ({
    type: REMOVE_DECK,
    deckId
});

export const fetchDecks = (optUserId) => dispatch => (
    DeckApiUtil.fetchDecks(optUserId)
        .then(decks => dispatch(receiveAllDecks(decks)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const searchDecks = (searchTerm) => dispatch => (
    DeckApiUtil.searchDecks(searchTerm)
        .then(decks => dispatch(receiveAllDecks(decks)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const fetchDeck = deckId => dispatch => (
    DeckApiUtil.fetchDeck(deckId)
        .then(deck => dispatch(receiveDeck(deck)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const createDeck = deck => dispatch => (
    DeckApiUtil.createDeck(deck)
        .then(deck => dispatch(receiveDeck(deck)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const updateDeck = deck => dispatch => (
    DeckApiUtil.updateDeck(deck)
        .then(deck => dispatch(receiveDeck(deck)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const deleteDeck = deckId => dispatch => (
    DeckApiUtil.deleteDeck(deckId)
        .then(() => dispatch(removeDeck(deckId)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);
import * as CardApiUtil from '../util/cards_api_util';

export const RECEIVE_ALL_CARDS = 'RECEIVE_ALL_CARDS';
export const RECEIVE_CARD = 'RECEIVE_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const RECEIVE_CARD_ERRORS = 'RECEIVE_CARD_ERRORS';

const receiveErrors = errors => ({
    type: RECEIVE_CARD_ERRORS,
    errors
});

const receiveAllCards = cards => ({
    type: RECEIVE_ALL_CARDS,
    cards
});

const receiveCard = card => ({
    type: RECEIVE_CARD,
    card
});

const removeCard = cardId => ({
    type: REMOVE_CARD,
    cardId
});

export const fetchCards = () => dispatch => (
    CardApiUtil.fetchCards()
        .then(cards => dispatch(receiveAllCards(cards)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const fetchCard = cardId => dispatch => (
    CardApiUtil.fetchCard(cardId)
        .then(card => dispatch(receiveCard(card)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const createCard = card => dispatch => (
    CardApiUtil.createCard(card)
        .then(card => dispatch(receiveCard(card)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const updateCard = card => dispatch => (
    CardApiUtil.updateCard(card)
        .then(card => dispatch(receiveCard(card)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const deleteCard = cardId => dispatch => (
    CardApiUtil.deleteCard(cardId)
        .then(() => dispatch(removeCard(cardId)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);
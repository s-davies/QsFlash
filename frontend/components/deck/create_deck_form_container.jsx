import React from 'react';
import { connect } from 'react-redux';

import { createDeck } from '../../actions/deck_actions';
import { createCard } from '../../actions/card_actions';
import DeckForm from './deck_form';

const mSTP = (state) => ({
    deck: { title: "", description: "", visibility: "Everyone", editability: "Just me"},
    cards: [{ term: "", definition: "", order: "", deckId: "" }, { term: "", definition: "", order: "", deckId: "" }],
    formType: "Create Deck"
})

const mDTP = (dispatch) => ({
    deckAction: (deck) => dispatch(createDeck(deck)),
    createCard: (card) => dispatch(createCard(card))
})

export default connect(
    mSTP,
    mDTP
)(DeckForm);

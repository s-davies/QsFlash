import React from 'react';
import { connect } from 'react-redux';

import { createDeck } from '../../actions/deck_actions';
import DeckForm from './deck_form';

const mSTP = (state) => ({
    deck: { title: "", description: "", visibility: "Everyone", editability: "Just me"},
    formType: "Create Deck"
})

const mDTP = (dispatch) => ({
    deckAction: (deck) => dispatch(createDeck(deck))
})

export default connect(
    mSTP,
    mDTP
)(DeckForm);

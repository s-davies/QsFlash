import React from 'react';
import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { fetchDeck, updateDeck } from '../../actions/deck_actions';
import { updateCard, createCard } from '../../actions/card_actions';

class EditDeckForm extends React.Component {
    componentDidMount() {
        this.props.fetchDeck(this.props.match.params.deckId).then(deck =>
            this.props.fetchCards(deck.id)
        );
        
    }

    render() {
        const { deckAction, formType, deck, createCard, updateCard } = this.props;

        if (!deck) return null;
        return (
            <DeckForm
                deckAction={deckAction}
                createCard={createCard}
                updateCard={updateCard}
                formType={formType}
                deck={deck} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    deck: state.decks[ownProps.match.params.deckId],
    cards: state.cards,
    formType: 'Update Deck'
});

const mapDispatchToProps = dispatch => ({
    fetchDeck: deckId => dispatch(fetchDeck(deckId)),
    deckAction: deck => dispatch(updateDeck(deck)),
    createCard: (card) => dispatch(createCard(card)),
    updateCard: (card) => dispatch(updateCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeckForm);
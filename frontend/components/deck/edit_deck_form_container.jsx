import React from 'react';
import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { fetchDeck, updateDeck } from '../../actions/deck_actions';
import { updateCard, createCard, deleteCard, fetchCards} from '../../actions/card_actions';
import { createCardStudy } from '../../actions/card_study_actions';

class EditDeckForm extends React.Component {
    componentDidMount() {
        this.props.fetchDeck(this.props.match.params.deckId);
    }

    render() {
        const { deckAction, formType, deck, createCard, updateCard, deleteCard, cards, fetchCards, ownProps} = this.props;

        if (!deck) return null;
        return (
            <DeckForm
                ownProps={ownProps}
                deckAction={deckAction}
                createCard={createCard}
                updateCard={updateCard}
                deleteCard={deleteCard}
                fetchCards={fetchCards}
                createCardStudy={createCardStudy}
                cards={cards}
                formType={formType}
                deck={deck} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    ownProps: ownProps,
    deck: state.entities.decks[ownProps.match.params.deckId],
    cards: Object.keys(state.entities.cards).map(key => state.entities.cards[key]),
    formType: 'Update Deck'
}};

const mapDispatchToProps = dispatch => ({
    fetchDeck: deckId => dispatch(fetchDeck(deckId)),
    deckAction: deck => dispatch(updateDeck(deck)),
    createCard: (card) => dispatch(createCard(card)),
    updateCard: (card) => dispatch(updateCard(card)),
    deleteCard: (cardId) => dispatch(deleteCard(cardId)),
    fetchCards: (deckId) => dispatch(fetchCards(deckId)),
    createCardStudy: cardStudy => dispatch(createCardStudy(cardStudy))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeckForm);
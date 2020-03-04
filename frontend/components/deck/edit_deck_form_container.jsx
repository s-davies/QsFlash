import React from 'react';
import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { fetchDeck, updateDeck } from '../../actions/deck_actions';
import { updateCard, createCard, fetchCards} from '../../actions/card_actions';

class EditDeckForm extends React.Component {
    componentDidMount() {
        this.props.fetchDeck(this.props.match.params.deckId);
    }

    render() {
        const { deckAction, formType, deck, createCard, updateCard, cards, fetchCards} = this.props;

        if (!deck) return null;
        return (
            <DeckForm
                deckAction={deckAction}
                createCard={createCard}
                updateCard={updateCard}
                fetchCards={fetchCards}
                cards={cards}
                formType={formType}
                deck={deck} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    deck: state.entities.decks[ownProps.match.params.deckId],
    cards: Object.keys(state.entities.cards).map(key => state.entities.cards[key]),
    formType: 'Update Deck'
}};

const mapDispatchToProps = dispatch => ({
    fetchDeck: deckId => dispatch(fetchDeck(deckId)),
    deckAction: deck => dispatch(updateDeck(deck)),
    createCard: (card) => dispatch(createCard(card)),
    updateCard: (card) => dispatch(updateCard(card)),
    fetchCards: (deckId) => dispatch(fetchCards(deckId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeckForm);
import React from 'react';
import { connect } from 'react-redux';
import DeckForm from './deck_form';
import { fetchDeck, updateDeck } from '../../actions/deck_actions';

class EditDeckForm extends React.Component {
    componentDidMount() {
        this.props.fetchDeck(this.props.match.params.deckId);
    }

    render() {
        const { deckAction, formType, deck } = this.props;

        if (!deck) return null;
        return (
            <DeckForm
                deckAction={deckAction}
                formType={formType}
                deck={deck} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    deck: state.decks[ownProps.match.params.deckId],
    formType: 'Update Deck'
});

const mapDispatchToProps = dispatch => ({
    fetchDeck: deckId => dispatch(fetchDeck(deckId)),
    deckAction: deck => dispatch(updateDeck(deck))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeckForm);
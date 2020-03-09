import { connect } from 'react-redux';
import { fetchDecks } from '../../actions/deck_actions';
import Sidebar from './sidebar';

const mapStateToProps = (state) => {
    let allDecks = Object.keys(state.entities.decks).map(key => state.entities.decks[key]);
    let createdDecksCt = 0;
    for (let i = 0; i < allDecks.length; i++) {
        const deck = allDecks[i];
        if (deck.ownerId === state.entities.users[state.session.id].id) createdDecksCt += 1;
    }

    return {
        createdDecksCount: createdDecksCt,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDecks: () => dispatch(fetchDecks()),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);
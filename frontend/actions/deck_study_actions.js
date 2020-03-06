import * as DeckStudyApiUtil from '../util/deck_studies_api_util';

export const RECEIVE_ALL_DECK_STUDIES = 'RECEIVE_ALL_DECK_STUDIES';
export const RECEIVE_DECK_STUDY = 'RECEIVE_DECK_STUDY';

//needed for aggragating total studiers
const receiveAllDeckStudies = deckStudies => ({
    type: RECEIVE_ALL_DECK_STUDIES,
    deckStudies
});

const receiveDeckStudy = deckStudy => {
    return {
    type: RECEIVE_DECK_STUDY,
    deckStudy
}};

export const fetchDeckStudies = (deckId) => dispatch => (
    DeckStudyApiUtil.fetchDeckStudies(deckId)
        .then(deckStudies => dispatch(receiveAllDeckStudies(deckStudies)))
);

export const fetchDeckStudy = deckId => dispatch => {
    return DeckStudyApiUtil.fetchDeckStudy(deckId)
        .then(deckStudy => {
            dispatch(receiveDeckStudy(deckStudy))}
            )
};

export const createDeckStudy = deckStudy => dispatch => (
    DeckStudyApiUtil.createDeckStudy(deckStudy)
        .then(deckStudy => dispatch(receiveDeckStudy(deckStudy)))
);

export const updateDeckStudy = deckStudy => dispatch => (
    DeckStudyApiUtil.updateDeckStudy(deckStudy)
        .then(deckStudy => dispatch(receiveDeckStudy(deckStudy)))
);

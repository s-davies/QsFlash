import * as DeckStudyApiUtil from '../util/deck_studies_api_util';

export const RECEIVE_ALL_DECK_STUDIES = 'RECEIVE_ALL_DECK_STUDIES';
export const RECEIVE_DECK_STUDY = 'RECEIVE_DECK_STUDY';
export const REMOVE_DECK_STUDY = 'REMOVE_DECK_STUDY';

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

const removeDeckStudy = deckStudyId => ({
    type: REMOVE_DECK_STUDY,
    deckStudyId
});

export const fetchDeckStudies = (deckId) => dispatch => (
    DeckStudyApiUtil.fetchDeckStudies(deckId)
        .then(deckStudies => dispatch(receiveAllDeckStudies(deckStudies)))
);

export const fetchDeckStudy = (deckId, optUserId) => dispatch => {
    return DeckStudyApiUtil.fetchDeckStudy(deckId, optUserId)
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

export const deleteDeckStudy = deckStudyId => dispatch => (
    DeckStudyApiUtil.deleteDeckStudy(deckStudyId)
        .then(() => dispatch(removeDeckStudy(deckStudyId)), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
);

export const fetchFolderDecks = (folderId) => {
  // if the folderId is an array, set deckId param
  if (Array.isArray(folderId)) {
    return $.ajax({
      method: 'GET',
      url: `/api/folder_decks`,
      data: { deckId: folderId[0] }
    });
  } else {
    return $.ajax({
      method: 'GET',
      url: `/api/folder_decks`,
      data: { folderId: folderId }
    });
  }
};


export const createFolderDeck = (folderDeck) => (
  $.ajax({
    method: 'POST',
    url: `/api/folder_decks`,
    data: { folderDeck }
  })
);

export const deleteFolderDeck = (folderDeckId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/folder_decks/${folderDeckId}`
  })
);
export const fetchFolderDecks = (folderId) => (
  $.ajax({
    method: 'GET',
    url: `/api/folder_decks`,
    data: { folderId: folderId }
  })
);

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
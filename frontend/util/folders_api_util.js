export const fetchFolders = (optUserId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/folders`,
    data: { optUserId: optUserId }
  });
};

// export const searchFolders = (searchTerm) => (
//   $.ajax({
//     method: 'GET',
//     url: `/api/search/${searchTerm}`
//   })
// );

export const fetchFolder = (folderId) => (
  $.ajax({
    method: 'GET',
    url: `/api/folders/${folderId}`
  })
);

export const createFolder = (folder) => (
  $.ajax({
    method: 'POST',
    url: `/api/folders`,
    data: { folder }
  })
);

export const updateFolder = (folder) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/folders/${folder.id}`,
    data: { folder }
  })
);

export const deleteFolder = (folderId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/folders/${folderId}`
  })
);
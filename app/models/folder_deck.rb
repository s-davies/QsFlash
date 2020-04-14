class FolderDeck < ApplicationRecord
  belongs_to :folder,
    foreign_key: :folder_id,
    class_name: :Folder

  belongs_to :deck,
    foreign_key: :deck_id,
    class_name: :Deck
end

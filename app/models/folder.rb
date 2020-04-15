class Folder < ApplicationRecord
  validates :title, presence: true

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :folder_decks,
    foreign_key: :folder_id,
    class_name: :FolderDeck,
    dependent: :destroy

  has_many :decks, through: :folder_decks, source: :deck
end

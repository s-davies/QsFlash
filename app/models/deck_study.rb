class DeckStudy < ApplicationRecord
    validates :progress, presence: true
    validates :deck_id, uniqueness: { scope: :studier_id,
    message: "A studier can only have association with a deck" }

    belongs_to :deck,
        foreign_key: :deck_id,
        class_name: :Deck

    belongs_to :studier,
        foreign_key: :studier_id,
        class_name: :User
end

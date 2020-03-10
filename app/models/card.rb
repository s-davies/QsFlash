class Card < ApplicationRecord
    validates :order, presence: true

    belongs_to :deck,
        foreign_key: :deck_id,
        class_name: :Deck

    has_many :card_studies,
        foreign_key: :card_id,
        class_name: :CardStudy,
        dependent: :destroy
end

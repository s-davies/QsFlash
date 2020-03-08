class Deck < ApplicationRecord
    validates :title, :visibility, :editability, :card_count, presence: true

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User

    has_many :cards,
        foreign_key: :deck_id,
        class_name: :Card,
        dependent: :destroy

    has_many :deck_studies,
        foreign_key: :studier_id,
        class_name: :DeckStudy,
        dependent: :destroy

    has_many :studiers, through: :deck_studies, source: :studier
end

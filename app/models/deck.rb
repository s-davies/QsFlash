class Deck < ApplicationRecord
    validates :title, :visibility, :editability, presence: true

    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User

    has_many :cards,
        foreign_key: :deck_id,
        class_name: :Card
end

class CardStudy < ApplicationRecord
  validates :correctness_count, :learn_count, :write_count, :test_count, :spell_count, presence: true
  validates :starred, inclusion: [true, false]

  belongs_to :card,
    foreign_key: :card_id,
    class_name: :Card

  belongs_to :studier,
    foreign_key: :studier_id,
    class_name: :User

  belongs_to :deck,
    foreign_key: :deck_id,
    class_name: :Deck
end

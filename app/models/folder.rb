class Folder < ApplicationRecord
  validates :name, presence: true

  belongs
end

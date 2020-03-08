class AddRatingToDeckStudies < ActiveRecord::Migration[5.2]
  def change
    add_column :deck_studies, :rating, :integer
  end
end

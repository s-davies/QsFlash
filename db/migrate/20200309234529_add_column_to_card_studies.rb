class AddColumnToCardStudies < ActiveRecord::Migration[5.2]
  def change
    add_column :card_studies, :deck_id, :integer, null: false
  end
end

class ChangeDeckOId < ActiveRecord::Migration[5.2]
  def change
    remove_column :decks, :owner_id
    add_column :decks, :owner_id, :integer, null: false
  end
end

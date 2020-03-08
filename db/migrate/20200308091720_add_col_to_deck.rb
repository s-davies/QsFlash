class AddColToDeck < ActiveRecord::Migration[5.2]
  def change
    add_column :decks, :card_count, :integer, null: false
  end
end

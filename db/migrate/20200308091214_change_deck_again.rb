class ChangeDeckAgain < ActiveRecord::Migration[5.2]
  def change
    remove_column :decks, :card_count
  end
end

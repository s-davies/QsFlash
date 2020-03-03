class ChangeDecks < ActiveRecord::Migration[5.2]
  def change
    remove_column :decks, :description
    add_column :decks, :description, :string
  end
end

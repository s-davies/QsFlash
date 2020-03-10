class CreateFolderDecks < ActiveRecord::Migration[5.2]
  def change
    create_table :folder_decks do |t|
      t.integer :deck_id, null: false
      t.integer :folder_id, null: false
      t.timestamps
    end

    add_index :folder_decks, :deck_id
    add_index :folder_decks, :folder_id
  end
end

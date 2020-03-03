class CreateDecks < ActiveRecord::Migration[5.2]
  def change
    create_table :decks do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :visibility, null: false
      t.string :editability, null: false
      t.string :owner_id, null: false
      t.timestamps
    end
    
    add_index :decks, :owner_id
  end
end

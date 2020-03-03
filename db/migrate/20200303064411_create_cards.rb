class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :term, null: false
      t.string :definition, null: false
      t.integer :order, null: false
      t.integer :deck_id, null: false
      t.timestamps
    end
    add_index :cards, :deck_id
  end
end

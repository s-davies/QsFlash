class CreateDeckStudies < ActiveRecord::Migration[5.2]
  def change
    create_table :deck_studies do |t|
      t.integer :progress, null: false
      t.integer :deck_id, null: false
      t.integer :studier_id, null: false
      t.timestamps
    end
    add_index :deck_studies, [:deck_id, :studier_id], unique: true
  end
end

class CreateCardStudies < ActiveRecord::Migration[5.2]
  def change
    create_table :card_studies do |t|
      t.boolean :starred, null: false
      t.integer :correctness_count, null: false
      t.integer :learn_count, null: false
      t.integer :write_count, null: false
      t.integer :spell_count, null: false
      t.integer :test_count, null: false
      t.integer :card_id, null: false
      t.integer :studier_id, null: false
      t.timestamps
    end

    add_index :card_studies, [:card_id, :studier_id], unique: true
  end
end

class ChangeCards < ActiveRecord::Migration[5.2]
  def change
    remove_column :cards, :term
    remove_column :cards, :definition
    add_column :cards, :term, :string
    add_column :cards, :definition, :string
  end
end

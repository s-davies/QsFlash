class AddDeckCountToFolders < ActiveRecord::Migration[5.2]
  def change
    add_column :folders, :deck_count, :integer, null: false
  end
end

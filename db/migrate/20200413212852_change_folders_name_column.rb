class ChangeFoldersNameColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :folders, :name
    add_column :folders, :title, :string, null: false
  end
end

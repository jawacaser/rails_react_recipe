class AddUserReferenceToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_reference :recipes, :user, foreign_key: true
    # add_foreign_key :recipes, :users, if_not_exists: true
  end
end

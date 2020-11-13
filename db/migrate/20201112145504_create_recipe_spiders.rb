class CreateRecipeSpiders < ActiveRecord::Migration[6.0]
  def change
    create_table :recipe_spiders do |t|

      t.timestamps
    end
  end
end

class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.text :ingredients, null: false, array: true, default: "[]"
      t.text :instructions, array: true, default: "[]"
      t.string :image_url, default: "https://www.clipartmax.com/png/middle/278-2789804_font-recipe-comments-recipe-icon-png.png"
      t.timestamps
    end
  end
end

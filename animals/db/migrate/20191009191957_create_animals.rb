class CreateAnimals < ActiveRecord::Migration[6.0]
  def change
    create_table :animals do |t|
      t.string :image_url
      t.integer :likes

      t.timestamps
    end
  end
end

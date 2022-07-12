class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name, null: false
      t.text :ingredients, null: false
      t.text :instruction, null: false
      t.string :image, default: 'https://lh3.googleusercontent.com/pw/AM-JKLWzpHEwkBfYDRJwjiLKXVC16AaGjeaCFxN7a1KsiWQqouGKcWR81zvVLEheFYaA35JO3Z9zc-FZlfVmSgYOS38KTz45HwiFhxIDCFiQVeqVrig1lebaATH7CUmgXpMl6ytR1apV0xSHqXd6as5LLcI=w828-h315-no?authuser=0'
      t.boolean :shared, default: false

      t.timestamps
    end
  end
end
 
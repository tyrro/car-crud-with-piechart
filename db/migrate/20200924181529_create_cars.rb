class CreateCars < ActiveRecord::Migration[6.0]
  def change
    create_table :cars do |t|
      t.string :manufacturer, null: false
      t.string :model, null: false
      t.integer :year
      t.string :producing_country
    end
  end
end

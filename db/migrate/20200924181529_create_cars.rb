class CreateCars < ActiveRecord::Migration[6.0]
  def change
    create_table :cars do |t|
      t.string :manufacturer, null: false, index: true
      t.string :model, null: false
      t.integer :year, null: false
      t.string :producing_country, null: false
    end
  end
end

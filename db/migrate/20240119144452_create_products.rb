class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :price, null: false
      t.bigint :shop_id, null: false

      t.timestamps
    end
    add_index :products, :name
    add_index :products, :shop_id, foreign_key: true
  end
end

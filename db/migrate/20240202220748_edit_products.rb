class EditProducts < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :shop_id
  end
end

json.product do
    json.extract! @product, :id, :name, :description, :price, :created_at, :updated_at
end
json.product do
    json.extract! @products, :id, :name, :description, :price, :created_at, :updated_at
end
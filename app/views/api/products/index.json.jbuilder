# json.array! @products do |product|
#     json.extract! product, :id, :name, :description, :price, :created_at, :updated_at
# end

@products.each do |product|
    json.set! product.id do
    json.extract! product, :id, :name, :description, :price, :created_at, :updated_at
    json.photoUrl product.photos.attached? ? product.photos[0].url : nil
    end
end

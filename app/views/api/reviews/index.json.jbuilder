# json.array! @reviews do |review|
#     json.extract! review, :id, :body, :rating, :product_id, :user_id
# end

@reviews.each do |review|
    json.set! review.id do
        json.extract! review, :id, :body, :rating, :product_id, :user_id
    end
end
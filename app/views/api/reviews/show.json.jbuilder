json.review do
    json.extract! @review, :id, :body, :rating, :product_id, :user_id
end
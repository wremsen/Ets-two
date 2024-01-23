class Review < ApplicationRecord

    validates :body, presence: true
    validates :rating, presence: true, inclusion: {in: (1..5)}

    belongs_to :user, class_name: "User", foreign_key: "user_id"

    belongs_to :product, class_name: 'Product', foreign_key: 'product_id'


end

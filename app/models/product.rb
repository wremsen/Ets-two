class Product < ApplicationRecord

    validates :name, :price, :description, presence: true
    has_one_attached :photo

    has_many :reviews, class_name: 'Review', foreign_key: 'product_id'

end

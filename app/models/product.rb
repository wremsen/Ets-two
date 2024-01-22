class Product < ApplicationRecord

    validates :name, :price, :description, presence: true
    has_one_attached :photo

end

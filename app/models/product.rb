class Product < ApplicationRecord

    validates :name, :price, :description, presence: true


end

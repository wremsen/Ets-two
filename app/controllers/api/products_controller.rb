class Api::ProductsController < ApplicationController


  def show
    @product = Product.find(:id)
    render 'api/products/show'
  end

  def index
    @products = Product.all
    render 'api/products/index'
  end


end

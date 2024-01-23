class Api::ProductsController < ApplicationController


  def show
    @product = Product.find(params[:id])
    render 'api/products/show'
  end

  def index
    @products = Product.all
    render 'api/products/index'
  end


end

class Api::ProductsController < ApplicationController


  def show
    @product = Product.find(:id)
    render :show
  end

  def index
    @products = Product.all
    render :index
    
  end


end

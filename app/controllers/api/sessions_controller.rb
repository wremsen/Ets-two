class Api::SessionsController < ApplicationController
  def show
    banana = nil
    @user = current_user

    if @user
      render 'api/users/show'
    else
      render json: { user: nil }
    end

  end

  def create
    # debugger
    credential = params[:credential]
    password = params[:password]

    @user = User.find_by_credentials(credential, password)

    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: { errors: ['Invaild Email or Password'] }, status: :unauthorized
    end


  end

  def destroy
    @user = current_user
    if @user
      logout
      render json: { message: 'success' }
    end
  end
end

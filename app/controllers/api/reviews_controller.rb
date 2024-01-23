class Api::ReviewsController < ApplicationController

    before_action :require_logged_in only: [:create, :update, :destroy]

    def create
        @review = Review.new(review_params)

        if @review.save
            render :show
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def index
        @reviews = Review.all
        render :index
    end

    def update
        @review = Review.find(params[:id])

        if @review.user_id == current_user.id
            if @review.update(review_params)
                render :show
            else
                render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def destroy
        @review = Review.find(params[:id])

        if @reivew && @review.user_id = current_user.id
            @review.destroy
        else
            render json: { errors: @review.errors.full_messages }
        end
    end

    private
        def review_params
            params.require(:review).permit(:body, :rating, :product_id, :user_id)
        end



end

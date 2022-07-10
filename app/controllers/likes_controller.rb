class LikesController < ApplicationController

    def show
        @likes = Like.where(recipe_id: params[:id])
        likes = @likes.size
        if likes == nil
            render json: { count: 0, liked: is_liked }
        elsif likes
            render json: { count: likes, liked: is_liked }
        else
            render json: "Count error"
        end
    end

    def create
        @like = current_user.likes.new(like_params)
        if !@like.save
            render json: { message: 'Error saving like' }
        end
    end

    def destroy
        @like = current_user.likes.find_by(recipe_id: params[:id])
        if !!@like
            @like.destroy
        end
    end

    private

    def like_params
        params.require(:like).permit(:recipe_id)
    end

    def is_liked
        !current_user.likes.find_by(recipe_id: params[:id]).nil?
    end
end

class Api::V1::RecipesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    # recipe = Recipe.all.order(created_at: :desc)
    @showcase = showcase
    recipe = showcase.all.order(created_at: :desc) 
    render json: recipe
  end

  def myindex
      recipe = current_user.recipes.all.order(created_at: :desc)
      render json: recipe
  end

  def create
    @recipe = current_user.recipes.create!(recipe_params)
    if authorized?
      if recipe
        render json: recipe
      else
        render json: recipe.errors
      end
    else
      handle_unauthorized
    end
  end

  def show
    @recipe = recipe
    if recipe
      if authorized? || recipe.shared
        render json: recipe
      else
        handle_unauthorized
      end
    else
      render json: recipe.errors
    end
  end

  def edit
    @recipe = recipe
    if authorized?
      if recipe
        render json: recipe
      else
        render json: recipe.errors
      end
    else
      handle_unauthorized
    end
  end

  def update
    @recipe = recipe
    if authorized?
      if recipe.update(recipe_params)
        render json: recipe
      else
        render json: recipe.errors
      end
    else
      handle_unauthorized
    end
  end

  def destroy
    @recipe = recipe
    if authorized?
      recipe&.destroy
      render json: { message: 'Recipe deleted' }
    else
      handle_unauthorized
    end
  end

  private

    def recipe_params
      params.require(:recipe).permit(:name, :image, :ingredients, :instruction, :user, :shared)
    end

    def recipe
      @recipe ||= Recipe.find(params[:id])
    end

    def admin
      @admin ||= User.where(id: 2)
    end

    def showcase
      @showcase = Recipe.where(user_id: 2, shared: true)
    end

    def authorized?
      @recipe.user == current_user
    end

    def handle_unauthorized
      unless authorized?
        respond_to do |format|
          format.json { render :unauthorized, status: 401 }
        end
      end
    end

end

class Api::V1::RecipesController < ApplicationController
    def index
        @recipes = Recipe.all.paginate(page: params[:page], per_page: 10)
        render json: {
            recipes: @recipes,
            page: @recipes.current_page,
            pages: @recipes.total_pages
        }
    end

    def randomizer
        params[:num_recipes] ||= 5
        @recipes = Recipe.order("RANDOM()").limit(params[:num_recipes])
        render json: {
            recipes: @recipes
        }
    end

    def show
        @recipe = Recipe.find(params[:id])
        if @recipe
            render json: @recipe
        else
            render json: @recipe.errors
        end
    end

    def create
        @recipe = Recipe.create!(recipe_params)
        if @recipe
            render json: @recipe
        else
            render json: @recipe.errors
        end
    end

    def destroy
        recipe&.destroy
        render json: { message: 'Recipe deleted' }
    end

    private

    def recipe_params
        params.permit(:name, :image_url, :ingredients, :instructions)
    end
end

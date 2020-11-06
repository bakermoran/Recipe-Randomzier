class Api::V1::RecipesController < ApplicationController
    def index
        recipes = Recipe.all
        render json: recipes
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

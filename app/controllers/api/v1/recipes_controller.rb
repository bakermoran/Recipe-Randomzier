class Api::V1::RecipesController < ApplicationController
    skip_before_action :verify_authenticity_token

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

    def scrape_babish
        url = 'https://basicswithbabish.co/episodes'
        @response = BabishSpider.process(url)
        if @response[:status] == :completed && @response[:error].nil?
          flash.now[:notice] = "Successfully scraped basics with babish"
        else
          flash.now[:alert] = @response[:error]
        end
        rescue StandardError => e
        flash.now[:alert] = "Error: #{e}"
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
        @recipe = Recipe.new(recipe_params)
        if @recipe.save
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
        params.require(:recipe).permit(
            :name,
            :description,
            :servings,
            {
                ingredients: [
                    :name,
                    :amount,
                    :measure
                ]
            },
            :instructions => []
        )
    end
end

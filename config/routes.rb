Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end

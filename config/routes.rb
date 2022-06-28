Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index' # this will showcase the Let's Eat Well Recipes
      get 'recipes/myindex' # this will provide a 'My Recipes' list
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
      put '/update/:id', to: 'recipes#update'
    end
  end

  devise_for :users
  authenticated :user do
    root 'homepage#index', as: :authenticated_root
  end

  root 'homepage#home'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/*path' => 'homepage#home'
  # Defines the root path route ("/")
  # root "articles#index"
end

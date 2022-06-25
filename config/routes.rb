Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
      put '/update/:id', to: 'recipes#update'
    end
  end
  root 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/*path' => 'homepage#index'
  # Defines the root path route ("/")
  # root "articles#index"
end

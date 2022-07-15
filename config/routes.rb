Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'recipes/index' # this will showcase the Let's Eat Well Recipes
      get 'recipes/myindex' # this will provide a 'My Recipes' list
      post 'recipes/create' # all private
      get '/show/:id', to: 'recipes#show' # some public, some private
      get '/edit/:id', to: 'recipes#edit' # all private
      put '/update/:id', to: 'recipes#update' # all private
      delete '/destroy/:id', to: 'recipes#destroy' # all private
    end
  end

  devise_scope :user do
    # Request sent to backend on refresh of app to persist user data for frontend
    get '/session', to: 'users/sessions#show'
    post '/verify', to: 'users/sessions#password_check'
  end
  
  devise_for :users, controllers: {
    registrations: 'registrations',
    sessions: 'users/sessions' },
    :path_names => {
      :sign_in => 'login',
      :sign_out => 'logout',
      :password => 'password',
      :confirmation => 'confirmation',
      :unlock => 'unlock',
      :registration => 'register',
      :sign_up => 'new'
    }
  
  resources :likes, only: [:show, :create, :destroy]
  # Exceptions to authenticated root include the homepage, showcase page, and any shared recipes (public)
  authenticated :user do
    root 'homepage#index', as: :authenticated_root
  end

  root 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '*path' => 'homepage#index'
end


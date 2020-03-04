Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index]
    resources :decks, only: [:create, :destroy, :update, :show, :index] do
      resources :cards, only: [:index]
    end
    resources :cards, only: [:create, :destroy, :update, :show]
    resource :session, only: [:create, :destroy]
  end

  root to: 'static_pages#root'
end

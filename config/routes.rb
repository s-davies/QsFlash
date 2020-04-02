Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    get '/search/:searchTerm', to: 'decks#search', as: 'search'
    resources :users, only: [:create, :index]
    resources :decks, only: [:create, :destroy, :update, :show, :index] do
      resources :cards, only: [:index]
      resources :deck_studies, only: [:index, :show]
      resources :card_studies, only: [:index]
    end
    resources :cards, only: [:create, :destroy, :update, :show]
    resources :deck_studies, only: [:create, :update, :destroy]
    resources :card_studies, only: [:create, :update, :destroy]
    resource :session, only: [:create, :destroy]
  end

  root to: 'static_pages#root'
end

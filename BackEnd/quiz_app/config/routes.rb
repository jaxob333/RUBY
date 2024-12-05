Rails.application.routes.draw do
  # RailsAdmin routes under /admin
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # Devise routes for user authentication
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  # API routes
  namespace :api do
    resources :questions, only: [:index]
    resources :scores, only: [:index, :create] do
      collection do
        get :leaderboard
      end
    end
  end

  # Root path
end

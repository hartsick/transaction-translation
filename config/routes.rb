Rails.application.routes.draw do
  resources :personality_request, only: [:new, :create, :show], param: :slug, path: '/'
  get '/my/:slug', to: 'personality_profile#show', as: 'personality_profile'

  root to: 'personality_request#new'
end

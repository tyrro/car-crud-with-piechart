Rails.application.routes.draw do
  resources :cars, only: %i(index update destroy) do
    collection do
      post :import
    end
  end

  root 'cars#index'
end

Rails.application.routes.draw do
  resources :cars do
    collection do
      post :import
    end
  end

  root 'cars#index'
end

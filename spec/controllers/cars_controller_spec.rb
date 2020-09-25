require 'rails_helper'

RSpec.describe CarsController, type: :controller do
  let(:car) { FactoryBot.create :car }
  let(:valid_attributes) do
    {
      manufacturer: 'BMW',
      model: 'Isetta',
    }
  end

  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    it 'creates a new car' do
      expect do
        post :create, params: { car: valid_attributes }
      end.to change(Car, :count).by(1)
    end
  end
end

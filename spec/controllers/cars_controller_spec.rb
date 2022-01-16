require 'rails_helper'

RSpec.describe CarsController, type: :controller do
  let!(:car) { FactoryBot.create :car }
  let(:car_attributes) do
    {
      id: car.id,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      producing_country: car.producing_country,
    }
  end
  let(:car_suggestions) { ['bmw'] }
  let(:car_graphic_params) do
    [
      {
        title: car.manufacturer,
        value: 1,
        color: '#FFFFFF',
      },
    ]
  end
  let(:pagination) do
    {
      total_pages: 1,
      total_count: 1,
      current_page: 1,
    }
  end

  before do
    allow(SecureRandom).to receive(:hex).with(3).and_return('FFFFFF')
  end

  describe 'GET #index' do
    describe 'JSON format' do
      render_views

      it 'returns the list of cars in JSON' do
        get :index, params: { format: :json }

        expect(JSON.parse(response.body, symbolize_names: true)).to eq(
          cars: [car_attributes],
          car_suggestions: [car.manufacturer],
          car_graphic_params: car_graphic_params,
          pagination: pagination,
        )
      end
    end

    describe 'search and pagination' do
      render_views

      it 'returns only the searched car' do
        get :index, params: { format: :json, q: car.manufacturer }

        expect(JSON.parse(response.body, symbolize_names: true)).to eq(
          cars: [car_attributes],
          car_suggestions: [car.manufacturer],
          car_graphic_params: car_graphic_params,
          pagination: pagination,
        )
      end

      it 'returns no car' do
        get :index, params: { format: :json, q: 'toyota' }

        expect(JSON.parse(response.body, symbolize_names: true)).to eq(
          cars: [],
          car_suggestions: [],
          car_graphic_params: [
            {
              color: 'grey',
              title: 'unavailable',
              value: 1,
            },
          ],
          pagination: {
            total_pages: 0,
            total_count: 0,
            current_page: 1,
          },
        )
      end
    end
  end

  describe 'PUT #update' do
    it 'renders a successful response on update' do
      put :update, params: { id: car.id, car: car_attributes.except(:id).merge(model: 'toyota') }
      expect(car.reload.model).to eq('toyota')
      expect(JSON.parse(response.body)).to eq({ 'error' => nil })
    end

    it 'renders the errors if update fails' do
      post :update, params: { id: car.id, car: car_attributes.except(:id).merge(model: '') }
      expect(JSON.parse(response.body)).to eq({ 'error' => { 'model' => 'can\'t be blank' } })
    end
  end

  describe 'DELETE #destroy' do
    it 'renders a successful message after deletion' do
      expect do
        delete :destroy, params: { id: car.id }
      end.to change(Car, :count).by(-1)
      expect(JSON.parse(response.body)).to eq({ 'message' => 'Car has been removed' })
    end
  end

  describe 'POST #import' do
    let(:file) { Rack::Test::UploadedFile.new(file_path, 'text/comma-separated-values') }

    context 'with a valid CSV' do
      let(:file_path) { Rails.root.join('spec', 'fixtures', 'valid_car.csv') }

      it 'returns no error' do
        post :import, params: { file: file }
        expect(JSON.parse(response.body)).to eq({ 'error' => nil })
      end
    end

    context 'with an invalid CSV' do
      let(:file_path) { Rails.root.join('spec', 'fixtures', 'invalid_car.csv') }

      it 'returns the errors' do
        post :import, params: { file: file }
        expect(JSON.parse(response.body)).to eq(
          { 'error' => [{ 'message' => "Model can't be blank", 'row' => 1 }] },
        )
      end
    end
  end
end

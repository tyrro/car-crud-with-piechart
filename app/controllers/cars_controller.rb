class CarsController < ApplicationController
  include ValidationMessages
  before_action :set_car, only: %i(update destroy)

  def index
    @cars = Car.all
    @cars = Queries::Search.call(params, @cars)
    @cars = Queries::Paginate.call(params, @cars)
  end

  def create
    @car = Car.new(car_params)
    if @car.save!
      render json: { error: nil }
    else
      render json: { error: validation_messages(@car.errors.messages) },
             status: :unprocessable_entity
    end
  end

  def update
    if @car.update(car_params)
      render json: { error: nil }
    else
      render json: { error: validation_messages(@car.errors.messages) },
             status: :unprocessable_entity
    end
  end

  def destroy
    @car.destroy!
    render json: { message: t('destroyed', resource: @car.model_name.human) }
  end

  private

  def set_car
    @car = Car.find(params[:id])
  end

  def car_params
    params.require(:car).permit(:manufacturer, :model, :year, :producing_country)
  end
end

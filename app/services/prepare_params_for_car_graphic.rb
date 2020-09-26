class PrepareParamsForCarGraphic
  attr_reader :cars

  def self.call(cars)
    new(cars).call
  end

  def initialize(cars)
    @cars = cars
  end

  def call
    uniq_manufacturers_with_count = cars.each_with_object(Hash.new(0)) do |car, cars|
      cars[car.manufacturer] += 1
    end
    return unavailable_response if uniq_manufacturers_with_count.empty?

    uniq_manufacturers_with_count.map do |key, value|
      {
        title: key,
        value: value,
        color: SecureRandom.hex(3).prepend('#'),
      }
    end
  end

  private

  def unavailable_response
    [
      title: 'unavailable',
      value: 1,
      color: 'grey',
    ]
  end
end

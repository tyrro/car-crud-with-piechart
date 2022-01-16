require 'csv'

class CarImport
  attr_reader :file, :success, :errors, :results

  def self.call(file)
    new(file).call
  end

  def initialize(file)
    @file = file
    @success = false
    @errors = []
    @results = []
  end

  def call
    row_number = 0
    CSV.foreach(file, headers: true) do |row|
      row_number += 1
      begin
        car = create_instance(row)
        if car.valid?
          results << car
        else
          errors << {
            row: row_number,
            message: car.errors.full_messages.to_sentence,
          }
        end
      end
    end
    success = errors.empty?
    results.map(&:save) if success
    { success: success, errors: errors }
  end

  def create_instance(params)
    Car.new(car_attributes(params))
  end

  def car_attributes(params)
    manufacturer, model, year, producing_country = params.map(&:last)
    {
      manufacturer: manufacturer,
      model: model,
      year: year,
      producing_country: producing_country,
    }
  end
end

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
      rescue ActiveRecord::RecordNotFound, ArgumentError => error
        errors << {
          row: row_number,
          messages: [error.message],
        }
      end
    end
    success = errors.empty?
    results.map(&:save) if success
    { success: success, errors: errors }
  end

  def create_instance(param)
    Car.new(car_attributes(param))
  end

  def car_attributes(param)
    manufacturer, model, year, producing_country = param
    {
      manufacturer: manufacturer[1],
      model: model[1],
      year: year[1],
      producing_country: producing_country[1],
    }
  end
end

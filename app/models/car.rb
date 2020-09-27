class Car < ApplicationRecord
  validates :manufacturer, :model, :year, :producing_country, presence: true

  scope :search, ->(query) { where('LOWER(manufacturer) LIKE LOWER(?)', "%#{query}%") }
end

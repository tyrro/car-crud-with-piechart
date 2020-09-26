class Car < ApplicationRecord
  validates :manufacturer, :model, presence: true

  scope :search, ->(query) { where('LOWER(manufacturer) LIKE LOWER(?)', "%#{query}%") }
end

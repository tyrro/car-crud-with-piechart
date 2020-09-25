class Car < ApplicationRecord
  validates :manufacturer, :model, presence: true
end

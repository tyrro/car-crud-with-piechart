FactoryBot.define do
  factory :car do
    manufacturer { 'BMW' }
    model { 'Isetta' }
    year { 1955 }
    producing_country { 'Germany' }
  end
end

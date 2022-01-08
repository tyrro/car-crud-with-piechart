json.cars @cars do |car|
  json.id car.id
  json.manufacturer car.manufacturer
  json.model car.model
  json.year car.year
  json.producing_country car.producing_country
end
json.car_suggestions @car_search_suggestions
json.car_graphic_params @car_graphic_params
json.sample_csv '/files/sample.csv'
json.pagination do
  json.total_pages @cars.total_pages
  json.total_count @cars.total_count
  json.current_page @cars.current_page
end

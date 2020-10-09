/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useEffect, useState, useRef } from 'react';
import { debounce } from 'throttle-debounce';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

import CarForm from './CarForm';
import CSVUpload from './CSVUpload';

import Pagination from '../Pagination';
import PieGraphic from '../PieGraphic';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [carSuggestions, setCarSuggestions] = useState([]);
  const [carGraphicParams, setCarGraphicParams] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const CARATTRIBUTES = ['manufacturer', 'model', 'year', 'producingCountry'];
  const forcePage = currentPage - 1;

  const fetchCars = async (q, page) => {
    const { data } = await httpClient.get(
      routes.cars.index({
        q,
        page,
      }),
    );
    setCars(data.cars);
    setCarSuggestions(data.carSuggestions);
    setCarGraphicParams(data.carGraphicParams);
    setCurrentPage(data.pagination.currentPage);
    setTotalPages(data.pagination.totalPages);
  };

  const fetchCarsWithDebounce = useRef(
    debounce(500, q => {
      fetchCars(q);
    }),
  ).current;

  const onPageChange = selectedPage => {
    setCurrentPage(selectedPage);
    fetchCars(searchParam, selectedPage);
  };

  const onCarDelete = async carId => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to delete this car')) {
      await httpClient.delete(routes.cars.destroy({ carId }));
      fetchCars(searchParam, currentPage);
    }
  };

  const preparedCarSuggestions = () => {
    if (searchParam === '') {
      return [];
    }

    if (carSuggestions.length === 1 && carSuggestions[0] === searchParam) {
      return [];
    }

    return carSuggestions;
  };

  useEffect(() => {
    fetchCarsWithDebounce(searchParam);
  }, [searchParam]);

  return (
    <div className="car">
      <div className="car__details">
        <div className="car__details-header">
          <div className="car__details-header__search-box">
            <input
              type="text"
              placeholder="Search with Manufacturer"
              value={searchParam}
              onChange={event => {
                setSearchParam(event.target.value);
              }}
            />
            {preparedCarSuggestions().map(suggestion => (
              <div className="search-box__suggestions" key={suggestion}>
                <li onClick={() => setSearchParam(suggestion)}>{suggestion}</li>
              </div>
            ))}
          </div>
          <div className="car__details-header__csv-upload">
            <CSVUpload fetchCars={fetchCars} />
          </div>
        </div>
        <div className="car__pagination">
          <Pagination
            pageCount={totalPages}
            forcePage={forcePage}
            onPageChange={page => onPageChange(page.selected + 1)}
          />
        </div>
        <div className="car__header">
          {CARATTRIBUTES.map(attribute => (
            <div className="car__value" key={attribute}>
              {I18n.t(`attributes.${attribute}`)}
            </div>
          ))}
          <div className="car__value car__value--actions">Actions</div>
        </div>
        <div className="car__table">
          {cars.map(car => (
            <div className="car__data" key={car.id}>
              {CARATTRIBUTES.map(attribute => (
                <div className="car__value" key={attribute}>
                  {car[attribute]}
                </div>
              ))}
              <div className="car__value car__value--actions">
                <CarForm car={car} fetchCars={fetchCars} />

                <button type="button" onClick={() => onCarDelete(car.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="car__pagination">
          <Pagination
            pageCount={totalPages}
            forcePage={forcePage}
            onPageChange={page => onPageChange(page.selected + 1)}
          />
        </div>
      </div>
      <div className="car__graphic">
        <PieGraphic data={carGraphicParams} />
      </div>
    </div>
  );
};

export default Car;

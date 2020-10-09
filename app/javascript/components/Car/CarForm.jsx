import React, { useState } from 'react';
import PropTypes from 'prop-types';

import httpClient from '../../shared/httpClient';
import routes from '../../routes';

import Modal from '../Modal';

const CarForm = ({ car, fetchCars }) => {
  const [manufacturer, setManufacturer] = useState(car.manufacturer);
  const [model, setModel] = useState(car.model);
  const [year, setYear] = useState(car.year);
  const [producingCountry, setProducingCountry] = useState(car.producingCountry);
  const [errors, setErrors] = useState({});

  const handleSubmitForm = async event => {
    event.preventDefault();

    try {
      const { data } = await httpClient.put(routes.cars.update({ carId: car.id }), {
        manufacturer,
        model,
        year,
        producing_country: producingCountry,
      });

      if (data.error === null) {
        fetchCars();
      }
    } catch (error) {
      const response = error.response;
      if (response && response.status === 422) {
        setErrors(response.data.error);
      }
    }
  };

  return (
    <Modal linkText="Edit" header="Edit Car">
      <form className="car-edit" onSubmit={event => handleSubmitForm(event)}>
        <label htmlFor="manufacturer">
          <span className="car-edit__title">{I18n.t('attributes.manufacturer')}</span>
          <input
            type="text"
            value={manufacturer}
            onChange={event => setManufacturer(event.target.value)}
          />
          {errors.manufacturer && <div className="car-edit__error">{errors.manufacturer}</div>}
        </label>

        <label htmlFor="model">
          <span className="car-edit__title">{I18n.t('attributes.model')}</span>
          <input type="text" value={model} onChange={event => setModel(event.target.value)} />
          {errors.model && <div className="car-edit__error">{errors.model}</div>}
        </label>

        <label htmlFor="year">
          <span className="car-edit__title">{I18n.t('attributes.year')}</span>
          <input type="text" value={year} onChange={event => setYear(event.target.value)} />
          {errors.year && <div className="car-edit__error">{errors.year}</div>}
        </label>

        <label htmlFor="producingCountry">
          <span className="car-edit__title">{I18n.t('attributes.producingCountry')}</span>
          <input
            type="text"
            value={producingCountry}
            onChange={event => setProducingCountry(event.target.value)}
          />
          {errors.producingCountry && (
            <div className="car-edit__error">{errors.producingCountry}</div>
          )}
        </label>

        <div className="car-edit__submit-bottom">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </Modal>
  );
};

CarForm.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    manufacturer: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.number,
    producingCountry: PropTypes.string,
  }).isRequired,
  fetchCars: PropTypes.func.isRequired,
};

export default CarForm;

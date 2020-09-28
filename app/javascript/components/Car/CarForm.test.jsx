import React from 'react';
import axios from 'axios';

import { shallow } from 'enzyme';

import CarForm from './CarForm';

const props = {
  car: {
    id: 1,
    manufacturer: 'BMW',
    model: 'X7',
    year: 2020,
    producingCountry: 'Germany',
  },
  fetchCars: jest.fn(),
};

const flushPromises = () => new Promise(setImmediate);

describe(CarForm, () => {
  const wrapper = shallow(<CarForm {...props} />);

  test('it displays all the fields with the passed values', () => {
    expect(wrapper.find('input[type="text"]').length).toEqual(4);
  });

  test('it updates the field when edited', () => {
    const field = wrapper.find('input[type="text"]').first();
    expect(field.prop('value')).toEqual('BMW');
    field.simulate('change', {
      target: { value: 'Toyota' },
    });
    expect(wrapper.find('input[type="text"]').first().prop('value')).toEqual('Toyota');
  });

  test('shows erroneous fields when submitted', async () => {
    axios.onPut(/cars/).reply(422, {
      error: { manufacturer: 'can not be blank' },
    });

    wrapper.find('form').simulate('submit', { preventDefault() {} });
    await flushPromises();

    expect(wrapper.find('div.car-edit__error').text()).toEqual('can not be blank');
  });
});

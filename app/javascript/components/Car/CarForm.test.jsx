import React from 'react';
import axios from 'axios';

import { shallow } from 'enzyme';

import CarForm from './CarForm';
import wait from '../../shared/wait';

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

describe(CarForm, () => {
  const wrapper = shallow(<CarForm {...props} />);

  test('it displays all the fields with the passed values', () => {
    expect(wrapper.find('input[type="text"]').length).toEqual(4);
  });

  test('it updates the field when edited', () => {
    const field = () => wrapper.find('input[type="text"]').first();

    expect(field().prop('value')).toEqual('BMW');
    field().simulate('change', { target: { value: 'Toyota' } });
    expect(field().prop('value')).toEqual('Toyota');
  });

  test('fetches all the cars after a successful form submission', async () => {
    axios.onPut(/cars/).reply(200, { error: null });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    await wait();

    expect(props.fetchCars).toHaveBeenCalled();
  });

  test('shows erroneous fields if response has error after form submission', async () => {
    const errorField = () => wrapper.find('div.car-edit__error');

    axios.onPut(/cars/).reply(422, { error: { manufacturer: 'can not be blank' } });

    expect(errorField().length).toEqual(0);

    wrapper.find('form').simulate('submit', { preventDefault() {} });
    await wait();

    expect(errorField().text()).toEqual('can not be blank');
  });
});

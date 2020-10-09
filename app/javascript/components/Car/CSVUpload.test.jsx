import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';

import CSVUpload from './CSVUpload';
import wait from '../../shared/wait';

const props = { fetchCars: jest.fn() };
const file = new Blob(['file contents'], { type: 'csv' });

const uploadCSV = wrapper =>
  wrapper.find('input[type="file"]').simulate('change', {
    target: { files: [file] },
  });

describe(CSVUpload, () => {
  const wrapper = shallow(<CSVUpload {...props} />);

  test('it renders a CSV upload form with disabled submit button', () => {
    expect(wrapper.find('button').prop('disabled')).toEqual(true);
  });

  test('it enables the submit button when a csv file is chosen from file explorer', () => {
    uploadCSV(wrapper);
    expect(wrapper.find('button').prop('disabled')).toEqual(false);
  });

  test('it shows a successful message if the file is upload to server successfully', async () => {
    axios.onPost(/cars\/import/).reply(200, {
      error: null,
    });

    uploadCSV(wrapper);
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    await wait();

    expect(wrapper.find('div.csv-upload-form__successful').text()).toEqual('CSV Upload Successful');
  });

  test('it shows an unsuccessful message if the file fails to upload to server successfully', async () => {
    axios.onPost(/cars\/import/).reply(422, {
      error: [{ row: 1, message: 'Manufacturer can not be blank' }],
    });

    uploadCSV(wrapper);
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    await wait();

    expect(wrapper.find('div.csv-upload-form__unsuccessful').text()).toEqual(
      'CSV Upload Unsuccessful',
    );
  });
});

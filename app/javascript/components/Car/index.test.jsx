import React from 'react';
import { shallow } from 'enzyme';

import CarIndex from './index';

describe(CarIndex, () => {
  const wrapper = shallow(<CarIndex sampleCSVFile="/link/to/file" />);

  it('sets the search param when typed', () => {
    expect(wrapper.find('input[type="text"]').prop('value')).toEqual('');
    wrapper.find('input[type="text"]').simulate('change', {
      target: { value: 'bmw' },
    });

    expect(wrapper.find('input[type="text"]').prop('value')).toEqual('bmw');
  });
});

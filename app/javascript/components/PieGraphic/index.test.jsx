import React from 'react';
import { mount } from 'enzyme';

import PieGraphic from './index';

const props = {
  data: [
    {
      title: 'Trump',
      value: 40,
      color: 'red',
    },
    {
      title: 'Biden',
      value: 60,
      color: 'green',
    },
  ],
};

describe(PieGraphic, () => {
  const wrapper = mount(<PieGraphic {...props} />);

  it('renders the correct number of pies according to the data passed', () => {
    expect(wrapper.find('ReactMinimalPieChartPath').length).toEqual(2);
  });

  it('shows the data label beside each pie', () => {
    const labelNode = wrapper.find('ReactMinimalPieChartLabel');

    expect(labelNode.first().text()).toEqual(props.data[0].title);
    expect(labelNode.last().text()).toEqual(props.data[1].title);
  });

  it('turns the color of the pie to grey on mouse over', () => {
    const pie = wrapper.find('ReactMinimalPieChartPath').first();

    expect(pie.prop('stroke')).toEqual(props.data[0].color);
    pie.simulate('mouseover');
    expect(wrapper.find('ReactMinimalPieChartPath').first().prop('stroke')).toEqual('grey');
  });
});

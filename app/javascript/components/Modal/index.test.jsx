import React from 'react';
import { shallow } from 'enzyme';

import Modal from './index';

const props = {
  linkText: 'click to open',
  header: 'new modal',
  children: <h1>Hello</h1>,
};

describe(Modal, () => {
  const wrapper = shallow(<Modal {...props} />);

  it('initially renders a button with linktext only', () => {
    expect(wrapper.find('button').text()).toEqual(props.linkText);
    expect(wrapper.find('Modal').length).toEqual(0);
  });

  test('opens a modal when clicked on the button', () => {
    wrapper.find('button').simulate('click');

    expect(wrapper.find('Modal').prop('isOpen')).toEqual(true);
    expect(wrapper.find('div.modal__header').text()).toEqual(props.header);
    expect(wrapper.find('Modal').contains(props.header)).toEqual(true);
  });
});

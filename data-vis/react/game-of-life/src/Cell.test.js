import React from 'react';
import { shallow } from 'enzyme';
import Cell from './Cell';

describe('<Cell />', () => {
  it('renders without crashing', () => {
    shallow(<Cell />);
  });
  it('has no children', () => {
    const wrapper = shallow(<Cell />);
    expect(wrapper.children()).toHaveLength(0);
  });
});

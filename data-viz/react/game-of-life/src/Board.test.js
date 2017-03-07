import React from 'react';
import { shallow } from 'enzyme';
import Board from './Board';

describe('<Board />', () => {
  const states = [];
  for (let i = 0; i < 100; i++) {
    states.push(Math.floor(Math.random() + .5));
  }
  it('renders without crashing', () => {
    shallow(<Board states={states}/>);
  });
  it('has 100 cells', () => {
    const wrapper = shallow(<Board states={states}/>);
    expect(wrapper.children()).toHaveLength(100);
  });
  it('sends state (background color) to it\'s children', () => {
    const wrapper = shallow(<Board states={states}/>);
    wrapper.children().forEach((i) => {
      expect(i.prop('style')).toBeTruthy();
    });
  });
});

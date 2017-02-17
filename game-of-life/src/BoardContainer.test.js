import React from 'react';
import { shallow } from 'enzyme';
import BoardContainer from './BoardContainer';

describe('<BoardContainer />', () => {
  const states = [];
  for (let i = 0; i < 100; i++) {
    states.push(Math.floor(Math.random() + .5));
  }
  it('renders without crashing', () => {
    shallow(<BoardContainer />);
  });
  it('has no children', () => {
    const wrapper = shallow(<BoardContainer states={states}/>);
    expect(wrapper.children()).toHaveLength(0);
  });
  it('has states property', () => {
    const wrapper = shallow(<BoardContainer states={states}/>);
    expect(wrapper.prop('states')).toBeTruthy();
  });
});

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
  it('has only one child', () => {
    const wrapper = shallow(<BoardContainer states={states}/>);
    expect(wrapper.children()).toHaveLength(1);
  });
  it('sends state to it\'s child', () => {
    const wrapper = shallow(<BoardContainer states={states}/>);
    expect(wrapper.childAt(0).prop('states')).toBeTruthy();
  });
});

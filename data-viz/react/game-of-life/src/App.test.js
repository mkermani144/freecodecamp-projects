import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
  it('has a board within', () => {
    const wrapper = mount(<App mustPlay={1} reportGenerationMumber={undefined} />);
    expect(wrapper.find('.board')).toHaveLength(1);
  });
  it('has three buttons', () => {
    const wrapper = mount(<App mustPlay={1} reportGenerationMumber={undefined} />);
    expect(wrapper.find('button')).toHaveLength(3);
  });
  it('has generation textfield', () => {
    const wrapper = mount(<App mustPlay={1} reportGenerationMumber={undefined} />);
    expect(wrapper.find('.generationNumber')).toHaveLength(1);
  });
});

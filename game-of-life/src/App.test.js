import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
  it('has a board within', () => {
    const action = {
      command: 'start',
      speed: 1,
      auto: true
    };
    const wrapper = shallow(<App action={'start'} reportGenerationMumber={undefined} />);
    expect(wrapper.containsMatchingElement(<div class=".board" />)).toBeTrue();
  });
  it('has a toggle', () => {
    const action = {
      command: 'start',
      speed: 1,
      auto: true
    };
    const wrapper = shallow(<App action={'start'} reportGenerationMumber={undefined} />);
    expect(wrapper.containsMatchingElement('.toggle')).toBeTrue();
  });
  it('has three buttons', () => {
    const action = {
      command: 'start',
      speed: 1,
      auto: true
    };
    const wrapper = shallow(<App action={'start'} reportGenerationMumber={undefined} />);
    expect(wrapper.find(<Button />)).toHaveLength(3);
  });
  it('has generation textfield', () => {
    const action = {
      command: 'start',
      speed: 1,
      auto: true
    };
    const wrapper = shallow(<App action={'start'} reportGenerationMumber={undefined} />);
    expect(wrapper.containsMatchingElement(<div className="generationNumber" />)).toBeTrue();
  });
});

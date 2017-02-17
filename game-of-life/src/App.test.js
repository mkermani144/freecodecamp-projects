import React from 'react';
import { shallow, mount } from 'enzyme';
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
    const wrapper = mount(<App action={action} reportGenerationMumber={undefined} />);
    expect(wrapper.find('.board')).toHaveLength(1);
  });
  it('has a toggle', () => {
    const action = {
      command: 'start',
      speed: 1,
      auto: true
    };
    const wrapper = mount(<App action={action} reportGenerationMumber={undefined} />);
    expect(wrapper.find('.toggle')).toHaveLength(1);
  });
  it('has three buttons', () => {
    const action = {
      command: 'start',
      speed: 1,
      auto: true
    };
    const wrapper = mount(<App action={action} reportGenerationMumber={undefined} />);
    expect(wrapper.find('Button')).toHaveLength(3);
  });
  it('has generation textfield', () => {
    const action = {
      command: 'start',
      speed: 1,
      auto: true
    };
    const wrapper = mount(<App action={action} reportGenerationMumber={undefined} />);
    expect(wrapper.find('.generationNumber')).toHaveLength(1);
  });
});

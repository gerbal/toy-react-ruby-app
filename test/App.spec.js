import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/components/App';

describe('Component: App', () => {
  it('should render the App component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});

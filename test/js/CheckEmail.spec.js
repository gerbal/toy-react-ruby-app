import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';

import { CheckEmail } from '../../src/components/CheckEmail';

// aphrodite setup. If the project grows move to a testSetup.js or something
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  return new Promise(resolve => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    return process.nextTick(resolve);
  });
});

describe('Component: CheckEmail', () => {
  it('should render the CheckEmail component', () => {
    const props = {
      email: {},
      actions: {}
    };
    const wrapper = mount(
      <CheckEmail {...props} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger call an error with no domain', () => {
    const updateName = jest.fn();
    const updateCompanyDomain = jest.fn();
    const fetchEmail = jest.fn();
    const sendError = jest.fn();

    const props = {
      email: {
        domain: '',
        name: ''
      },
      actions: { updateName, updateCompanyDomain, fetchEmail, sendError }
    };
    const wrapper = mount(
      <CheckEmail {...props} />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.find('#FullName').simulate('change', { target: { value: 'name' } });
    expect (updateName).toHaveBeenCalledTimes(1);
    expect (sendError).toHaveBeenCalledTimes(1);
    expect (fetchEmail).not.toHaveBeenCalled();
  });

  it('should trigger call an error an invalid domain', () => {
    const updateName = jest.fn();
    const updateCompanyDomain = jest.fn();
    const fetchEmail = jest.fn();
    const sendError = jest.fn();

    const props = {
      email: {
        domain: '',
        name: ''
      },
      actions: { updateName, updateCompanyDomain, fetchEmail, sendError }
    };
    const wrapper = mount(
      <CheckEmail {...props} />
    );
    expect(wrapper).toMatchSnapshot();

    wrapper.find('#FullName').simulate('change', { target: { value: 'name' } });
    expect (updateName).toHaveBeenCalledTimes(1);

    wrapper.find('#DomainName').simulate('change', { target: { value: 'name' } });
    expect (updateCompanyDomain).toHaveBeenCalledTimes(1);
    expect (sendError).toHaveBeenCalledTimes(2);
    expect (fetchEmail).not.toHaveBeenCalled();
  });

  it('should not trigger error callback if valid name and domain', () => {
    const updateName = jest.fn();
    const updateCompanyDomain = jest.fn();
    const fetchEmail = jest.fn();
    const sendError = jest.fn();

    const props = {
      email: {
        domain: '',
        name: ''
      },
      actions: { updateName, updateCompanyDomain, fetchEmail, sendError }
    };
    const wrapper = mount(
      <CheckEmail {...props} />
  );
    expect(wrapper).toMatchSnapshot();
    wrapper.find('#FullName').simulate('change', { target: { value: 'name' } });
    expect (updateName).toHaveBeenCalledTimes(1);

    wrapper.find('#DomainName').simulate('change', { target: { value: 'name.com' } });
    expect (updateCompanyDomain).toHaveBeenCalledTimes(1);
    expect (sendError).toHaveBeenCalledTimes(1);
    expect (fetchEmail).toHaveBeenCalledTimes(1);


    expect(wrapper).toMatchSnapshot();
  });
});

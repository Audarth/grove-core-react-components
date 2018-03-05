import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CurrentConstraints from './CurrentConstraints';

describe('<CurrentConstraints/>', () => {
  it('renders without constraints', () => {
    expect(shallow(
      <CurrentConstraints
        constraints={{}}
        removeConstraint={() => {}}
      />
    ).length).toEqual(1);
  });

  it('renders with constraints', () => {
    expect(shallow(
      <CurrentConstraints
        constraints={{Test: ['value1', 'value2']}}
        removeConstraint={() => {}}
      />
    ).length).toEqual(1);
  });
});

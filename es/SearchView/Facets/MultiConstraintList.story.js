/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MultiConstraintList from './MultiConstraintList';
import { defaultValues } from './shared';

storiesOf('SearchView/Facets/MultiConstraintList', module).add('default', function () {
  return React.createElement(MultiConstraintList, {
    values: defaultValues,
    addConstraint: action('addConstraint')
  });
}).add('with a selection', function () {
  return React.createElement(MultiConstraintList, {
    values: defaultValues,
    selectedValues: [{ value: 'First' }],
    addConstraint: action('addConstraint'),
    removeConstraint: action('removeConstraint')
  });
});
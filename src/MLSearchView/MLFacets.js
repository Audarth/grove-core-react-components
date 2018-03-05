import React from 'react';
import PropTypes from 'prop-types';

import CurrentConstraints from './facets/CurrentConstraints';
import SingleConstraintList from './facets/SingleConstraintList';

const MLFacets = ({
  activeConstraints, nonSelectedFacets,
  addConstraint, removeConstraint
}) => (
  <div className="ml-facet-list list-group">
    {
      // TODO - this was when facets should be negatible?
      // Example of passing in attribute to change component behavior?
      // <ml-chiclets
      //   ng-if="shouldNegate"
      //   active-facets="activeFacets"
      //   toggle="toggle({facet:facet, value:value})"
      //   truncate="{{ truncateLength }}"></ml-chiclets>
    }
    {
      !!activeConstraints &&
        <CurrentConstraints
          constraints={activeConstraints}
          removeConstraint={removeConstraint}
        />
    }
    {
      // TODO: truncate names with a truncateLength option
      // TODO: handle blanks before it gets here
      nonSelectedFacets &&
      Object.keys(nonSelectedFacets).map((facetName) => (
        <div key={facetName} className="panel panel-primary ml-facet">
          <div className="panel-heading">
            <h3 className="panel-title">{facetName}</h3>
          </div>
          <div className="panel-body">
            <SingleConstraintList
              values={nonSelectedFacets[facetName].facetValues}
              addConstraint={addConstraint.bind(null, facetName)}/>
          </div>
        </div>
      ))
    }
  </div>
);

MLFacets.propTypes = {
  activeConstraints: PropTypes.object.isRequired,
  addConstraint: PropTypes.func.isRequired,
  removeConstraint: PropTypes.func.isRequired
};

export default MLFacets;

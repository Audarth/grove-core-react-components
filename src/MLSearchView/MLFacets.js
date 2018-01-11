import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from '../animations/Fade';

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
      <TransitionGroup className="chiclets" appear={true}>
        {
          Object.keys(activeConstraints).map((constraintName) => (
            // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
            <Fade key={constraintName}>
              <div key={constraintName}>
                {
                  // TODO: truncate values with a truncateLength option
                  activeConstraints[constraintName].map((value) => (
                    <div key={value} className="btn btn-success btn-raised">
                      <span title={value.name}>{constraintName}: {value.name} </span>
                      <span
                        className="glyphicon glyphicon-remove-circle icon-white"
                        onClick={removeConstraint.bind(null, constraintName, value.name)}
                      />
                    </div>
                  ))
                }
              </div>
            </Fade>
          ))
        }
      </TransitionGroup>
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
          <div className="panel-body">{
            nonSelectedFacets[facetName].facetValues.map((value) => (
              <div key={value.name}>
                <i
                  className="glyphicon glyphicon-plus-sign ml-facet-add-pos"
                  onClick={addConstraint.bind(null, facetName, value.name)}
                />
                <span title={value.name}> {value.name}</span>
                <span> ({value.count})</span>
                {
                  // TODO: negation as an option
                  // <i class="fa fa-minus-circle facet-add-neg"
                  // ng-if="shouldNegate"
                  // ng-click="negate({facet: facet.__key, value: value.name})"
                  // title="{{ value.name }}"></i>
                }
              </div>
            ))
          }
          {
            // TODO: show more
            // <div ng-if="shouldShowMore &amp;&amp; !facet.displayingAll">
            //   <a href
            //   ng-click="showMore({facet: facet, facetName: facet.__key})">
            //   see more ...
            //   </a>
            // </div>
          }</div>
        </div>
      ))
    }
  </div>

);

export default MLFacets;

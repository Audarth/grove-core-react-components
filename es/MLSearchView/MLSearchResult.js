import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import MLSearchSnippet from './MLSearchSnippet.js';

var MLSearchResult = function MLSearchResult(_ref) {
  var result = _ref.result;
  return React.createElement(
    Col,
    { xs: 12, sm: 6, md: 4, lg: 3,
      className: 'ml-search-result',
      key: result.uri
    },
    React.createElement(
      Panel,
      null,
      React.createElement(
        'h4',
        null,
        result.label || result.uri
      ),
      React.createElement(
        'div',
        { className: 'ml-search-result-matches' },
        result.matches.map(function (match, index) {
          return React.createElement(MLSearchSnippet, { match: match, key: index });
        })
      )
    )
  );
};

export default MLSearchResult;
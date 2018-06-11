import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';
import './CardResult.css';

const prettyUri = uri => {
  const uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

const SearchSnippets = ({ result }) => (
  <div className="ml-search-result-matches">
    {result.matches &&
      result.matches.map((match, index) => (
        <SearchSnippet match={match} key={index} />
      ))}
  </div>
);

const Header = props => (
  <h1 className="panel-title">
    {props.result.label || prettyUri(props.result.uri)}
  </h1>
);

const CardResult = props => (
  <Col xs={12} sm={6} md={4} lg={3} className="ml-search-result">
    <Link
      to={props.detailPath + encodeURIComponent(props.result.uri)}
      style={{ textDecoration: 'none' }}
    >
      <Panel
        bsStyle="info"
        style={{ height: '200px', overflow: 'hidden' }}
        header={props.header && <props.header {...props} />}
      >
        <props.content {...props} />
      </Panel>
    </Link>
  </Col>
);

CardResult.defaultProps = {
  content: SearchSnippets,
  header: Header,
  detailPath: '/detail'
};

CardResult.propTypes = {
  content: PropTypes.func,
  header: PropTypes.func,
  detailPath: PropTypes.string,
  result: PropTypes.shape({
    uri: PropTypes.string
  })
};

export default CardResult;

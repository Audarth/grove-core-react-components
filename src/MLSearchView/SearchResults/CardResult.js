import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';
import './CardResult.css';

const prettyUri = uri => {
  const uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

const CardResult = (props) => (
  <Col xs={12} sm={6} md={4} lg={3}
    className="ml-search-result"
  >
    <Panel bsStyle="info"
      header={
        <Link to={props.detailPath + encodeURIComponent(props.result.uri)}>
          {props.result.label || prettyUri(props.result.uri)}
        </Link>
      }
    >
      <div className="ml-search-result-matches">
        {
          props.result.matches && props.result.matches.map((match, index) =>
            <SearchSnippet match={match} key={index} />
          )
        }
      </div>
    </Panel>
  </Col>
);

export default CardResult;

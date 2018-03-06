import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import MLSearchBar from './MLSearchBar';
import Facets from './Facets/Facets';
import MLSearchResponseView from './MLSearchResponseView';

class MLSearchView extends Component {
  constructor(props) {
    super(props);

    this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
    this.handleQueryTextClear = this.handleQueryTextClear.bind(this);
    this.handlePageSelection = this.handlePageSelection.bind(this);
    this.search = this.search.bind(this);
  }

  handleQueryTextChange(event) {
    this.props.handleQueryTextChange(event.target.value);
  }

  handleQueryTextClear() {
    this.props.handleQueryTextChange('');
  }

  handlePageSelection(pageNumber) {
    if (pageNumber !== this.props.page) {
      this.props.changePage(pageNumber);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.stagedSearch.page !== this.props.stagedSearch.page ||
      // Intentionally using != to test object reference (ie, is it the
      // same object?) Because our Redux flow will swap out the constraints
      // object on any change, but keep it referentially the same otherwise
      nextProps.stagedSearch.constraints != this.props.stagedSearch.constraints
    ) {
      // TODO: DRY up with this.search()?
      nextProps.runSearch(nextProps.stagedSearch);
    }
  }

  search(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.runSearch(this.props.stagedSearch);
  }

  render() {
    return (
      <Row>
        <Col md={3}>
          <Facets
            availableConstraints={this.props.facets}
            activeConstraints={this.props.activeConstraints}
            addConstraint={this.props.addConstraint}
            removeConstraint={this.props.removeConstraint}
          />
        </Col>
        <Col md={9}>
          <Row>
            <MLSearchBar
              queryText={this.props.queryText}
              onQueryTextChange={this.handleQueryTextChange}
              onQueryTextClear={this.handleQueryTextClear}
              onSearchExecute={this.search}
            />
          </Row>
          {this.props.isSearchComplete && (
            <MLSearchResponseView
              error={this.props.error}
              results={this.props.results}
              executionTime={this.props.executionTime}
              total={this.props.total}
              page={this.props.page}
              totalPages={this.props.totalPages}
              handlePageSelection={this.handlePageSelection}
              detailPath={this.props.detailPath}
              resultComponent={this.props.resultComponent}
            />
          )}
        </Col>
      </Row>
    );
  }
}

MLSearchView.propTypes = {
  // TODO: flesh out which are required
  // TODO: group together some of these, perhaps back to what is returned from
  // selectors, like stagedSearch and searchResponse
  stagedSearch: PropTypes.object, // TODO: say more about shape of this
  error: PropTypes.string,
  results: PropTypes.array, // TODO: say more about shape of this
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  isSearchComplete: PropTypes.bool,
  queryText: PropTypes.string.isRequired,
  handleQueryTextChange: PropTypes.func,
  runSearch: PropTypes.func,
  changePage: PropTypes.func,
  detailPath: PropTypes.string,

  // TODO: rename facets => activeConstraints?
  facets: PropTypes.object,
  activeConstraints: PropTypes.object,
  addConstraint: PropTypes.func,
  removeConstraint: PropTypes.func
};

export default MLSearchView;

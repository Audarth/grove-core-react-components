import React from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {
  Row,
  Col,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import CardResult from './CardResult';
import ListResult from './ListResult';
import Fade from '../../animations/Fade';

const DefaultNoResults = () => (
  <Col md={12}>
    <p><br/><strong>No results matched your search.</strong></p>
  </Col>
);

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    const resultComponentName = props.resultComponent ? '' : 'Cards';
    this.state = {
      resultComponentName: resultComponentName,
      resultComponent: props.resultComponent || CardResult
    };
    this.setResultType = this.setResultType.bind(this);
  }

  setResultType(e) {
    let resultComponent;
    if (e === 'Cards') {
      resultComponent = CardResult;
    } else if (e === 'List') {
      resultComponent = ListResult;
    } else {
      throw 'Invalid Result Type: ' + e;
    }
    this.setState({
      resultComponentName: e,
      resultComponent: resultComponent
    });
  }

  render() {
    if (!this.props.results) {
      return null;
    }
    // For now, if you provide a resultComponent, we suppress the choice among
    // various types, though I could imagine letting the user specify > 1
    return (
      <div>
        {this.props.results.length > 0 && !this.props.resultComponent && (
          <Col xs={12} md={6} style={{ float: 'right' }}>
            <ButtonToolbar style={{ float: 'right', marginBottom: '10px' }}>
              <ToggleButtonGroup
                type="radio"
                name="result-options"
                value={this.state.resultComponentName}
                onChange={this.setResultType}
              >
                <ToggleButton value="Cards">Cards</ToggleButton>
                <ToggleButton value="List">List</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>
          </Col>
        )}
        <Row className="ml-search-results">
          <Col md={12}>
            <TransitionGroup appear={true}>
              {this.props.results.map(result => (
                <Fade duration={500} key={result.uri}>
                  <this.state.resultComponent
                    result={result}
                    detailPath={this.props.detailPath || '/detail'}
                  />
                </Fade>
              ))}
              {this.props.results.length === 0 && (
                <Fade duration={500}>
                  <this.props.noResults />
                </Fade>
              )}
            </TransitionGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

SearchResults.defaultProps = {
  noResults: DefaultNoResults
};

SearchResults.propTypes = {
  resultComponent: PropTypes.func,
  noResults: PropTypes.func,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string
    })
  ).isRequired,
  detailPath: PropTypes.string
};

export default SearchResults;

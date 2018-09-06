import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';

const cmOptions = {
  theme: 'default',
  height: 'auto',
  viewportMargin: Infinity,
  mode: {
    name: 'javascript',
    json: true,
    statementIndent: 2
  },
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2
};

class CreateView extends React.Component {
  constructor(props) {
    super(props);

    this.resetForm = this.resetForm.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);

    let initCode =
      '{\n  "exampleString": "Enter JSON. It will be validated.",\n  "exampleNumber": 1234,\n  "exampleBoolean": true\n}';

    this.state = {
      code: initCode,
      invalid: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.docUri !== this.props.docUri) {
      this.props.history.push(
        this.props.redirectPath + '/' + encodeURIComponent(this.props.docUri)
      );
    }
  }

  onCodeChange(editor, metadata, code) {
    this.setState({ invalid: false, code });
    try {
      JSON.parse(code);
    } catch (err) {
      this.setState({ invalid: true, code });
    }
  }

  resetForm() {
    this.setState({ code: '', invalid: false });
  }

  render() {
    const icon = this.state.invalid ? 'remove' : 'ok';
    const cls = this.state.invalid ? 'invalid' : 'valid';
    return (
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <span className={`${cls} glyphicon glyphicon-${icon}`} />
            &nbsp;JSON Editor
          </div>
          <CodeMirror
            value={this.state.code}
            onChange={this.onCodeChange}
            autoCursor={false}
            options={Object.assign({}, cmOptions)}
          />
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props
              .onCreateExecute(this.state.code)
              .then(this.setState({ value: '' }));
          }}
        >
          <Button
            type="submit"
            bsStyle="primary"
            className="btn-raised"
            disabled={this.state.invalid}
          >
            Submit
          </Button>
          <Button
            type="button"
            bsStyle="default"
            className="btn-raised"
            onClick={this.resetForm}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
    //}
  }
}

CreateView.propTypes = {
  redirectPath: PropTypes.string.isRequired
};

export default withRouter(CreateView);

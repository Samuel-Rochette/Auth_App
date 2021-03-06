import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        history.replace('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.replace('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}

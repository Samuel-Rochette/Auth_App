import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import TextField from './TextField';
import SignupFields from './SignupFields';

class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
    this.props.history.push('/feature');
  }

  renderFields() {
    return _.map(SignupFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={TextField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderFields()}
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  _.each(SignupFields, ({ name }) => {
    if (!formProps[name]) {
      errors[name] = 'You must provide a Value';
    }

    return;
  });

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({ form: 'signup', validate })(
  connect(mapStateToProps, actions)(Signup)
);

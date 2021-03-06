import React from 'react';
import PropTypes from 'prop-types';
import FormItem from './FormItem';
import string from './../lang';
import './signup.scss';

const SignUp = props =>
  props.web ? (
    <div className="signup web">
      <Form {...props} />
    </div>
  ) : (
    <div className="signup">
      <Form {...props} />
    </div>
  );

const Form = props => (
  <div className="form">
    <div className="form-header">
      <p>{string.signUp.header}</p>
      <p>{string.signUp.subheader}</p>
    </div>
    <div className="signup-form">
      <form autoComplete="off">
        {props.items.map((formItem, index) => {
          return (
            <FormItem
              key={index}
              formItem={formItem}
              onChange={props.onChangeField}
              isShowingPassword={props.isShowingPassword}
              onToggleShowPassword={props.onToggleShowPassword}
              value={props.values[formItem.name]}
              error={props.errors[formItem.name]}
            />
          );
        })}
        <div className="button">
          <button
            className="create-button"
            onClick={props.onClickSignUp}
            disabled={props.disabled}
          >
            <span>{string.signUp.buttons.createAccount}</span>
          </button>
        </div>
        {errorGeneral(props)}
      </form>
    </div>
  </div>
);

const errorGeneral = props => {
  if (props.signupError) {
    const { data } = props.signupError;
    if (!data) return '';
    const { description } = data;
    if (!description) return '';
    return <div className="general-error">{description}</div>;
  }
};

Form.propTypes = {
  onClickSignUp: PropTypes.func,
  errors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  isShowingPassword: PropTypes.bool.isRequired,
  onChangeField: PropTypes.func,
  onToggleShowPassword: PropTypes.func,
  disabled: PropTypes.bool.isRequired
};

SignUp.propTypes = {
  web: PropTypes.bool
};

export default SignUp;

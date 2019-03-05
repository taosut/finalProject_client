import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import GetTokenForm from '../../components/Forms/GetTokenForm/GetTokenForm';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm/ResetPasswordForm';
import { setPasswordReseted } from '../../actions/customers';

import './ResetPassword.scss';

const propTypes = {
  isSentResetPasswordToken: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isPasswordReseted: PropTypes.bool,
  setIsPasswordReseted: PropTypes.func.isRequired,
  match: PropTypes.obj,
  email: PropTypes.string
};

const defaultProps = {
  isSentResetPasswordToken: false,
  isAuthenticated: false,
  isPasswordReseted: false,
  match: {},
  email: ''
};

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */

const ResetPassword = (props) => {
  const {
    match: {
      params: { token }
    },
    isSentResetPasswordToken,
    isAuthenticated,
    isPasswordReseted,
    setIsPasswordReseted,
    email
  } = props;

  let form;

  if (isPasswordReseted && token) {
    setIsPasswordReseted(false);
    return <Redirect to="/login" />;
  }

  if (isPasswordReseted) {
    setIsPasswordReseted(false);
    return <Redirect to="/profile" />;
  }

  if (isAuthenticated) {
    form = <ResetPasswordForm email={email} />;
  } else if (token) {
    form = <ResetPasswordForm token={token} />;
  } else if (isSentResetPasswordToken) {
    form = (
      <div>
        <p className="resetPassword__message"> A letter has been sent to your email. Check it and follow the instructions!</p>
      </div>
    );
  } else {
    form = <GetTokenForm />;
  }

  return (
    <>
      <Header />
      <section className="resetPassword">
        { form }
      </section>
      <Footer />
    </>
  );
};

ResetPassword.propTypes = propTypes;
ResetPassword.defaultProps = defaultProps;

const mapStateToProps = state => ({
  isAuthenticated: state.customers.isAuthenticated,
  isSentResetPasswordToken: state.customers.isSentResetPasswordToken,
  isPasswordReseted: state.customers.isPasswordReseted,
  email: state.customers.profile.email
});

const mapDispatchToProps = dispatch => (
  {
    setIsPasswordReseted: data => dispatch(setPasswordReseted(data)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

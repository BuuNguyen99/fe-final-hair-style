/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/Auth/saga';
import reducer from 'containers/Auth/reducer';
import { createStructuredSelector } from 'reselect';
import { loginAccount } from 'containers/Auth/actions';
import { makeSelectLoginAccount } from 'containers/Auth/selectors';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

const key = 'auth';

function Login({ dataUser, onLoginAccount }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    onLoginAccount(data, loginAccountCallBack);
  };

  const loginAccountCallBack = error => {
    if (error?.status === 400) {
      toast.error('Incorrect username and password');
      return;
    }
    if (error) {
      toast.error('Login failed');
      return;
    }
    window.location.reload();
    toast.success('Logged in successfully');
  };

  return (
    <form
      className="form w-100"
      noValidate
      id="kt_login_signin_form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center mb-10">
        <h1 className="text-dark mb-2">Sign In to Hair Salon</h1>
        <div className="text-gray-400 fw-bold fs-4">
          New Here?{' '}
          <Link to="/auth/registration" className="link-primary fw-bolder">
            Create an Account
          </Link>
        </div>
      </div>
      <div className="fv-row mb-4">
        <label className="form-label fw-bolder text-dark fs-6 required">
          Username
        </label>
        <input
          placeholder="Username"
          name="username"
          type="text"
          {...register('username')}
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          autoComplete="off"
        />
        <div className="invalid-feedback">{errors.username?.message}</div>
      </div>
      <div className="fv-row mb-4">
        <label className="form-label fs-6 fw-bolder text-dark required">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          {...register('password')}
          className={`form-control form-control-lg form-control-solid ${
            errors.password ? 'is-invalid' : ''
          }`}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </div>
      <div className="fv-row mb-2">
        <Link
          to="/auth/forgot-password"
          className="link-primary fs-6 fw-bolder"
        >
          Forgot Password ?
        </Link>
      </div>
      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className={`btn btn-lg btn-primary w-100 mb-5 ${dataUser?.isFetching &&
            'disabled'}`}
        >
          <span className="indicator-label">
            {dataUser?.isFetching && (
              <Spinner color="light" size="sm">
                Loading...
              </Spinner>
            )}{' '}
            Continue
          </span>
        </button>
      </div>
    </form>
  );
}

const mapStateToProps = createStructuredSelector({
  dataUser: makeSelectLoginAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoginAccount: (data, callback) => dispatch(loginAccount(data, callback)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);

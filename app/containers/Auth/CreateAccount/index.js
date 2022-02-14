/* eslint-disable jsx-a11y/anchor-is-valid */
import * as Yup from 'yup';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/Auth/saga';
import reducer from 'containers/Auth/reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { registerAccount } from 'containers/Auth/actions';
import { makeSelectRegisterAccount } from 'containers/Auth/selectors';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

const key = 'auth';

function Registration({ dataRegisterAccount, onRegisterAccount }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmedPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  });

  const onSubmit = data => {
    onRegisterAccount(data, registerAccountCallBack);
    console.log(JSON.stringify(data, null, 2));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const registerAccountCallBack = error => {
    if (error?.status === 400) {
      toast.error('This account is already registered');
      return;
    }
    if (error) {
      toast.error('Account registration failed');
      return;
    }
    toast.success('Successful account registration, Please verify in email');
  };
  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_signup_form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-5 text-center">
        <h1 className="text-dark mb-3">Create an Account</h1>

        <div className="text-gray-400 fw-bold fs-4">
          Already have an account?
          <Link
            to="/auth/forgot-password"
            className="link-primary fw-bolder"
            style={{ marginLeft: '5px' }}
          >
            Forgot Password ?
          </Link>
        </div>
      </div>

      <div className="d-flex align-items-center mb-5">
        <div className="border-bottom border-gray-300 mw-50 w-100" />
        <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
        <div className="border-bottom border-gray-300 mw-50 w-100" />
      </div>

      <div className="mb-4 row fv-row">
        <div className="col-xl-6">
          <label className="form-label fw-bolder text-dark fs-6 required">
            First name
          </label>
          <input
            placeholder="First name"
            name="firstname"
            type="text"
            {...register('firstname')}
            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
            autoComplete="off"
          />
          <div className="invalid-feedback">{errors.firstname?.message}</div>
        </div>
        <div className="col-xl-6">
          <div className="fv-row">
            <label className="form-label fw-bolder text-dark fs-6 required">
              Last name
            </label>
            <input
              placeholder="Last name"
              name="lastname"
              type="text"
              {...register('lastname')}
              className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
              autoComplete="off"
            />
            <div className="invalid-feedback">{errors.lastname?.message}</div>
          </div>
        </div>
      </div>

      <div className="mb-4 row fv-row">
        <div className="col-xl-6">
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
        <div className="col-xl-6">
          <label className="form-label fw-bolder text-dark fs-6 required">
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            autoComplete="off"
            name="email"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
      </div>

      <div className="mb-4 fv-row" data-kt-password-meter="true">
        <label className="form-label fw-bolder text-dark fs-6 required">
          Password
        </label>
        <div className="position-relative mb-2">
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
      </div>

      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-dark fs-6 required">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmedPassword"
          placeholder="Password confirmation"
          autoComplete="off"
          {...register('confirmedPassword')}
          className={`form-control ${
            errors.confirmedPassword ? 'is-invalid' : ''
          }`}
        />

        <div className="invalid-feedback">
          {errors.confirmedPassword?.message}
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className={`btn btn-lg btn-primary w-100 mb-5 ${dataRegisterAccount?.isFetching &&
            'disabled'}`}
        >
          <span className="indicator-label">
            {dataRegisterAccount?.isFetching && (
              <Spinner color="light" size="sm">
                Loading...
              </Spinner>
            )}{' '}
            Submit
          </span>
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            <span className="indicator-label">Cancel</span>
          </button>
        </Link>
      </div>
    </form>
  );
}

const mapStateToProps = createStructuredSelector({
  dataRegisterAccount: makeSelectRegisterAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRegisterAccount: (data, callback) =>
      dispatch(registerAccount(data, callback)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Registration);

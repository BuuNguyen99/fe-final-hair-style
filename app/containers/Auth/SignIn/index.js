/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <form className="form w-100" noValidate id="kt_login_signin_form">
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
        <label className="form-label fs-6 fw-bolder text-dark required">
          Email
        </label>
        <input
          placeholder="Email"
          className={clsx('form-control form-control-lg form-control-solid')}
          type="email"
          name="email"
          autoComplete="off"
        />
      </div>
      <div className="fv-row mb-4">
        <label className="form-label fs-6 fw-bolder text-dark required">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          className={clsx('form-control form-control-lg form-control-solid')}
        />
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
          className="btn btn-lg btn-primary w-100 mb-5"
        >
          <span className="indicator-label">Continue</span>
        </button>
      </div>
    </form>
  );
}

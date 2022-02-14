/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export function Registration() {
  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_signup_form"
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

      <div className="row fv-row">
        <div className="col-xl-6">
          <label className="form-label fw-bolder text-dark fs-6">
            First name
          </label>
          <input
            placeholder="First name"
            type="text"
            autoComplete="off"
            className={clsx('form-control form-control-lg form-control-solid')}
          />
        </div>
        <div className="col-xl-6">
          <div className="fv-row mb-5">
            <label className="form-label fw-bolder text-dark fs-6">
              Last name
            </label>
            <input
              placeholder="Last name"
              type="text"
              autoComplete="off"
              className={clsx(
                'form-control form-control-lg form-control-solid',
              )}
            />
          </div>
        </div>
      </div>

      <div className="fv-row mb-4">
        <label className="form-label fw-bolder text-dark fs-6 required">
          Email
        </label>
        <input
          placeholder="Email"
          type="email"
          autoComplete="off"
          className={clsx('form-control form-control-lg form-control-solid')}
        />
      </div>

      <div className="mb-4 fv-row" data-kt-password-meter="true">
        <label className="form-label fw-bolder text-dark fs-6 required">
          Password
        </label>
        <div className="position-relative mb-2">
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            className={clsx('form-control form-control-lg form-control-solid')}
          />
        </div>
      </div>

      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-dark fs-6 required">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Password confirmation"
          autoComplete="off"
          className={clsx('form-control form-control-lg form-control-solid')}
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary w-100 mb-5"
        >
          <span className="indicator-label">Submit</span>
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

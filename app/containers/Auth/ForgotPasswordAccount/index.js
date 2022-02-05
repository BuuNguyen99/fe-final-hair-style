import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

export function ForgotPasswordAccount() {
  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_password_reset_form"
    >
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">Forgot Password ?</h1>

        <div className="text-gray-400 fw-bold fs-4">
          Enter your email to reset your password.
        </div>
      </div>

      <div className="fv-row mb-10">
        <label className="form-label fw-bolder text-gray-900 fs-6">Email</label>
        <input
          type="email"
          placeholder="admin@demo.com"
          autoComplete="off"
          className={clsx('form-control form-control-lg form-control-solid')}
        />
      </div>

      <div className="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          id="kt_password_reset_submit"
          className="btn btn-lg btn-primary fw-bolder me-4"
        >
          <span className="indicator-label">Submit</span>
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_password_reset_form_cancel_button"
            className="btn btn-lg btn-light-primary fw-bolder"
          >
            <span className="indicator-label">Cancel</span>
          </button>
        </Link>
      </div>
    </form>
  );
}

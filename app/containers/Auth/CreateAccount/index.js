/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export function Registration() {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  });

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

      <div className="row fv-row">
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
          </div>
          <div className="invalid-feedback">{errors.lastname?.message}</div>
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
          name="email"
          {...register('email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
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
          name="confirmPassword"
          placeholder="Password confirmation"
          autoComplete="off"
          {...register('confirmPassword')}
          className={`form-control ${
            errors.confirmPassword ? 'is-invalid' : ''
          }`}
        />

        <div className="invalid-feedback">
          {errors.confirmPassword?.message}
        </div>
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

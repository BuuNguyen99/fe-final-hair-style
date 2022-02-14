/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export function Login() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
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
    console.log(JSON.stringify(data, null, 2));
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
        <label className="form-label fs-6 fw-bolder text-dark required">
          Email
        </label>
        <input
          placeholder="Email"
          type="email"
          name="email"
          autoComplete="off"
          {...register('email')}
          className={`form-control form-control-lg form-control-solid ${
            errors.email ? 'is-invalid' : ''
          }`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
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
          className="btn btn-lg btn-primary w-100 mb-5"
        >
          <span className="indicator-label">Continue</span>
        </button>
      </div>
    </form>
  );
}

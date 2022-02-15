import * as Yup from 'yup';
import React, { memo, useState } from 'react';
import { Spinner } from 'reactstrap';
import { FcOk } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';
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
import { forgotPassword } from 'containers/Auth/actions';
import { makeSelectForgotPasswordAccount } from 'containers/Auth/selectors';

const key = 'auth';

function ForgotPasswordAccount({
  dataForgotPasswordAccount,
  onForgotPasswordAccount,
}) {
  const [email, setEmail] = useState('');
  const [isShowNoti, setIsShowNoti] = useState(false);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  });

  const onSubmit = data => {
    setEmail(data.email);
    setIsShowNoti(true);
    onForgotPasswordAccount(data);
    setValue('email', '');
  };

  const handleCloseNoti = () => {
    setEmail('');
    setIsShowNoti(false);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_password_reset_form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">Forgot Password ?</h1>

        <div className="text-gray-400 fw-bold fs-4">
          Enter your email to reset your password.
        </div>
      </div>
      {isShowNoti && !dataForgotPasswordAccount?.isFetching ? (
        <div role="alert" className="el-alert mb-2 el-alert--success is-light">
          <div className="mx-2">
            <FcOk size={20} />
          </div>
          <div className="el-alert__content">
            <p className="el-alert__description">
              We have <strong>sent an email</strong> with a link to reset your
              password. It may takes from 1 to 2 minutes for complete. Please
              check your inbox <strong>{email}</strong>.
            </p>
            <div
              className="el-alert__closebtn el-icon-close"
              onClick={handleCloseNoti}
              role="button"
            >
              <AiOutlineClose />
            </div>
          </div>
        </div>
      ) : null}
      <div className="fv-row mb-10">
        <label className="form-label fw-bolder text-gray-900 fs-6 required">
          Email
        </label>
        <input
          type="email"
          placeholder="admin@demo.com"
          autoComplete="off"
          name="email"
          {...register('email')}
          className={`form-control form-control-lg form-control-solid ${
            errors.email ? 'is-invalid' : ''
          }`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div>

      <div className="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          id="kt_password_reset_submit"
          className={`btn btn-lg btn-primary fw-bolder me-4 ${dataForgotPasswordAccount?.isFetching &&
            'disabled'}`}
        >
          <span className="indicator-label">
            {dataForgotPasswordAccount?.isFetching && (
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

const mapStateToProps = createStructuredSelector({
  dataForgotPasswordAccount: makeSelectForgotPasswordAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    onForgotPasswordAccount: data => dispatch(forgotPassword(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ForgotPasswordAccount);

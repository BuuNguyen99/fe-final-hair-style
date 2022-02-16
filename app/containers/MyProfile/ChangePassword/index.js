import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from 'reactstrap';

function ChangePassword({ dataChangePassword, onChangePasswordAccount }) {
  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required!'),
    newPassword: Yup.string()
      .required('New Password is required!')
      .min(6, ' New Password must be at least 6 characters!')
      .max(40, ' New Password must not exceed 40 characters!'),
    confirmNewPassword: Yup.string()
      .required('Confirm New Password is required!')
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Confirm New Password does not match!',
      ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    ...formOptions,
  });

  const onSubmit = data => {
    const dataChange = {
      oldPassword: data.password,
      newPassword: data.newPassword,
      confirmedPassword: data.confirmNewPassword,
    };
    onChangePasswordAccount(dataChange, handleCallBackChangePassword);
  };

  const handleCallBackChangePassword = error => {
    if (error) {
      toast.error('Change Password failed');
      return;
    }
    toast.success('Change Password Successfully');
  };

  return (
    <div className="register-form">
      <h2 className="mb-5">Change Password Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-4">
          <div className="form-group col-6">
            <label className="required mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Please enter my password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="form-group col-6">
            <label className="required mb-2">New Password</label>
            <input
              name="newPassword"
              type="password"
              placeholder="Please enter new password"
              {...register('newPassword')}
              className={`form-control ${
                errors.newPassword ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">
              {errors.newPassword?.message}
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="form-group col-6">
            <label className="required mb-2">Confirm New Password</label>
            <input
              name="confirmNewPassword"
              type="password"
              placeholder="Please enter confirm new password"
              {...register('confirmNewPassword')}
              className={`form-control ${
                errors.confirmNewPassword ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">
              {errors.confirmNewPassword?.message}
            </div>
          </div>
        </div>
        <div className="form-group my-5">
          <button
            type="submit"
            className={`btn btn-primary ${dataChangePassword?.isFetching &&
              'disabled'}`}
          >
            {dataChangePassword?.isFetching && (
              <Spinner color="light" size="sm">
                Loading...
              </Spinner>
            )}{' '}
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

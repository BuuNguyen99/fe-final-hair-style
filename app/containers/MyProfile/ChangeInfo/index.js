/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import { Spinner } from 'reactstrap';

const { Option } = Select;

function ChangeInfo({ profile, dataUpdateProfile, onUpdateProfile }) {
  const [gender, setGender] = useState(profile?.gender || null);
  const [birth, setBirth] = useState(profile?.birthday || null);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required!'),
    lastname: Yup.string().required('Last Name is required!'),
    address: Yup.string().required('Address is required!'),
    phoneNumber: Yup.string()
      .required('Phone number is required!')
      .min(10, 'Please enter a valid phone number!')
      .max(11, 'Please enter a valid phone number!')
      .matches(
        /^(0[1-9])+([0-9]{8,9})\s*$/,
        'Please enter a valid phone number!',
      ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    ...formOptions,
  });

  useEffect(() => {
    setValue('username', profile?.account?.username || '');
    setValue('email', profile?.account?.email || '');
    setValue('firstname', profile?.firstname || '');
    setValue('lastname', profile?.lastname || '');
    setValue('address', profile?.address || '');
    setValue('phoneNumber', profile?.mobile || '');
  }, [profile]);

  const onSubmit = data => {
    const dataProfile = {
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      mobile: data.phoneNumber,
      birthday: birth,
      gender,
    };
    onUpdateProfile(dataProfile, handleCallBackUpdateProfile);
  };

  const handleCallBackUpdateProfile = error => {
    if (error) {
      toast.error('Personal information update failed');
      return;
    }
    toast.success('Successfully updated personal information');
  };

  function onChange(value) {
    setGender(value === 'male' || false);
  }
  function onChangeDate(value) {
    setBirth(value);
  }

  return (
    <div className="register-form">
      <h2>Personal information</h2>
      <p>Manage your personal information.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="form-group col-4">
            <label className="mb-2">Username</label>
            <input
              name="username"
              type="text"
              {...register('username')}
              className="form-control"
              disabled
            />
          </div>
          <div className="form-group col-8">
            <label className="mb-2">Email</label>
            <input
              name="email"
              type="text"
              {...register('email')}
              className="form-control"
              disabled
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-6">
            <label className="required mb-2">First Name</label>
            <input
              name="firstname"
              type="text"
              {...register('firstname')}
              className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.firstname?.message}</div>
          </div>
          <div className="form-group col-6">
            <label className="required mb-2">Last Name</label>
            <input
              name="lastname"
              type="text"
              {...register('lastname')}
              className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.lastname?.message}</div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-6">
            <label className="mb-2">Gender</label>
            <Select
              defaultValue={
                gender === true ? 'male' : gender === false ? 'female' : null
              }
              style={{ width: '100%' }}
              showSearch
              placeholder="Select a gender"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </div>
          <div className="form-group col-6">
            <label className="mb-2">Date of birth</label>
            <DatePicker
              onChange={onChangeDate}
              className="form-control"
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              defaultValue={birth ? moment(birth, 'DD/MM/YYYY') : ''}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-8">
            <label className="required mb-2">Address</label>
            <input
              name="address"
              type="text"
              {...register('address')}
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
          </div>
          <div className="form-group col-4">
            <label className="required mb-2">Phone</label>
            <input
              name="phoneNumber"
              type="text"
              {...register('phoneNumber')}
              className={`form-control ${
                errors.phoneNumber ? 'is-invalid' : ''
              }`}
            />
            <div className="invalid-feedback">
              {errors.phoneNumber?.message}
            </div>
          </div>
        </div>
        <div className="form-group my-5">
          <button
            type="submit"
            className={`btn btn-primary ${dataUpdateProfile?.isFetching &&
              'disabled'}`}
          >
            {dataUpdateProfile?.isFetching && (
              <Spinner color="light" size="sm">
                Loading...
              </Spinner>
            )}{' '}
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangeInfo;

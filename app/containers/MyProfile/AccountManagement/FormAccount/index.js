/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import * as Yup from 'yup';
import { DatePicker, Select } from 'antd';
import 'antd/dist/antd.css';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { CookiesStorage } from 'shared/configs/cookie';

const { Option } = Select;

function FormAccount({
  setIsAdd,
  dataAddAccount,
  onAddAccount,
  onGetListAccount,
  isEdit,
  setIsEdit,
  dataDetailAccount,
  onGetDetailAccount,
  onEditAccount,
  isAdd,
}) {
  const [gender, setGender] = useState(null);
  const [birth, setBirth] = useState(null);
  const [enable, setEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required!'),
    email: Yup.string()
      .required('Email is required!')
      .email('Email is invalid!'),
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
    password: !isEdit
      ? Yup.string()
          .required('Password is required!')
          .min(6, 'Password must be at least 6 characters!')
          .max(40, 'Password must not exceed 40 characters!')
      : null,
    confirmedPassword: !isEdit
      ? Yup.string()
          .required('Confirm Password is required!')
          .oneOf(
            [Yup.ref('password'), null],
            'Confirm Password does not match!',
          )
      : null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const username = CookiesStorage.getCookieData('username') || null;
    if (username && isEdit) {
      onGetDetailAccount(username);
    }
  }, []);

  useEffect(() => {
    if (isEdit && dataDetailAccount?.data?.length !== 0) {
      const d = new Date(dataDetailAccount?.data?.birthday);
      setGender(dataDetailAccount?.data?.gender);
      setBirth(d);
      setEnable(dataDetailAccount?.data?.account?.enabled);
      setValue('username', dataDetailAccount?.data?.account?.username || '');
      setValue('email', dataDetailAccount?.data?.account?.email || '');
      setValue('firstname', dataDetailAccount?.data?.firstname || '');
      setValue('lastname', dataDetailAccount?.data?.lastname || '');
      setValue('address', dataDetailAccount?.data?.address || '');
      setValue('phoneNumber', dataDetailAccount?.data?.mobile || '');
      setIsLoading(true);
    }
  }, [dataDetailAccount]);

  const onSubmit = data => {
    const dataAdd = {
      username: data.username,
      email: data.email,
      enabled: enable,
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      mobile: data.phoneNumber,
      birthday: birth,
      gender,
      password: data.password,
      confirmedPassword: data.confirmedPassword,
    };
    if (isEdit) {
      const dataEdit = {
        username: data.username,
        email: data.email,
        enabled: enable,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        mobile: data.phoneNumber,
        birthday: birth,
        gender,
      };
      onEditAccount(dataEdit, handleCallBackEditAccount);
      return;
    }
    onAddAccount(dataAdd, handleCallBackAddAccount);
  };

  const handleCallBackAddAccount = error => {
    if (error) {
      toast.error('Add Account failed');
      return;
    }
    const data = {
      searchFilters: [],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [
        {
          joinColumnName: 'role',
          searchFilter: {
            property: 'name',
            operator: 'IN',
            value: 'ADMIN',
          },
        },
      ],
    };

    const params = {
      roleId: 1,
      page: 0,
      size: 999999999,
    };

    onGetListAccount(data, params);
    setIsAdd(true);
    toast.success('Add Account successfully');
  };

  const handleCallBackEditAccount = error => {
    if (error) {
      toast.error('Edit Account failed');
      return;
    }
    const data = {
      searchFilters: [],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [
        {
          joinColumnName: 'role',
          searchFilter: {
            property: 'name',
            operator: 'IN',
            value: 'ADMIN',
          },
        },
      ],
    };

    const params = {
      roleId: 1,
      page: 0,
      size: 999999999,
    };

    onGetListAccount(data, params);
    setIsAdd(true);
    setIsEdit(false);
    CookiesStorage.setCookieData('username', null);
    toast.success('Edit Account successfully');
  };

  function onChange(value) {
    setGender(value === 'male' || false);
  }
  function onChangeDate(value) {
    setBirth(value);
  }
  function onChangeStatus(value) {
    const bool = value === 'enable' && true;
    setEnable(bool);
  }

  return (
    <div className="add-product-page">
      {isAdd || isLoading ? (
        <>
          <h2 className="mt-3">{`${
            isEdit ? 'Edit Account' : 'Add Account'
          }  `}</h2>
          <div className="register-form mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3">
                <div className="form-group col-4">
                  <label className="mb-2 required">Username</label>
                  <input
                    name="username"
                    type="text"
                    {...register('username')}
                    className={`form-control ${
                      errors.username ? 'is-invalid' : ''
                    }`}
                    disabled={isEdit}
                  />
                  <div className="invalid-feedback">
                    {errors.username?.message}
                  </div>
                </div>
                <div className="form-group col-8">
                  <label className="mb-2 required">Email</label>
                  <input
                    name="email"
                    type="text"
                    {...register('email')}
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    disabled={isEdit}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="form-group col-6">
                  <label className="required mb-2">First Name</label>
                  <input
                    name="firstname"
                    type="text"
                    {...register('firstname')}
                    className={`form-control ${
                      errors.firstname ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.firstname?.message}
                  </div>
                </div>
                <div className="form-group col-6">
                  <label className="required mb-2">Last Name</label>
                  <input
                    name="lastname"
                    type="text"
                    {...register('lastname')}
                    className={`form-control ${
                      errors.lastname ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.lastname?.message}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="form-group col-3">
                  <label className="mb-2">Gender</label>
                  <Select
                    defaultValue={
                      gender === true
                        ? 'male'
                        : gender === false
                        ? 'female'
                        : null
                    }
                    style={{ width: '100%' }}
                    showSearch
                    placeholder="Select a gender"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>
                </div>
                <div className="form-group col-3">
                  <label className="mb-2">Status</label>
                  <Select
                    defaultValue={
                      enable === true
                        ? 'enable'
                        : enable === false
                        ? 'disable'
                        : null
                    }
                    style={{ width: '100%' }}
                    showSearch
                    optionFilterProp="children"
                    onChange={onChangeStatus}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="enable">Enable</Option>
                    <Option value="disable">Disable</Option>
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
                    className={`form-control ${
                      errors.address ? 'is-invalid' : ''
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.message}
                  </div>
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
              {!isEdit && (
                <div className="row">
                  <div className="col-6">
                    <label className="required mb-2">Password</label>
                    <input
                      placeholder="Password"
                      name="password"
                      type="password"
                      {...register('password')}
                      className={`form-control  ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                      autoComplete="off"
                    />
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="required mb-2">Confirm Password</label>
                    <input
                      placeholder="Confirm Password"
                      name="confirmedPassword"
                      type="password"
                      {...register('confirmedPassword')}
                      className={`form-control  ${
                        errors.confirmedPassword ? 'is-invalid' : ''
                      }`}
                      autoComplete="off"
                    />
                    <div className="invalid-feedback">
                      {errors.confirmedPassword?.message}
                    </div>
                  </div>
                </div>
              )}
              <div className="form-group my-5">
                <button
                  type="submit"
                  className={`btn btn-primary ${dataAddAccount?.isFetching &&
                    'disabled'}`}
                >
                  {dataAddAccount?.isFetching && (
                    <Spinner color="light" size="sm">
                      Loading...
                    </Spinner>
                  )}{' '}
                  {!isEdit ? 'Add' : 'Edit'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdd(true);
                    setIsEdit(false);
                    CookiesStorage.setCookieData('username', null);
                  }}
                  className="btn btn-light float-right mx-3"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default FormAccount;

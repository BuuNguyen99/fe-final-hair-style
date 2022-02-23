import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'antd/dist/antd.css';
import { Radio, Space, Button } from 'antd';
import { formatPriceVND } from '../../../utils/common';

function Payment({ dataCart }) {
  const [valueRadio, setValueRadio] = useState(1);
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full Name is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required!')
      .min(10, 'Please enter a valid phone number!')
      .max(11, 'Please enter a valid phone number!')
      .matches(
        /^(0[1-9])+([0-9]{8,9})\s*$/,
        'Please enter a valid phone number!',
      ),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    address: Yup.string().required('Address is required!'),
  });

  const [state, setState] = useState(0);

  useEffect(() => {
    let total = 0;
    if (dataCart?.data?.length !== 0) {
      // eslint-disable-next-line no-return-assign
      dataCart?.data.map(el => (total += el.unitPrice * el.quantity));
    }
    setState(total);
  }, [dataCart]);
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

  const onChangeRadio = e => {
    setValueRadio(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-4">
          <div className="header-payment">
            <h3>Buyer Information</h3>
            <p>To continue ordering, please enter the information below</p>
            <div className="row">
              <div className="form-group col-6 mb-3">
                <label className="required">Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  {...register('fullname')}
                  className={`form-control ${
                    errors.fullname ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.fullname?.message}
                </div>
              </div>
              <div className="form-group col-6 mb-3">
                <label className="required">Phone</label>
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
              <div className="form-group col-12 mb-3">
                <label className="required">Email</label>
                <input
                  name="email"
                  type="text"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
              <div className="form-group col-12 mb-3">
                <label className="required">Address</label>
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
              <div className="form-group col-12 mb-3">
                <label>Note</label>
                <textarea
                  rows="5"
                  name="note"
                  type="text"
                  {...register('note')}
                  className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.note?.message}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="header-payment">
            <h3>payment methods</h3>
            <Radio.Group onChange={onChangeRadio} value={valueRadio}>
              <Space direction="vertical">
                <Radio value={1}>
                  Cash payment on receipt (cash/swipe ATM card, Visa, Master)
                </Radio>
                <Radio value={2}>Payment via bank transfer (recommended)</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>
        <div className="col-4">
          <div className="header-payment">
            <h3>total money</h3>
            <div className="total">
              <p>Total</p>
              <p> {formatPriceVND(state.toString())} VND</p>
            </div>
            <div className="total">
              <p>Promotion when using Voucher</p>
              <p>00 VND</p>
            </div>
            <div className="payment-money">
              <p className="payment-money-text">Into money</p>
              <p className="money-text">
                {formatPriceVND(state.toString())} VND
              </p>
            </div>
            <div className="button-order">
              <Button type="primary" htmlType="submit" danger block>
                order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Payment;

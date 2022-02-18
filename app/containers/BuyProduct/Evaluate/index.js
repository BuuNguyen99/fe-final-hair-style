import React from 'react';
import { Rate } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Evaluate() {
  const validationSchema = Yup.object().shape({
    yourComment: Yup.string().required('Your comment is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    console.log(data);
    return false;
  }

  return (
    <div className="evaluate row">
      <div className="col-7 review">
        <h3 className="review-title">3 reviews for Flycam DJI Air 2S</h3>
        <div className="review-list">
          <div className="review-item">
            <div className="avatar">
              <img
                src="https://images.viblo.asia/60x60/a2ac1e41-bc36-48b4-b572-f2c1252a7e7a.jpg"
                alt=""
              />
            </div>
            <div className="content-item">
              <Rate allowHalf defaultValue={2.5} disabled className="rating" />
              <p className="name">
                Nam Bình <span className="data"> - 16, Mar, 2021 </span>
              </p>
              <p className="comment">
                Chiếc flycam được nâng cấp những tính năng mới rất đáng giá
              </p>
            </div>
          </div>
          <div className="review-item">
            <div className="avatar">
              <img
                src="https://images.viblo.asia/60x60/a2ac1e41-bc36-48b4-b572-f2c1252a7e7a.jpg"
                alt=""
              />
            </div>
            <div className="content-item">
              <Rate allowHalf defaultValue={2.5} disabled className="rating" />
              <p className="name">
                Nam Bình <span className="data"> - 16, Mar, 2021 </span>
              </p>
              <p className="comment">
                Chiếc flycam được nâng cấp những tính năng mới rất đáng giá
              </p>
            </div>
          </div>
          <div className="review-item">
            <div className="avatar">
              <img
                src="https://images.viblo.asia/60x60/a2ac1e41-bc36-48b4-b572-f2c1252a7e7a.jpg"
                alt=""
              />
            </div>
            <div className="content-item">
              <Rate allowHalf defaultValue={2.5} disabled className="rating" />
              <p className="name">
                Nam Bình <span className="data"> - 16, Mar, 2021 </span>
              </p>
              <p className="comment">
                Chiếc flycam được nâng cấp những tính năng mới rất đáng giá
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="submit-review col-5">
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="title"> Add Review </h3>
            <div className="form-group col-12 my-5">
              <label>Your review</label>
              <Rate allowHalf defaultValue={5} className="rating my-2" />
            </div>
            <div className="form-group col-12 mt-5">
              <label className="required mb-2">Your Comment</label>
              <textarea
                name="yourComment"
                type="text"
                {...register('yourComment')}
                className={`form-control ${
                  errors.yourComment ? 'is-invalid' : ''
                }`}
                rows="5"
              />
              <div className="invalid-feedback">
                {errors.yourComment?.message}
              </div>
            </div>
            <div className="row mt-5">
              <div className="form-group col-6">
                <label className="required">Name</label>
                <input
                  name="name"
                  type="text"
                  {...register('name')}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>
              <div className="form-group col-6">
                <label className="required">Email</label>
                <input
                  name="email"
                  type="text"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
            </div>
            <div className="form-group mt-5">
              <button type="submit" className="btn btn-dark">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Evaluate;

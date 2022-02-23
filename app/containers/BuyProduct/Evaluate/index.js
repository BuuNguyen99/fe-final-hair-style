import React, { useState } from 'react';
import { Rate } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import avatarDefault from 'assets/images/avatarDefault.png';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function Evaluate({
  id,
  dataComment,
  onAddCommentProduct,
  onGetCommentProduct,
  title,
}) {
  const { slug } = useParams();
  const [rate, setRate] = useState(5);

  const validationSchema = Yup.object().shape({
    yourComment: Yup.string().required('Your comment is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    const dataCommentTemp = {
      id,
      content: data.yourComment,
      rating: rate,
    };
    onAddCommentProduct(dataCommentTemp, handleCallBackAddComment);
  }

  const handleCallBackAddComment = error => {
    if (error) {
      toast.error('Add Comment Failed!');
      return;
    }
    toast.success('Add Comment Successfully!');
    onGetCommentProduct(slug);
    setValue('yourComment', '');
    setRate(5);
  };
  return (
    <div className="evaluate row">
      <div className="col-7 review">
        {dataComment?.data?.length !== 0 && (
          <>
            <h3 className="review-title">{`${
              dataComment?.data?.length
            } reviews for ${title}`}</h3>
            <div className="review-list">
              {dataComment?.data?.map((el, index) => (
                <div className="review-item" key={`review-item-${index}`}>
                  <div className="avatar">
                    <img
                      src={el?.profile?.linkAvatar || ''}
                      alt=""
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = avatarDefault;
                      }}
                    />
                  </div>
                  <div className="content-item">
                    <Rate
                      defaultValue={el?.rating}
                      disabled
                      className="rating"
                    />
                    <p className="name font-weight-bold">
                      {el?.profile?.firstname} {el?.profile?.lastname}
                      <span className="data">
                        {' '}
                        - {moment(new Date(el?.createdAt)).format('DD/MM/YYYY')}
                      </span>
                    </p>
                    <p className="comment">{el.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="submit-review col-5">
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="title"> Add Review </h3>
            <div className="form-group col-12 my-5">
              <label>Your review</label>
              <Rate
                defaultValue={rate}
                className="rating my-2"
                onChange={value => setRate(value)}
              />
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

import React, { memo, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Zoom from 'react-img-zoom';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Rate, Button, Tabs } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputSpinner from 'react-bootstrap-input-spinner';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { toast } from 'react-toastify';
import saga from 'containers/HomePage/saga';
import reducer from 'containers/HomePage/reducer';
import Description from './description';
import Evaluate from './Evaluate';
import {
  makeSelectDetailProduct,
  makeSelectDataComment,
} from '../HomePage/selectors';
import {
  getDetailProduct,
  getCommentProduct,
  addCommentProduct,
  addToCart,
} from '../HomePage/actions';
import { formatPriceVND } from '../../utils/common';
import { getCartProduct } from '../Auth/actions';

const key = 'home';

function BuyProduct({
  dataDetailProduct,
  onGetDetailProduct,
  onGetCommentProduct,
  dataComment,
  onAddCommentProduct,
  onAddToCart,
  onGetCartProduct,
}) {
  const history = useHistory();
  const { TabPane } = Tabs;
  const [isSuccess, setIsSuccess] = useState(false);
  const [number, setNumber] = useState(1);

  const { slug } = useParams();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onGetDetailProduct(slug);
    onGetCommentProduct(slug);
    setIsSuccess(true);
  }, [slug]);

  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <img src={dataDetailProduct?.data?.images[i]?.url || ''} alt="" />
    ),
  };

  const handleCategory = category => {
    switch (category) {
      case 'shampoo & conditioner':
        return ' Shampoo & Conditioner';
      case 'styling products':
        return 'Styling Products';
      case 'accessories':
        return 'Accessories';
      case 'hair color':
        return 'Hair Color';
      case 'hair styling tools':
        return 'Hair Styling Tools';
      case 'hair brushes & combs':
        return 'Hair Brushes & Combs';
      default:
        return 'other';
      // code block
    }
  };

  const handleAddToCart = (count, id) => {
    const data = {
      productId: id,
      quantity: count,
    };
    onAddToCart(data, handleCallBackAddCart);
  };

  const handleCallBackAddCart = error => {
    if (error) {
      toast.error('Add To Cart Item Failed');
      return;
    }
    toast.success('Add To Cart Item Successfully');
    onGetCartProduct();
  };

  const handleBuyNow = () => {
    const data = {
      productId: dataDetailProduct?.data?.id,
      quantity: number,
    };
    onAddToCart(data, handleGetCart);
    history.push('/order-list');
  };

  const handleGetCart = () => {
    onGetCartProduct();
  };

  return (
    <div className="container">
      {!dataDetailProduct?.isFetching && isSuccess ? (
        <>
          <div className="buy-product row">
            <div className="col-5">
              <Slider {...settings}>
                {dataDetailProduct?.data?.images.map((el, index) => (
                  <div className="slider-image" key={`slider-${index}`}>
                    <Zoom
                      className="hover-zoom"
                      img={el.url}
                      zoomScale={1.5}
                      width={531}
                      height={350}
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="col-7">
              <div className="buy-product__link">
                <Link to="/" className="link-home">
                  Home
                </Link>
                <span className="link-flycam">
                  / {handleCategory(dataDetailProduct?.data?.category)}
                </span>
              </div>
              <h3 className="buy-product__title">
                {dataDetailProduct?.data?.title}
              </h3>
              <div className="is-divider small" />
              <div className="rate">
                <Rate
                  defaultValue={dataDetailProduct?.data?.averageRating}
                  disabled
                  className="rating"
                />
              </div>
              <div className="buy-product__price">
                <span>
                  {formatPriceVND(dataDetailProduct?.data?.price.toString())}{' '}
                  VND
                </span>
              </div>
              <div className="buy-product__content">
                <p className="text">{dataDetailProduct?.data?.metaTitle}</p>
              </div>
              <div className="buy-product__add">
                <div className="quantity">
                  <InputSpinner
                    className="abc"
                    type="real"
                    precision={2}
                    max={dataDetailProduct?.data?.quantity}
                    min={0}
                    step={1}
                    value={number}
                    onChange={num => setNumber(num)}
                    size="sm"
                  />
                </div>
                <Button
                  danger
                  size="large"
                  className="add-cart"
                  onClick={() =>
                    handleAddToCart(number, dataDetailProduct?.data?.id)
                  }
                >
                  Add To Cart
                </Button>
                <Button
                  type="primary"
                  danger
                  size="large"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
          <div className="buy-product__info row">
            <div className="col-12">
              <Tabs defaultActiveKey="1" type="card" size="large">
                <TabPane tab="Description" key="1">
                  <Description content={dataDetailProduct?.data?.content} />
                </TabPane>
                <TabPane
                  tab={`Evaluate (${dataComment?.data?.length})`}
                  key="2"
                >
                  <Evaluate
                    id={dataDetailProduct?.data?.id}
                    dataComment={dataComment}
                    onAddCommentProduct={onAddCommentProduct}
                    onGetCommentProduct={onGetCommentProduct}
                    title={dataDetailProduct?.data?.title}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </>
      ) : (
        <div className="height-page" />
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataDetailProduct: makeSelectDetailProduct(),
  dataComment: makeSelectDataComment(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetDetailProduct: params => dispatch(getDetailProduct(params)),
    onGetCommentProduct: slug => dispatch(getCommentProduct(slug)),
    onAddCommentProduct: (data, callBack) =>
      dispatch(addCommentProduct(data, callBack)),
    onAddToCart: (data, callBack) => dispatch(addToCart(data, callBack)),
    onGetCartProduct: () => dispatch(getCartProduct()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BuyProduct);

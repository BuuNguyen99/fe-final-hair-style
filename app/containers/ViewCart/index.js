import React, { memo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { deleteItemCart, getCartProduct } from '../Auth/actions';
import { makeSelectCartProduct } from '../Auth/selectors';
import CartItem from './CartItem';
import Payment from './Payment';

function ViewCart({ dataCart, onDeleteItemCart, onGetCartProduct }) {
  const history = useHistory();
  return (
    <div className="view-cart">
      <div className="header-title my-5">
        <h2>
          <svg
            width="18px"
            height="17px"
            viewBox="0 0 18 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => history.goBack()}
          >
            <g
              id="prev"
              transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)"
            >
              <polygon
                className="arrow"
                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
              />
              <polygon
                className="arrow-fixed"
                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
              />
              <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z" />
            </g>
          </svg>
          Buy Now
        </h2>
      </div>
      <div className="container order-list">
        {!dataCart?.isFetching && (
          <>
            <div className="row order-list__header">
              <div className="col-5">
                <p className="header-item">Product</p>
              </div>
              <div className="col-2">
                <p className="header-item">Unit Price</p>
              </div>
              <div className="col-2">
                <p className="header-item">Amount</p>
              </div>
              <div className="col-2">
                <p className="header-item">Money</p>
              </div>
              <div className="col-1">
                <p className="header-item">Delete</p>
              </div>
            </div>
            {dataCart?.data?.map(el => (
              <CartItem
                data={el}
                onDeleteItemCart={onDeleteItemCart}
                onGetCartProduct={onGetCartProduct}
              />
            ))}
            <div className="payment">
              <Payment dataCart={dataCart} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataCart: makeSelectCartProduct(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetCartProduct: () => dispatch(getCartProduct()),
    onDeleteItemCart: (data, idItem) => dispatch(deleteItemCart(data, idItem)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ViewCart);

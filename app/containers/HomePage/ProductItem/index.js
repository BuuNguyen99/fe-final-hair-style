import React from 'react';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import { formatPriceVND } from '../../../utils/common';

function ProductItem({ data }) {
  return (
    <div className="col-2 item-show">
      <Link to={`/products/${data?.slug}`}>
        <div className="item">
          <p className="item__sell">
            {/* {data?.discount > 0 &&
              `Get up to ${data?.discount}% off Today Only!`} */}
          </p>
          <div className="item__image">
            <img src={data?.images[0]?.url} alt="" />
          </div>
          <div className="item__infor">
            <h3 className="title">{data?.title}</h3>
            <p className="price">
              {formatPriceVND(data?.price?.toString())} VND
            </p>
            <Rate
              defaultValue={data?.averageRating}
              disabled
              className="rating"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;

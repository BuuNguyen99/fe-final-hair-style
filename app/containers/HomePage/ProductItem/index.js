import React from 'react';
import { Rate } from 'antd';

function ProductItem() {
  return (
    <div className="col-2 item-show">
      <div className="item">
        <p className="item__sell">Get up to 10% off Today Only!</p>
        <div className="item__image">
          <img
            src="https://dji-vietnam.vn/wp-content/uploads/2021/07/dji-mini-se-1-400x400.jpg"
            alt=""
          />
        </div>
        <div className="item__infor">
          <h3 className="title">BLack Iphone Speaker</h3>
          <p className="price">31.000.000 VND</p>
          <Rate allowHalf defaultValue={2.5} disabled className="rating" />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

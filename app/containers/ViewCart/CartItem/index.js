import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Popconfirm } from 'antd';
import { formatPriceVND } from '../../../utils/common';

function CartItem({ data, onDeleteItemCart }) {
  const confirm = () => {
    onDeleteItemCart(data?.product?.id, data?.id);
  };

  return (
    <div className="row order-list__item">
      <div className="col-5 item-product">
        <div className="image col-2">
          <img src={data?.product?.images[0]?.url} alt="product" />
        </div>
        <div className="mx-3 title col-10">
          <p>{data?.product?.title}</p>
        </div>
      </div>
      <div className="col-2">
        <p className="price">
          {formatPriceVND(data?.product?.price.toString())} VND
        </p>
      </div>
      <div className="col-2">
        <p className="amount">{data?.quantity}</p>
      </div>
      <div className="col-2">
        <p className="money">
          {formatPriceVND((data?.product?.price * data?.quantity).toString())}{' '}
          VND
        </p>
      </div>
      <div className="col-1">
        <Popconfirm
          title="Are you sure to delete this Item?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <span className="cursor-pointer">
            <DeleteOutlined style={{ fontSize: '16px' }} />
          </span>
        </Popconfirm>
      </div>
    </div>
  );
}

export default CartItem;

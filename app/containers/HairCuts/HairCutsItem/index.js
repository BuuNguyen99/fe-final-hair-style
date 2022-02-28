import React from 'react';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';

function HairCutsItem({ data }) {
  return (
    <div className="col-2 item-show">
      <Link to={`/hair-cuts-detail/${data?.slug}`}>
        <div className="item">
          <div className="item__image">
            <img src={data?.imageUrl} alt="" />
          </div>
          <div className="item__infor">
            <h3 className="title">{data?.name}</h3>
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

export default HairCutsItem;

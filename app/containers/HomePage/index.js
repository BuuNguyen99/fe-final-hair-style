import React, { memo, useState } from 'react';
import { Select } from 'antd';
import PaginationComponent from 'components/Pagination';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { CookiesStorage } from 'shared/configs/cookie';
import ProductItem from './ProductItem';
import { makeSelectDataProduct } from './selectors';
import { getViewHomeProduct } from './actions';
const { Option } = Select;

function HomePage({ dataProduct, onGetViewHomeProduct }) {
  const [page, setPage] = useState(1);
  const filterCategory = CookiesStorage.getCookieData('filterCategory') || '';
  function handleChange(value) {
    const data = {
      searchFilters: [
        {
          property: 'category',
          operator: 'LIKE',
          value: filterCategory,
        },
      ],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [],
    };

    const params = {
      page: page - 1,
      size: 12,
    };
    if (value === 'Latest Product') {
      data.sortOrder.descendingOrder = ['createdAt'];
    }
    if (value === 'Price Descending') {
      data.sortOrder.descendingOrder = ['price'];
    }

    if (value === 'Price Increase') {
      data.sortOrder.ascendingOrder = ['price'];
    }
    onGetViewHomeProduct(data, params);
  }

  const handleCallbackPage = value => {
    setPage(value);

    const data = {
      searchFilters: [
        {
          property: 'category',
          operator: 'LIKE',
          value: filterCategory,
        },
      ],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [],
    };

    const params = {
      page: value - 1,
      size: 12,
    };
    onGetViewHomeProduct(data, params);
  };

  return (
    <div className="page-product-list">
      <div className="product-container">
        <div className="filter">
          <Select
            defaultValue="Latest Product"
            style={{ width: 200 }}
            onChange={handleChange}
          >
            <Option value="Latest Product">Latest Product</Option>
            <Option value="Price Descending">Price Descending</Option>
            <Option value="Price Increase">Prices Increase</Option>
          </Select>
        </div>
        <div className="product-list-item">
          {!dataProduct?.isFetching && (
            <div className="row">
              {dataProduct?.data?.content &&
                dataProduct?.data?.content.map((el, index) => (
                  <ProductItem data={el} key={index} />
                ))}
            </div>
          )}
        </div>
        <div className="product-pagination">
          <PaginationComponent
            handleCallbackPage={handleCallbackPage}
            pageCount={dataProduct?.data?.totalItems}
            activePage={page}
            limit={12}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataProduct: makeSelectDataProduct(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetViewHomeProduct: (data, params) =>
      dispatch(getViewHomeProduct(data, params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);

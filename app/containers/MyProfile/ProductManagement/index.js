import { Select, Button } from 'antd';
import React, { useState, memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PlusOutlined } from '@ant-design/icons';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/HomePage/saga';
import reducer from 'containers/HomePage/reducer';
import { makeSelectDataProduct } from 'containers/HomePage/selectors';
import {
  getViewHomeProduct,
  deleteProductItem,
} from 'containers/HomePage/actions';
import EditableTable from './TableList';
import AddProduct from './AddProduct';
const { Option } = Select;

const key = 'home';

function ProductManagement({
  dataAddProduct,
  onAddProductItem,
  dataProduct,
  onGetViewHomeProduct,
  onDeleteProductItem,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filterCategory, setFilterCategory] = useState('');
  const [isAddProduct, setIsAddProduct] = useState(true);

  const handleFilter = filter => {
    setFilterCategory(filter);
  };

  useEffect(() => {
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
      size: pageSize,
    };
    onGetViewHomeProduct(data, params);
  }, [filterCategory]);

  return (
    <div className="product-management">
      {isAddProduct ? (
        <>
          <div className="product-management__filter mb-5">
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              className="add-product"
              onClick={() => setIsAddProduct(false)}
            >
              Add Product
            </Button>
            <Select
              style={{ width: 200 }}
              onChange={handleFilter}
              placeholder="Select filter"
            >
              <Option value="shampoo & conditioner">
                Shampoo & Conditioner
              </Option>
              <Option value="styling products">Styling Products</Option>
              <Option value="accessories">Accessories</Option>
              <Option value="hair color">Hair Color</Option>
              <Option value="hair styling tools">Hair Styling Tools</Option>
              <Option value="hair brushes & combs">Hair Brushes & Combs</Option>
            </Select>
          </div>
          <div className="product-management__table">
            {!dataProduct?.isFetching && (
              <EditableTable
                setPage={setPage}
                setPageSize={setPageSize}
                pageSizeLimit={pageSize}
                dataProduct={dataProduct?.data?.content}
                onDeleteProductItem={onDeleteProductItem}
              />
            )}
          </div>
        </>
      ) : (
        <AddProduct
          setIsAddProduct={setIsAddProduct}
          dataAddProduct={dataAddProduct}
          onAddProductItem={onAddProductItem}
          onGetViewHomeProduct={onGetViewHomeProduct}
        />
      )}
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
    onDeleteProductItem: (id, callBack) =>
      dispatch(deleteProductItem(id, callBack)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductManagement);

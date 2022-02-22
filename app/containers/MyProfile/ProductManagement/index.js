/* eslint-disable no-nested-ternary */
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
import {
  makeSelectDataProduct,
  makeSelectDetailProduct,
} from 'containers/HomePage/selectors';
import {
  getViewHomeProduct,
  deleteProductItem,
  editProduct,
  getDetailProduct,
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
  onGetDetailProduct,
  dataDetailProduct,
  onEditProduct,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [filterCategory, setFilterCategory] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
      page: 0,
      size: 99999,
    };
    onGetViewHomeProduct(data, params);
  }, [filterCategory]);

  return (
    <div className="product-management">
      {isAdd ? (
        <AddProduct
          dataAddProduct={dataAddProduct}
          onAddProductItem={onAddProductItem}
          onGetViewHomeProduct={onGetViewHomeProduct}
          setIsAdd={setIsAdd}
          isEdit={isEdit}
          isAdd={isAdd}
          setIsEdit={setIsEdit}
          onGetDetailProduct={onGetDetailProduct}
          onEditProduct={onEditProduct}
          dataDetailProduct={dataDetailProduct}
        />
      ) : isEdit ? (
        <AddProduct
          setIsAdd={setIsAdd}
          dataAddProduct={dataAddProduct}
          onAddProductItem={onAddProductItem}
          onGetViewHomeProduct={onGetViewHomeProduct}
          isEdit={isEdit}
          isAdd={isAdd}
          setIsEdit={setIsEdit}
          onGetDetailProduct={onGetDetailProduct}
          onEditProduct={onEditProduct}
          dataDetailProduct={dataDetailProduct}
        />
      ) : (
        <>
          <div className="product-management__filter mb-5">
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              className="add-product"
              onClick={() => setIsAdd(true)}
            >
              Add Product
            </Button>
            <Select
              defaultValue={filterCategory}
              style={{ width: 200 }}
              onChange={handleFilter}
              placeholder="Select filter"
            >
              <Option value="">All</Option>
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
            <EditableTable
              setIsAdd={setIsAdd}
              setIsEdit={setIsEdit}
              dataProduct={dataProduct?.data?.content}
              onDeleteProductItem={onDeleteProductItem}
            />
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataDetailProduct: makeSelectDetailProduct(),
  dataProduct: makeSelectDataProduct(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetViewHomeProduct: (data, params) =>
      dispatch(getViewHomeProduct(data, params)),
    onDeleteProductItem: (id, callBack) =>
      dispatch(deleteProductItem(id, callBack)),
    onGetDetailProduct: params => dispatch(getDetailProduct(params)),
    onEditProduct: (id, data, callBack) =>
      dispatch(editProduct(id, data, callBack)),
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

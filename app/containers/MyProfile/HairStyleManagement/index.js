/* eslint-disable no-nested-ternary */
import { Button } from 'antd';
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
  makeSelectDataHair,
  makeSelectDetailHair,
} from 'containers/HomePage/selectors';
import {
  getListHairStyle,
  deleteHair,
  getDetailHair,
  editHair,
  addHairStyles,
} from 'containers/HomePage/actions';
import EditableTable from './TableList';
import AddHair from './AddHair';

const key = 'home';

function HairStyleManagement({
  dataHair,
  onGetListHair,
  onDeleteHair,
  onGetDetailHair,
  dataDetailHair,
  onAddHair,
  onEditHair,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const data = {
      searchFilters: [],
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
    onGetListHair(data, params);
  }, []);

  return (
    <div className="product-management">
      {isAdd ? (
        <AddHair
          setIsAdd={setIsAdd}
          isEdit={isEdit}
          isAdd={isAdd}
          setIsEdit={setIsEdit}
          onAddHair={onAddHair}
          onGetListHair={onGetListHair}
        />
      ) : isEdit ? (
        <AddHair
          isEdit={isEdit}
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          setIsEdit={setIsEdit}
          onGetListHair={onGetListHair}
          onGetDetailHair={onGetDetailHair}
          onEditHair={onEditHair}
          dataDetailHair={dataDetailHair}
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
              Add Style Hair
            </Button>
          </div>
          <div className="product-management__table">
            <EditableTable
              setIsAdd={setIsAdd}
              setIsEdit={setIsEdit}
              dataHair={dataHair?.data?.content}
              onDeleteHair={onDeleteHair}
            />
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataDetailHair: makeSelectDetailHair(),
  dataHair: makeSelectDataHair(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetListHair: (data, params) => dispatch(getListHairStyle(data, params)),
    onDeleteHair: (id, callBack) => dispatch(deleteHair(id, callBack)),
    onEditHair: (id, data, callBack) => dispatch(editHair(id, data, callBack)),
    onGetDetailHair: params => dispatch(getDetailHair(params)),
    onAddHair: (data, callBack) => dispatch(addHairStyles(data, callBack)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HairStyleManagement);

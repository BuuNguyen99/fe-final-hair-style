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
import EditableTable from './TableList';
import FormAccount from './FormAccount';
import {
  addAccount,
  deleteAccount,
  disableAccount,
  editAccount,
  enableAccount,
  getDetailAccount,
  getListAccount,
} from '../../HomePage/actions';
import {
  makeSelectAddDataAccount,
  makeSelectDataAccount,
  makeSelectDetailAccount,
} from '../../HomePage/selectors';

const key = 'home';

function AccountManagement({
  dataAccount,
  onGetListAccount,
  onDisableAccount,
  onEnableAccount,
  onDeleteAccount,
  dataAddAccount,
  onAddAccount,
  dataDetailAccount,
  onGetDetailAccount,
  onEditAccount,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [isAdd, setIsAdd] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const data = {
      searchFilters: [],
      sortOrder: {
        ascendingOrder: [],
        descendingOrder: [],
      },
      joinColumnProps: [
        {
          joinColumnName: 'role',
          searchFilter: {
            property: 'name',
            operator: 'IN',
            value: 'ADMIN',
          },
        },
      ],
    };

    const params = {
      roleId: 1,
      page: 0,
      size: 999999999,
    };
    onGetListAccount(data, params);
  }, []);

  return (
    <div className="product-management">
      {isAdd ? (
        <>
          <div className="product-management__filter mb-5">
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              className="add-product"
              onClick={() => setIsAdd(false)}
            >
              Add Account
            </Button>
          </div>
          <div className="product-management__table">
            <EditableTable
              dataAccount={dataAccount.data?.content}
              onDisableAccount={onDisableAccount}
              onEnableAccount={onEnableAccount}
              onDeleteAccount={onDeleteAccount}
              setIsAdd={setIsAdd}
              setIsEdit={setIsEdit}
            />
          </div>
        </>
      ) : (
        <FormAccount
          setIsAdd={setIsAdd}
          onGetListAccount={onGetListAccount}
          dataAddAccount={dataAddAccount}
          onAddAccount={onAddAccount}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          dataDetailAccount={dataDetailAccount}
          onGetDetailAccount={onGetDetailAccount}
          onEditAccount={onEditAccount}
          isAdd={isAdd}
        />
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataAccount: makeSelectDataAccount(),
  dataAddAccount: makeSelectAddDataAccount(),
  dataDetailAccount: makeSelectDetailAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetListAccount: (data, params) => dispatch(getListAccount(data, params)),
    onDisableAccount: (params, id, callBack) =>
      dispatch(disableAccount(params, id, callBack)),
    onEnableAccount: (params, id, callBack) =>
      dispatch(enableAccount(params, id, callBack)),
    onDeleteAccount: (id, callBack) => dispatch(deleteAccount(id, callBack)),
    onAddAccount: (id, callBack) => dispatch(addAccount(id, callBack)),
    onGetDetailAccount: params => dispatch(getDetailAccount(params)),
    onEditAccount: (data, callBack) => dispatch(editAccount(data, callBack)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountManagement);

import React, { memo, useEffect, useState } from 'react';
import PaginationComponent from 'components/Pagination';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/HomePage/saga';
import reducer from 'containers/HomePage/reducer';
import HairCutsItem from './HairCutsItem';
import { makeSelectDataHair } from '../HomePage/selectors';
import { getListHairStyle } from '../HomePage/actions';

const key = 'home';

function HairCuts({ dataHair, onGetListHairStyle }) {
  const [page, setPage] = useState(1);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleCallbackPage = value => {
    setPage(value);

    const data = {
      searchFilters: [],
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
    onGetListHairStyle(data, params);
  };

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
      page: page - 1,
      size: 12,
    };
    onGetListHairStyle(data, params);
  }, []);

  return (
    <div className="page-product-list my -5">
      <div className="product-container">
        <div className="product-list-item">
          {!dataHair?.isFetching && (
            <div className="row">
              {dataHair?.data?.content &&
                dataHair?.data?.content.map((el, index) => (
                  <HairCutsItem data={el} key={index} />
                ))}
            </div>
          )}
        </div>
        <div className="product-pagination">
          <PaginationComponent
            handleCallbackPage={handleCallbackPage}
            pageCount={dataHair?.data?.totalItems || 0}
            activePage={page}
            limit={12}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataHair: makeSelectDataHair(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetListHairStyle: (data, params) =>
      dispatch(getListHairStyle(data, params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HairCuts);

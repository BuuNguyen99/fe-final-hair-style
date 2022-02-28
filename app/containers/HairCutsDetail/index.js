import React, { memo, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Rate, Tabs } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/HomePage/saga';
import reducer from 'containers/HomePage/reducer';
import Description from './description';
import Evaluate from './Evaluate';
import { makeSelectDetailHair } from '../HomePage/selectors';
import { getDetailHair, addCommentHairs } from '../HomePage/actions';

const key = 'home';

function HairCutsDetail({
  dataDetailHair,
  onGetDetailHair,
  onAddCommentHairs,
}) {
  const history = useHistory();
  const { TabPane } = Tabs;
  const [isSuccess, setIsSuccess] = useState(false);

  const { slug } = useParams();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onGetDetailHair(slug);
    setIsSuccess(true);
  }, [slug]);

  return (
    <div className="container">
      <div className="header-title">
        <h2>
          <svg
            width="18px"
            height="17px"
            viewBox="0 0 18 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => history.goBack()}
          >
            <g
              id="prev"
              transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)"
            >
              <polygon
                className="arrow"
                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
              />
              <polygon
                className="arrow-fixed"
                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
              />
              <path d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z" />
            </g>
          </svg>
          Hair Cuts And Styles
        </h2>
      </div>
      {!dataDetailHair?.isFetching && isSuccess ? (
        <>
          <div className="buy-product row">
            <div className="col-5">
              <img
                src={dataDetailHair?.data?.imageUrl}
                alt=""
                style={{ width: '80%', height: '80%' }}
              />
            </div>
            <div className="col-7">
              <div className="buy-product__link">
                <Link to="/" className="link-home">
                  Home
                </Link>
                <span className="link-flycam">/ HAIR STYLE</span>
              </div>
              <h3 className="buy-product__title">
                {dataDetailHair?.data?.name}
              </h3>
              <div className="is-divider small" />
              <div className="rate">
                <Rate
                  defaultValue={dataDetailHair?.data?.averageRating}
                  disabled
                  className="rating"
                />
              </div>
              <ul className="haircut-content row">
                <li className="haircut-content-item col-6">
                  Hair Cut: <span>{dataDetailHair?.data?.hairCut}</span>
                </li>
                <li className="haircut-content-item col-6">
                  Hair Length:<span> {dataDetailHair?.data?.hairLength}</span>
                </li>
                <li className="haircut-content-item col-6">
                  Hair Style: <span>{dataDetailHair?.data?.style}</span>
                </li>
                <li className="haircut-content-item col-6">
                  Face Shapes:
                  {dataDetailHair?.data?.faceShapes.map(el => (
                    <span> {el.name},</span>
                  ))}
                </li>
                <li className="haircut-content-item col-6">
                  Age Range:
                  {dataDetailHair?.data?.ageRanges.map(el => (
                    <span> {el.rangeDescription}</span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="buy-product__info row">
            <div className="col-12">
              <Tabs defaultActiveKey="1" type="card" size="large">
                <TabPane tab="Description" key="1">
                  <Description content={dataDetailHair?.data?.description} />
                </TabPane>
                <TabPane
                  tab={`Evaluate (${
                    dataDetailHair?.data?.hairstyleReviews?.length
                  })`}
                  key="2"
                >
                  <Evaluate
                    id={dataDetailHair?.data?.id}
                    dataComment={dataDetailHair?.data?.hairstyleReviews}
                    onAddCommentHairs={onAddCommentHairs}
                    onGetDetailHair={onGetDetailHair}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </>
      ) : (
        <div className="height-page" />
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataDetailHair: makeSelectDetailHair(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetDetailHair: params => dispatch(getDetailHair(params)),
    onAddCommentHairs: (data, callBack) =>
      dispatch(addCommentHairs(data, callBack)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HairCutsDetail);

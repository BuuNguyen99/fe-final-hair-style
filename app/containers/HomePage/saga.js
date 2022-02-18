import { call, put, takeEvery } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import { ENDPOINT } from 'shared/constants/endpoint';
import Api from 'shared/configs/api';
import { GET_LIST_PRODUCT } from 'containers/Auth/constants';

const { API } = ENDPOINT;

function getViewHomeProductApi(data, query) {
  return Api.post(API.GET_LIST_PRODUCT_API, data, {
    params: {
      ...query,
    },
  });
}

export function* getViewHomeProduct({ dataProduct, params }) {
  try {
    const response = yield call(getViewHomeProductApi, dataProduct, params);
    const { data } = response;

    yield put({ type: SUCCESS(GET_LIST_PRODUCT), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_LIST_PRODUCT), error });
  }
}

export default function* authData() {
  yield takeEvery(REQUEST(GET_LIST_PRODUCT), getViewHomeProduct);
}

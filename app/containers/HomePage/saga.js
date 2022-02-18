import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import { ENDPOINT } from 'shared/constants/endpoint';
import Api from 'shared/configs/api';
import {
  GET_LIST_PRODUCT,
  DELETE_PRODUCT_ACTION,
} from 'containers/HomePage/constants';

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

function deleteProductApi(id) {
  return Api.delete(API.DELETE_PRODUCT_API, [...id]);
}

export function* deleteProductItemSaga({ id, callBack }) {
  try {
    yield call(deleteProductApi, id);
    yield put({ type: SUCCESS(DELETE_PRODUCT_ACTION), id });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(DELETE_PRODUCT_ACTION), error });
  }
}

export default function* authData() {
  yield takeLatest(REQUEST(DELETE_PRODUCT_ACTION), deleteProductItemSaga);
  yield takeEvery(REQUEST(GET_LIST_PRODUCT), getViewHomeProduct);
}

import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import { ENDPOINT } from 'shared/constants/endpoint';
import Api from 'shared/configs/api';
import {
  GET_LIST_PRODUCT,
  DELETE_PRODUCT_ACTION,
  GET_LIST_POPULAR_PRODUCT,
  GET_LIST_ACCOUNT,
  ENABLE_ACCOUNT,
  DISABLE_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_ACCOUNT,
  GET_DETAIL_ACCOUNT,
  EDIT_ACCOUNT,
  GET_DETAIL_PRODUCT_ACTION,
  UPDATE_PRODUCT_ACTION,
  GET_LIST_COMMENT,
  ADD_COMMENT_PRODUCT,
  ADD_TO_CART,
  GET_LIST_HAIR_STYLE,
  ADD_HAIR_STYLE,
  DELETE_HAIR_STYLE,
  EDIT_HAIR_STYLE,
  GET_DETAIL_HAIR,
  ADD_COMMENT_HAIR,
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

function getPopularProductApi() {
  return Api.get(API.GET_LIST_POPULAR_API);
}

export function* getPopularProduct() {
  try {
    const response = yield call(getPopularProductApi);
    const { data } = response;
    yield put({ type: SUCCESS(GET_LIST_POPULAR_PRODUCT), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_LIST_POPULAR_PRODUCT), error });
  }
}

function getListAccountApi(data, params) {
  return Api.post(API.GET_LIST_ACCOUNT_API, data, {
    params: {
      ...params,
    },
  });
}

export function* getListAccountSaga({ dataAccount, params }) {
  try {
    const response = yield call(getListAccountApi, dataAccount, params);
    const { data } = response;
    yield put({ type: SUCCESS(GET_LIST_ACCOUNT), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_LIST_ACCOUNT), error });
  }
}

function disableAccountApi(params) {
  return Api.put(
    API.DISABLE_ACCOUNT_API,
    {},
    {
      params: {
        username: params,
      },
    },
  );
}

export function* disableAccountSaga({ params, id, callBack }) {
  try {
    yield call(disableAccountApi, params);
    yield put({ type: SUCCESS(DISABLE_ACCOUNT), id });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(DISABLE_ACCOUNT), error });
  }
}

function enableAccountApi(params) {
  return Api.put(
    API.ENABLE_ACCOUNT_API,
    {},
    {
      params: {
        username: params,
      },
    },
  );
}

export function* enableAccountSaga({ params, id, callBack }) {
  try {
    yield call(enableAccountApi, params);
    yield put({ type: SUCCESS(ENABLE_ACCOUNT), id });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(ENABLE_ACCOUNT), error });
  }
}

function deleteAccountApi(id) {
  return Api.delete(API.DELETE_ACCOUNT_API, [...id]);
}

export function* deleteAccountSaga({ id, callBack }) {
  try {
    yield call(deleteAccountApi, id);
    yield put({ type: SUCCESS(DELETE_ACCOUNT), id });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(DELETE_ACCOUNT), error });
  }
}

function addAccountAPI(data) {
  return Api.post(API.ADD_ACCOUNT_API, data);
}

export function* addAccountSaga({ data, callBack }) {
  try {
    yield call(addAccountAPI, data);
    yield put({ type: SUCCESS(ADD_ACCOUNT) });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(ADD_ACCOUNT), error });
  }
}

function getDetailAccountApi(params) {
  return Api.get(API.GET_DETAIL_ACCOUNT_API, {
    params: {
      username: params,
    },
  });
}

export function* getDetailAccountSaga({ params }) {
  try {
    const response = yield call(getDetailAccountApi, params);
    const { data } = response;
    yield put({ type: SUCCESS(GET_DETAIL_ACCOUNT), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_DETAIL_ACCOUNT), error });
  }
}

function updateAccountAPI(data) {
  return Api.patch(API.UPDATE_ACCOUNT_API, data);
}

export function* updateAccountSaga({ data, callBack }) {
  try {
    yield call(updateAccountAPI, data);
    yield put({ type: SUCCESS(EDIT_ACCOUNT) });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(EDIT_ACCOUNT), error });
  }
}

function getDetailProductApi(params) {
  return Api.get(API.GET_DETAIL_PRODUCT_API, {
    params: {
      slug: params,
    },
  });
}

export function* getDetailProductSaga({ params }) {
  try {
    const response = yield call(getDetailProductApi, params);
    const { data } = response;
    yield put({ type: SUCCESS(GET_DETAIL_PRODUCT_ACTION), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_DETAIL_PRODUCT_ACTION), error });
  }
}

function updateProductAPI(data, id) {
  return Api.patch(API.UPDATE_PRODUCT_API, data, {
    params: {
      id,
    },
  });
}

export function* updateProductSaga({ id, data, callBack }) {
  try {
    yield call(updateProductAPI, data, id);
    yield put({ type: SUCCESS(UPDATE_PRODUCT_ACTION) });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(UPDATE_PRODUCT_ACTION), error });
  }
}

function getListCommentApi(slug) {
  return Api.get(API.GET_LIST_COMMENT_API, {
    params: {
      slug,
    },
  });
}

export function* getListCommentSaga({ slug }) {
  try {
    const response = yield call(getListCommentApi, slug);
    const { data } = response;
    yield put({ type: SUCCESS(GET_LIST_COMMENT), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_LIST_COMMENT), error });
  }
}

function addCommentApi(data) {
  return Api.post(API.ADD_COMMENT_PRODUCT_API, data);
}

export function* addCommentSaga({ dataComment, callBack }) {
  try {
    yield call(addCommentApi, dataComment);
    callBack?.();
    yield put({ type: SUCCESS(ADD_COMMENT_PRODUCT) });
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(ADD_COMMENT_PRODUCT), error });
  }
}

function addToCartApi(data) {
  return Api.post(API.ADD_TO_CART_API, data);
}

export function* addToCartSaga({ dataProduct, callBack }) {
  try {
    yield call(addToCartApi, dataProduct);
    yield put({ type: SUCCESS(ADD_TO_CART) });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(ADD_TO_CART), error });
  }
}

function getListHairApi(data, query) {
  return Api.post(API.GET_LIST_HAIR_STYLE_API, data, {
    params: {
      ...query,
    },
  });
}

export function* getListHairSaga({ dataHair, params }) {
  try {
    const response = yield call(getListHairApi, dataHair, params);
    const { data } = response;
    yield put({ type: SUCCESS(GET_LIST_HAIR_STYLE), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_LIST_HAIR_STYLE), error });
  }
}

function addHairApi(data) {
  return Api.post(API.ADD_HAIR_API, data);
}

export function* addHairSaga({ dataHair, callBack }) {
  try {
    yield call(addHairApi, dataHair);
    yield put({ type: SUCCESS(ADD_HAIR_STYLE) });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(ADD_HAIR_STYLE), error });
  }
}

function deleteHairApi(id) {
  return Api.delete(API.DELETE_HAIR_STYLE_API, [...id]);
}

export function* deleteHairSaga({ id, callBack }) {
  try {
    yield call(deleteHairApi, id);
    yield put({ type: SUCCESS(DELETE_HAIR_STYLE), id });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(DELETE_HAIR_STYLE), error });
  }
}

function updateHairAPI(data, id) {
  return Api.patch(API.EDIT_HAIR_STYLE_API, data, {
    params: {
      id,
    },
  });
}

export function* updateHairSaga({ id, data, callBack }) {
  try {
    yield call(updateHairAPI, data, id);
    yield put({ type: SUCCESS(EDIT_HAIR_STYLE) });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(EDIT_HAIR_STYLE), error });
  }
}

function getDetailHairApi(params) {
  return Api.get(API.GET_DETAIL_HAIR_API, {
    params: {
      slug: params,
    },
  });
}

export function* getDetailHairSaga({ params }) {
  try {
    const response = yield call(getDetailHairApi, params);
    const { data } = response;
    yield put({ type: SUCCESS(GET_DETAIL_HAIR), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_DETAIL_HAIR), error });
  }
}

function addCommentHairApi(data) {
  return Api.post(API.ADD_COMMENT_HAIR_API, data);
}

export function* addCommentHairSaga({ dataComment, callBack }) {
  try {
    yield call(addCommentHairApi, dataComment);
    callBack?.();
    yield put({ type: SUCCESS(ADD_COMMENT_HAIR) });
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(ADD_COMMENT_HAIR), error });
  }
}

export default function* authData() {
  yield takeLatest(REQUEST(DELETE_PRODUCT_ACTION), deleteProductItemSaga);
  yield takeEvery(REQUEST(GET_LIST_PRODUCT), getViewHomeProduct);
  yield takeLatest(REQUEST(GET_LIST_POPULAR_PRODUCT), getPopularProduct);
  yield takeLatest(REQUEST(GET_LIST_ACCOUNT), getListAccountSaga);
  yield takeLatest(REQUEST(DISABLE_ACCOUNT), disableAccountSaga);
  yield takeLatest(REQUEST(ENABLE_ACCOUNT), enableAccountSaga);
  yield takeLatest(REQUEST(DELETE_ACCOUNT), deleteAccountSaga);
  yield takeLatest(REQUEST(ADD_ACCOUNT), addAccountSaga);
  yield takeLatest(REQUEST(GET_DETAIL_ACCOUNT), getDetailAccountSaga);
  yield takeLatest(REQUEST(EDIT_ACCOUNT), updateAccountSaga);
  yield takeLatest(REQUEST(GET_DETAIL_PRODUCT_ACTION), getDetailProductSaga);
  yield takeLatest(REQUEST(UPDATE_PRODUCT_ACTION), updateProductSaga);
  yield takeLatest(REQUEST(GET_LIST_COMMENT), getListCommentSaga);
  yield takeLatest(REQUEST(ADD_COMMENT_PRODUCT), addCommentSaga);
  yield takeLatest(REQUEST(ADD_TO_CART), addToCartSaga);
  yield takeLatest(REQUEST(GET_LIST_HAIR_STYLE), getListHairSaga);
  yield takeLatest(REQUEST(ADD_HAIR_STYLE), addHairSaga);
  yield takeLatest(REQUEST(DELETE_HAIR_STYLE), deleteHairSaga);
  yield takeLatest(REQUEST(EDIT_HAIR_STYLE), updateHairSaga);
  yield takeLatest(REQUEST(GET_DETAIL_HAIR), getDetailHairSaga);
  yield takeLatest(REQUEST(ADD_COMMENT_HAIR), addCommentHairSaga);
}

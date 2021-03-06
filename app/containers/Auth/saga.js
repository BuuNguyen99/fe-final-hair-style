import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import { CookiesStorage } from 'shared/configs/cookie';
import { ENDPOINT } from 'shared/constants/endpoint';
import Api from 'shared/configs/api';
import {
  REMOVE_TOKEN,
  GET_PROFILE,
  UPDATE_PROFILE,
  REGISTER_ACCOUNT,
  LOGIN_ACCOUNT,
  FORGOT_PASSWORD_ACCOUNT,
  CHANGE_PASSWORD,
  ADD_PRODUCT_ACTION,
  RESET_PASSWORD,
  GET_CART_PRODUCT,
  DELETE_ITEM_CART,
  GET_LIST_PRODUCT,
  ABOUT_HAIR_STYLE,
} from 'containers/Auth/constants';

const { API } = ENDPOINT;

function getMyProfileApi() {
  return Api.get(API.GET_MY_PROFILE);
}

function updateMyProfileApi(data) {
  return Api.patch(API.UPDATE_MY_PROFILE, data);
}

export function* signOut() {
  try {
    CookiesStorage.clearData();
    yield put({ type: SUCCESS(REMOVE_TOKEN) });
  } catch (error) {
    yield put({ type: FAILURE(REMOVE_TOKEN), error });
  }
}

export function* getMyProfile() {
  try {
    const response = yield call(getMyProfileApi);
    const { data } = response;
    yield put({ type: SUCCESS(GET_PROFILE), payload: data });
  } catch (error) {
    yield put({ type: FAILURE(GET_PROFILE), error });
  }
}

export function* updateProfile({ dataProfile, callBack }) {
  const dataMyProfile = {
    ...dataProfile,
  };
  try {
    const response = yield call(updateMyProfileApi, dataMyProfile);
    const { data } = response;
    yield put({ type: SUCCESS(UPDATE_PROFILE), payload: data });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(UPDATE_PROFILE), error });
  }
}

function registerAccountApi(data) {
  return Api.post(API.REGISTER_USER, data);
}

export function* registerAccount({ data, callBack }) {
  const dataPost = {
    ...data,
  };
  try {
    yield call(registerAccountApi, dataPost);
    yield put({ type: SUCCESS(REGISTER_ACCOUNT), payload: data });
    callBack();
  } catch (error) {
    callBack(error);
    yield put({ type: FAILURE(REGISTER_ACCOUNT), error });
  }
}

function loginAccountApi(data) {
  return Api.post(API.LOGIN_USER, data);
}

export function* loginAccount({ data, callBack }) {
  const dataPost = {
    ...data,
  };
  try {
    const response = yield call(loginAccountApi, dataPost);
    CookiesStorage.setAccessToken(response.data.accessToken);
    yield put({ type: SUCCESS(LOGIN_ACCOUNT), payload: response.data });
    callBack();
  } catch (error) {
    callBack(error);
    yield put({ type: FAILURE(LOGIN_ACCOUNT), error });
  }
}

function forgotPasswordApi(query) {
  return Api.get(API.FORGOT_PASSWORD, {
    params: {
      ...query,
    },
  });
}

export function* forgotPasswordAccount({ data }) {
  const dataPost = {
    ...data,
  };
  try {
    yield call(forgotPasswordApi, dataPost);
    yield put({
      type: SUCCESS(FORGOT_PASSWORD_ACCOUNT),
    });
  } catch (error) {
    yield put({ type: FAILURE(FORGOT_PASSWORD_ACCOUNT), error });
  }
}

function resetPasswordApi(query, data) {
  return Api.post(API.RESET_PASSWORD_USER, data, {
    params: {
      ...query,
    },
  });
}

export function* resetPassword({ data, callBack }) {
  const query = {
    code: data.code,
  };
  const dataPost = {
    newPassword: data.newPassword,
    confirmedPassword: data.confirmedPassword,
  };
  try {
    const response = yield call(resetPasswordApi, query, dataPost);
    yield put({ type: SUCCESS(RESET_PASSWORD), payload: response.data });
    callBack();
  } catch (error) {
    callBack(error);
    yield put({ type: FAILURE(RESET_PASSWORD), error });
  }
}

function changePasswordApi(data) {
  return Api.post(API.CHANGE_PASSWORD_USER, data);
}

export function* changePasswordAccount({ data, callBack }) {
  try {
    yield call(changePasswordApi, data);
    yield put({ type: SUCCESS(CHANGE_PASSWORD), payload: data });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(CHANGE_PASSWORD), error });
  }
}

function addProductApi(data) {
  return Api.post(API.ADD_PRODUCT_API, data);
}

export function* addProductItem({ data, callBack }) {
  try {
    yield call(addProductApi, data);
    yield put({ type: SUCCESS(ADD_PRODUCT_ACTION), payload: data });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(ADD_PRODUCT_ACTION), error });
  }
}

function getCartApi() {
  return Api.get(API.GET_CART_PRODUCT);
}

export function* getCartApiSaga() {
  try {
    const response = yield call(getCartApi);
    const { data } = response;
    yield put({ type: SUCCESS(GET_CART_PRODUCT), data });
  } catch (error) {
    yield put({ type: FAILURE(GET_CART_PRODUCT), error });
  }
}

function deleteItemCartApi(id) {
  return Api.delete(
    API.DELETE_ITEM_CART_API,
    {},
    {
      params: {
        productId: id,
      },
    },
  );
}

export function* deleteItemCartSaga({ id, idItem }) {
  try {
    yield call(deleteItemCartApi, id);
    yield put({ type: SUCCESS(DELETE_ITEM_CART), idItem });
  } catch (error) {
    yield put({ type: FAILURE(DELETE_ITEM_CART), error });
  }
}

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

function aboutHairStyleApi(query) {
  return Api.post(API.ABOUT_HAIR_STYLE_API, query);
}

export function* aboutHairStyleSaga({ params }) {
  const dataPost = {
    ...params,
  };
  try {
    yield call(aboutHairStyleApi, dataPost);
    yield put({
      type: SUCCESS(ABOUT_HAIR_STYLE),
    });
  } catch (error) {
    yield put({ type: FAILURE(ABOUT_HAIR_STYLE), error });
  }
}

export default function* authData() {
  yield takeLatest(REQUEST(REMOVE_TOKEN), signOut);
  yield takeLatest(REQUEST(GET_PROFILE), getMyProfile);
  yield takeLatest(REQUEST(UPDATE_PROFILE), updateProfile);
  yield takeLatest(REQUEST(REGISTER_ACCOUNT), registerAccount);
  yield takeLatest(REQUEST(LOGIN_ACCOUNT), loginAccount);
  yield takeLatest(REQUEST(FORGOT_PASSWORD_ACCOUNT), forgotPasswordAccount);
  yield takeLatest(REQUEST(RESET_PASSWORD), resetPassword);
  yield takeLatest(REQUEST(CHANGE_PASSWORD), changePasswordAccount);
  yield takeLatest(REQUEST(ADD_PRODUCT_ACTION), addProductItem);
  yield takeLatest(REQUEST(GET_CART_PRODUCT), getCartApiSaga);
  yield takeLatest(REQUEST(DELETE_ITEM_CART), deleteItemCartSaga);
  yield takeLatest(REQUEST(GET_LIST_PRODUCT), getViewHomeProduct);
  yield takeLatest(REQUEST(ABOUT_HAIR_STYLE), aboutHairStyleSaga);
}

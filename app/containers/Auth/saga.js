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
} from 'containers/Auth/constants';

const { API } = ENDPOINT;

// function getTokenApi() {
//   return Api.getNotAuth(`${API.GET_ACCESS_TOKEN}`, {
//     withCredentials: true,
//   });
// }

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

export default function* authData() {
  yield takeLatest(REQUEST(REMOVE_TOKEN), signOut);
  yield takeLatest(REQUEST(GET_PROFILE), getMyProfile);
  yield takeLatest(REQUEST(UPDATE_PROFILE), updateProfile);
  yield takeLatest(REQUEST(REGISTER_ACCOUNT), registerAccount);
}

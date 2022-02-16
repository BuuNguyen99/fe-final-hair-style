import { REQUEST } from 'utils/actionType';
import {
  REMOVE_TOKEN,
  GET_PROFILE,
  UPDATE_PROFILE,
  REGISTER_ACCOUNT,
  LOGIN_ACCOUNT,
  FORGOT_PASSWORD_ACCOUNT,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
} from 'containers/Auth/constants';

export function registerAccount(data, callBack) {
  return {
    type: REQUEST(REGISTER_ACCOUNT),
    data,
    callBack,
  };
}

export function loginAccount(data, callBack) {
  return {
    type: REQUEST(LOGIN_ACCOUNT),
    data,
    callBack,
  };
}
export function forgotPassword(data) {
  return {
    type: REQUEST(FORGOT_PASSWORD_ACCOUNT),
    data,
  };
}

export function resetPassword(data, callBack) {
  return {
    type: REQUEST(RESET_PASSWORD),
    data,
    callBack,
  };
}

export function removeToken(dataToken) {
  return {
    type: REQUEST(REMOVE_TOKEN),
    dataToken,
  };
}

export function getProfile(dataProfile) {
  return {
    type: REQUEST(GET_PROFILE),
    dataProfile,
  };
}

export function updateProfile(dataProfile, callBack) {
  return {
    type: REQUEST(UPDATE_PROFILE),
    dataProfile,
    callBack,
  };
}

export function changePasswordAccount(data, callBack) {
  return {
    type: REQUEST(CHANGE_PASSWORD),
    data,
    callBack,
  };
}

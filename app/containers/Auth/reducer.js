import produce from 'immer';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import {
  REMOVE_TOKEN,
  GET_PROFILE,
  REGISTER_ACCOUNT,
  UPDATE_PROFILE,
  LOGIN_ACCOUNT,
  FORGOT_PASSWORD_ACCOUNT,
  RESET_PASSWORD,
} from 'containers/Auth/constants';

export const initialState = {
  dataUser: {
    isFetching: false,
  },
  dataProfile: {
    isFetching: false,
    profile: '',
  },
  updateProfile: {
    isFetching: false,
  },
  registerAccount: {
    data: null,
    isFetching: false,
  },
  forgotPassword: {
    isFetching: false,
  },
  resetPassword: {
    isFetching: false,
  },
};

const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST(REGISTER_ACCOUNT):
        draft.registerAccount.isFetching = true;
        break;
      case SUCCESS(REGISTER_ACCOUNT):
        draft.registerAccount.isFetching = false;
        break;
      case FAILURE(REGISTER_ACCOUNT):
        draft.registerAccount.isFetching = false;
        break;
      case REQUEST(LOGIN_ACCOUNT):
        draft.dataUser.isFetching = true;
        break;
      case SUCCESS(LOGIN_ACCOUNT):
        draft.dataUser.isFetching = false;
        break;
      case FAILURE(LOGIN_ACCOUNT):
        draft.dataUser.isFetching = false;
        break;
      case REQUEST(FORGOT_PASSWORD_ACCOUNT):
        draft.forgotPassword.isFetching = true;
        break;
      case SUCCESS(FORGOT_PASSWORD_ACCOUNT):
        draft.forgotPassword.isFetching = false;
        break;
      case FAILURE(FORGOT_PASSWORD_ACCOUNT):
        draft.forgotPassword.isFetching = false;
        break;
      case REQUEST(RESET_PASSWORD):
        draft.resetPassword.isFetching = true;
        break;
      case SUCCESS(RESET_PASSWORD):
        draft.resetPassword.isFetching = false;
        break;
      case FAILURE(RESET_PASSWORD):
        draft.resetPassword.isFetching = false;
        break;
      case REQUEST(REMOVE_TOKEN):
        draft.fetching = true;
        break;
      case SUCCESS(REMOVE_TOKEN):
        draft.accessToken = '';
        draft.fetching = false;
        break;
      case FAILURE(REMOVE_TOKEN):
        draft.fetching = false;
        break;
      case REQUEST(GET_PROFILE):
        draft.dataProfile.isFetching = true;
        break;
      case SUCCESS(GET_PROFILE):
        draft.dataProfile.isFetching = false;
        draft.dataProfile.profile = action.payload;
        break;
      case FAILURE(GET_PROFILE):
        draft.dataProfile.isFetching = false;
        break;
      case REQUEST(UPDATE_PROFILE):
        draft.updateProfile.isFetching = true;
        break;
      case SUCCESS(UPDATE_PROFILE):
        draft.updateProfile.isFetching = false;
        draft.dataProfile.profile = action.payload;
        break;
      case FAILURE(UPDATE_PROFILE):
        draft.updateProfile.isFetching = false;
        break;
      default:
        break;
    }
  });

export default authReducer;

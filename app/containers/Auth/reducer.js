import produce from 'immer';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import {
  REMOVE_TOKEN,
  GET_PROFILE,
  REGISTER_ACCOUNT,
  UPDATE_PROFILE,
} from 'containers/Auth/constants';

export const initialState = {
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

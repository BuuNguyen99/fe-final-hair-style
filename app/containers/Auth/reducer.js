import produce from 'immer';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import {
  REMOVE_TOKEN,
  GET_PROFILE,
  REGISTER_ACCOUNT,
  UPDATE_PROFILE,
  LOGIN_ACCOUNT,
  FORGOT_PASSWORD_ACCOUNT,
  CHANGE_PASSWORD,
  ADD_PRODUCT_ACTION,
  RESET_PASSWORD,
  GET_CART_PRODUCT,
  GET_LIST_PRODUCT,
  DELETE_ITEM_CART,
  ABOUT_HAIR_STYLE,
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
  changePassword: {
    isFetching: false,
  },
  addProduct: {
    isFetching: false,
  },
  dataCart: {
    data: [],
    isFetching: false,
  },
  dataProduct: {
    data: [],
    isFetching: false,
  },
  dataAboutHair: {
    data: [],
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
      case REQUEST(CHANGE_PASSWORD):
        draft.changePassword.isFetching = true;
        break;
      case SUCCESS(CHANGE_PASSWORD):
        draft.changePassword.isFetching = false;
        break;
      case FAILURE(CHANGE_PASSWORD):
        draft.changePassword.isFetching = false;
        break;
      case REQUEST(ADD_PRODUCT_ACTION):
        draft.addProduct.isFetching = true;
        break;
      case SUCCESS(ADD_PRODUCT_ACTION):
        draft.addProduct.isFetching = false;
        break;
      case FAILURE(ADD_PRODUCT_ACTION):
        draft.addProduct.isFetching = false;
        break;
      case REQUEST(GET_CART_PRODUCT):
        draft.dataCart.data = [];
        draft.dataCart.isFetching = true;
        break;
      case SUCCESS(GET_CART_PRODUCT):
        draft.dataCart.isFetching = false;
        draft.dataCart.data = action.data;
        break;
      case FAILURE(GET_CART_PRODUCT):
        draft.dataCart.isFetching = false;
        break;
      case REQUEST(DELETE_ITEM_CART):
        break;
      case SUCCESS(DELETE_ITEM_CART):
        // eslint-disable-next-line no-case-declarations
        const indexItem = state.dataCart.data.findIndex(
          item => item?.id === action.idItem,
        );
        draft.dataCart.data.splice(indexItem, 1);
        break;
      case FAILURE(DELETE_ITEM_CART):
        break;
      case REQUEST(GET_LIST_PRODUCT):
        draft.dataProduct.isFetching = true;
        break;
      case SUCCESS(GET_LIST_PRODUCT):
        draft.dataProduct.data = action.data;
        draft.dataProduct.isFetching = false;
        break;
      case FAILURE(GET_LIST_PRODUCT):
        draft.dataProduct.data = [];
        draft.dataProduct.isFetching = false;
        break;
      case REQUEST(ABOUT_HAIR_STYLE):
        draft.dataAboutHair.isFetching = true;
        break;
      case SUCCESS(ABOUT_HAIR_STYLE):
        draft.dataAboutHair.data = action.data;
        draft.dataAboutHair.isFetching = false;
        break;
      case FAILURE(ABOUT_HAIR_STYLE):
        draft.dataAboutHair.data = [];
        draft.dataAboutHair.isFetching = false;
        break;
      default:
        break;
    }
  });

export default authReducer;

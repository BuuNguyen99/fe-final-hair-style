import produce from 'immer';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import {
  GET_LIST_PRODUCT,
  GET_LIST_POPULAR_PRODUCT,
  DELETE_PRODUCT_ACTION,
  GET_LIST_ACCOUNT,
  DISABLE_ACCOUNT,
  ENABLE_ACCOUNT,
  DELETE_ACCOUNT,
  ADD_ACCOUNT,
  GET_DETAIL_ACCOUNT,
  GET_DETAIL_PRODUCT_ACTION,
  GET_LIST_COMMENT,
} from 'containers/HomePage/constants';

export const initialState = {
  dataProduct: {
    data: [],
    isFetching: false,
  },
  deleteProduct: {
    isFetching: false,
  },
  dataPopular: {
    data: [],
    isFetching: false,
  },
  dataAccount: {
    data: [],
    isFetching: false,
  },
  dataAddAccount: {
    isFetching: false,
  },
  dataDetailAccount: {
    data: [],
    isFetching: false,
  },
  dataDetailProduct: {
    data: [],
    isFetching: false,
  },
  dataComment: {
    data: [],
    isFetching: false,
  },
  dataDeleteItemCart: {
    isFetching: false,
  },
};

const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
      case REQUEST(DELETE_PRODUCT_ACTION):
        draft.deleteProduct.isFetching = true;
        break;
      case SUCCESS(DELETE_PRODUCT_ACTION):
        draft.deleteProduct.isFetching = false;
        // eslint-disable-next-line no-case-declarations
        const indexItem = state.dataProduct.data.content.findIndex(
          item => item?.id === action.id[0],
        );
        draft.dataProduct.data.content.splice(indexItem, 1);
        draft.deleteProduct.isFetching = false;
        break;
      case FAILURE(DELETE_PRODUCT_ACTION):
        draft.deleteProduct.isFetching = false;
        break;
      case REQUEST(GET_LIST_POPULAR_PRODUCT):
        draft.dataPopular.isFetching = true;
        break;
      case SUCCESS(GET_LIST_POPULAR_PRODUCT):
        draft.dataPopular.data = action.data;
        draft.dataPopular.isFetching = false;
        break;
      case FAILURE(GET_LIST_POPULAR_PRODUCT):
        draft.dataPopular.data = [];
        draft.dataPopular.isFetching = false;
        break;
      case REQUEST(GET_LIST_ACCOUNT):
        draft.dataAccount.isFetching = true;
        break;
      case SUCCESS(GET_LIST_ACCOUNT):
        draft.dataAccount.data = action.data;
        draft.dataAccount.isFetching = false;
        break;
      case FAILURE(GET_LIST_ACCOUNT):
        draft.dataAccount.data = [];
        draft.dataAccount.isFetching = false;
        break;
      case REQUEST(ENABLE_ACCOUNT):
        break;
      case SUCCESS(ENABLE_ACCOUNT):
        // eslint-disable-next-line no-case-declarations
        const indexItemEna = state.dataAccount.data.content.findIndex(
          item => item?.id === action.id,
        );
        draft.dataAccount.data.content[indexItemEna].account.enabled = true;
        break;
      case FAILURE(ENABLE_ACCOUNT):
        break;
      case REQUEST(DISABLE_ACCOUNT):
        break;
      case SUCCESS(DISABLE_ACCOUNT):
        // eslint-disable-next-line no-case-declarations
        const indexItemDis = state.dataAccount.data.content.findIndex(
          item => item?.id === action.id,
        );
        draft.dataAccount.data.content[indexItemDis].account.enabled = false;
        break;
      case FAILURE(DISABLE_ACCOUNT):
        break;
      case REQUEST(DELETE_ACCOUNT):
        break;
      case SUCCESS(DELETE_ACCOUNT):
        // eslint-disable-next-line no-case-declarations
        const indexItemAccount = state.dataAccount.data.content.findIndex(
          item => item?.id === action.id[0],
        );
        draft.dataAccount.data.content.splice(indexItemAccount, 1);
        break;
      case FAILURE(DELETE_ACCOUNT):
        break;
      case REQUEST(ADD_ACCOUNT):
        draft.dataAddAccount.isFetching = false;
        break;
      case SUCCESS(ADD_ACCOUNT):
        draft.dataAddAccount.isFetching = false;
        break;
      case FAILURE(ADD_ACCOUNT):
        draft.dataAddAccount.isFetching = false;
        break;
      case REQUEST(GET_DETAIL_ACCOUNT):
        draft.dataDetailAccount.isFetching = true;
        break;
      case SUCCESS(GET_DETAIL_ACCOUNT):
        draft.dataDetailAccount.data = action.data;
        draft.dataDetailAccount.isFetching = false;
        break;
      case FAILURE(GET_DETAIL_ACCOUNT):
        draft.dataDetailAccount.data = [];
        draft.dataDetailAccount.isFetching = false;
        break;
      case REQUEST(GET_DETAIL_PRODUCT_ACTION):
        draft.dataDetailProduct.data = [];
        draft.dataDetailProduct.isFetching = true;
        break;
      case SUCCESS(GET_DETAIL_PRODUCT_ACTION):
        draft.dataDetailProduct.data = action.data;
        draft.dataDetailProduct.isFetching = false;
        break;
      case FAILURE(GET_DETAIL_PRODUCT_ACTION):
        draft.dataDetailProduct.data = [];
        draft.dataDetailProduct.isFetching = false;
        break;
      case REQUEST(GET_LIST_COMMENT):
        draft.dataComment.data = [];
        draft.dataComment.isFetching = true;
        break;
      case SUCCESS(GET_LIST_COMMENT):
        draft.dataComment.data = action.data;
        draft.dataComment.isFetching = false;
        break;
      case FAILURE(GET_LIST_COMMENT):
        draft.dataComment.data = [];
        draft.dataComment.isFetching = false;
        break;
      default:
        break;
    }
  });

export default authReducer;

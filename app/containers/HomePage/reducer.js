import produce from 'immer';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import {
  GET_LIST_PRODUCT,
  DELETE_PRODUCT_ACTION,
} from 'containers/HomePage/constants';

export const initialState = {
  dataProduct: {
    data: [],
    isFetching: false,
  },
  deleteProduct: {
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
      default:
        break;
    }
  });

export default authReducer;

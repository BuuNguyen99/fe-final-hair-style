import produce from 'immer';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import { GET_LIST_VIEW_ACTION } from 'containers/Auth/constants';

export const initialState = {
  dataProduct: {
    data: [],
    isFetching: false,
  },
};

const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST(GET_LIST_VIEW_ACTION):
        draft.dataProduct.isFetching = true;
        break;
      case SUCCESS(GET_LIST_VIEW_ACTION):
        draft.dataProduct.data = action.data;
        draft.dataProduct.isFetching = false;
        break;
      case FAILURE(GET_LIST_VIEW_ACTION):
        draft.dataProduct.data = [];
        draft.dataProduct.isFetching = false;
        break;
      default:
        break;
    }
  });

export default authReducer;

import { REQUEST } from 'utils/actionType';
import {
  GET_LIST_PRODUCT,
  DELETE_PRODUCT_ACTION,
} from 'containers/HomePage/constants';

export function getViewHomeProduct(dataProduct, params) {
  return {
    type: REQUEST(GET_LIST_PRODUCT),
    dataProduct,
    params,
  };
}

export function deleteProductItem(id, callBack) {
  return {
    type: REQUEST(DELETE_PRODUCT_ACTION),
    id,
    callBack,
  };
}

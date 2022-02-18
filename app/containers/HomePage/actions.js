import { REQUEST } from 'utils/actionType';
import { GET_LIST_PRODUCT } from 'containers/Auth/constants';

export function getViewHomeProduct(dataProduct, params) {
  return {
    type: REQUEST(GET_LIST_PRODUCT),
    dataProduct,
    params,
  };
}

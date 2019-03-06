import axios from 'axios';
import { replaceInRoute } from '../utils/helpers';

export const SET_CURRENT_DEPARTMENT = 'SET_CURRENT_DEPARTMENT';
export const FETCH_PRODUCT_PENDING = 'FETCH_PRODUCT_PENDING';
export const FETCH_PRODUCT_FULFILLED = 'FETCH_PRODUCT_FULFILLED';
export const FETCH_PRODUCT_REJECTED = 'FETCH_PRODUCT_REJECTED';

export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_FULFILLED = 'FETCH_PRODUCTS_FULFILLED';
export const FETCH_PRODUCTS_REJECTED = 'FETCH_PRODUCTS_REJECTED';

const urlFetchProducts = '/products';
const urlFetchProduct = '/products/:slug';


export function setCurrentDepartment(value) {
  return { type: SET_CURRENT_DEPARTMENT, payload: value };
}

export function fetchProduct(slug) {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCT_PENDING,
    });
    axios.get(replaceInRoute(urlFetchProduct, { slug }))
      .then(res => res.data)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: FETCH_PRODUCT_FULFILLED,
            payload: data.data
          });
        } else {
          throw new Error('Fetching product data error');
        }
      })
      .catch(err => dispatch({ type: FETCH_PRODUCT_REJECTED, payload: err }));
  };
}


export function fetchProducts(requestData) {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCTS_PENDING,
    });
    axios.get(urlFetchProducts, { params: requestData })
      .then(res => res.data)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: FETCH_PRODUCTS_FULFILLED,
            payload: data.data
          });
        } else {
          throw new Error('Fetching product data error');
        }
      })
      .catch(err => dispatch({ type: FETCH_PRODUCTS_REJECTED, payload: err }));
  };
}

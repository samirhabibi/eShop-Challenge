//get data
export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsBegin());
    return fetch(
      "https://bojwbhw97e.execute-api.us-east-2.amazonaws.com/Production/eshop-challenge/products"
    )
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.body));
        return json.body;
      })
      .catch(error => dispatch(fetchProductsFailure(error)));
  };
}

export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = body => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { body }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

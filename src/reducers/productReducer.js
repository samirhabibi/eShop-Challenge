import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from "../actions/productAction";

const initialState = {
  body: [],
  loading: false,
  error: null
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      // All done: set loading "false".
      // replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        body: action.payload.body
      };

    case FETCH_PRODUCTS_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.

      return {
        ...state,
        loading: false,
        error: action.payload.error,
        body: []
      };

    default:
      return state;
  }
}

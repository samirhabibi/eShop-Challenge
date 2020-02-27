export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const UPDATE_ITEM_UNITS = "UPDATE_ITEM_UNITS";

export function addToCart({ productId, name, image, price, brand, units = 1 }) {
  return {
    type: ADD_TO_CART,
    payload: { productId, name, image, price, brand, units }
  };
}
export function deleteFromCart({ productId }) {
  return {
    type: DELETE_FROM_CART,
    payload: { productId }
  };
}
export function updateItemUnits({ productId, units }) {
  return {
    type: UPDATE_ITEM_UNITS,
    payload: { productId, units }
  };
}

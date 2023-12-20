import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQ,
  ADD_TO_CART_RESET,
  ADD_TO_CART_SUCCESS,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_REQ,
  DELETE_ITEM_RESET,
  DELETE_ITEM_SUCCESS,
  DELETE_MY_CART_FAIL,
  DELETE_MY_CART_REQ,
  DELETE_MY_CART_RESET,
  DELETE_MY_CART_SUCCESS,
  GET_MY_CART_FAIL,
  GET_MY_CART_REQ,
  GET_MY_CART_SUCCESS,
} from "./cart_const";

export const addTocartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART_REQ:
      return { add_cartLoad: true };

    case ADD_TO_CART_SUCCESS:
      return { add_cartLoad: false, isAdded: true, cart: action.payload };

    case ADD_TO_CART_FAIL:
      return { add_cartLoad: false, isAdded: false, cart: action.payload };

    case ADD_TO_CART_RESET:
      return {};

    default:
      return { ...state };
  }
};

export const getMyCartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MY_CART_REQ:
      return { myCart_Load: true };

    case GET_MY_CART_SUCCESS:
      return { myCart_Load: false, success: true, myCart: action.payload };

    case GET_MY_CART_FAIL:
      return { myCart_Load: false, success: false, myCart: action.payload };

    default:
      return { ...state };
  }
};

export const delItemInCart = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ITEM_REQ:
      return { delItem: true };

    case DELETE_ITEM_SUCCESS:
      return { delItem: false, isDeleted: true, message: action.payload };

    case DELETE_ITEM_FAIL:
      return { delItem: false, isDeleted: false, message: action.payload };

    case DELETE_ITEM_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const deleteCartReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MY_CART_REQ:
      return { deleteCartLoad: true };

    case DELETE_MY_CART_SUCCESS:
      return {
        deleteCartLoad: false,
        isDeleted: true,
        message: action.payload,
      };

    case DELETE_MY_CART_FAIL:
      return {
        deleteCartLoad: false,
        isDeleted: false,
        message: action.payload,
      };

    case DELETE_MY_CART_RESET:
      return { ...state };

    default:
      return { ...state };
  }
};

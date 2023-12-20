import {
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQ,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_REQ,
  GET_ORDERS_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
  GET_ORDER_DETAIL_REQ,
  GET_ORDER_DETAIL_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQ,
  MY_ORDERS_SUCCESS,
  MY_ORDER_DETAIL_FAIL,
  MY_ORDER_DETAIL_REQ,
  MY_ORDER_DETAIL_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQ,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
} from "./order_const";

export const myOrderReducer = (state = [], action) => {
  switch (action.type) {
    case MY_ORDERS_REQ:
      return { myOrder_load: true };

    case MY_ORDERS_SUCCESS:
      return { myOrder_load: false, Orders: action.payload };

    case MY_ORDERS_FAIL:
      return { myOrder_load: false, Orders: action.payload };

    default:
      return state;
  }
};

export const detailOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_ORDER_DETAIL_REQ:
      return { detailLoad: true };

    case MY_ORDER_DETAIL_SUCCESS:
      return { detailLoad: false, detail: action.payload };

    case MY_ORDER_DETAIL_FAIL:
      return { detailLoad: false, detail: action.payload };

    default:
      return state;
  }
};

export const getOrdersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS_REQ:
      return { loadingOrders: true };

    case GET_ORDERS_SUCCESS:
      return { loadingOrders: false, Orders: action.payload };

    case GET_ORDERS_FAIL:
      return { loadingOrders: false, error: action.payload };

    default:
      return state;
  }
};

export const upDelOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQ:
    case DELETE_ORDER_REQ:
      return { loading: true };

    case UPDATE_ORDER_SUCCESS:
      return { loading: false, isUpdated: true, updated: action.payload };

    case DELETE_ORDER_SUCCESS:
      return { loading: false, isDeleted: true, deleted: action.payload };

    case UPDATE_ORDER_FAIL:
      return { loading: false, isUpdated: false, updated: action.payload };

    case DELETE_ORDER_FAIL:
      return { loading: false, isDeleted: false, deleted: action.payload };

    case UPDATE_ORDER_RESET:
    case DELETE_ORDER_RESET:
      return {};

    default:
      return state;
  }
};

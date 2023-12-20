import {
  CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQ,
  CREATE_PAYMENT_RESET,
  CREATE_PAYMENT_SUCCESS,
  GET_TOKEN_FAIL,
  GET_TOKEN_REQ,
  GET_TOKEN_RESET,
  GET_TOKEN_SUCCESS,
  UPDATE_PAYMENT_FAIL,
  UPDATE_PAYMENT_REQ,
  UPDATE_PAYMENT_RESET,
  UPDATE_PAYMENT_SUCCESS,
} from "./payment_const";

export const getTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOKEN_REQ:
      return { loadToken: true };

    case GET_TOKEN_SUCCESS:
      return { loadToken: false, success: true, token: action.payload };

    case GET_TOKEN_FAIL:
      return { loadToken: false, success: false, token: action.payload };

    case GET_TOKEN_RESET:
      return {};

    default:
      return state;
  }
};

export const createPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_REQ:
      return { new_payment: true };

    case CREATE_PAYMENT_SUCCESS:
      return {
        new_payment: false,
        payment_success: true,
        payment: action.payload,
      };

    case CREATE_PAYMENT_FAIL:
      return {
        new_payment: false,
        payment_success: false,
        payment: action.payload,
      };

    case CREATE_PAYMENT_RESET:
      return {};

    default:
      return state;
  }
};

export const updatePaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PAYMENT_REQ:
      return { updateLoaded: true };

    case UPDATE_PAYMENT_SUCCESS:
      return { updateLoaded: false, isUpdated: true, payment: action.payload };

    case UPDATE_PAYMENT_FAIL:
      return { updateLoaded: false, isUpdated: false, payment: action.payload };

    case UPDATE_PAYMENT_RESET:
      return {};

    default:
      return state;
  }
};

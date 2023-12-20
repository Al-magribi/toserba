import {
  GET_DATA_STORE_FAIL,
  GET_DATA_STORE_REQ,
  GET_DATA_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_REQ,
  UPDATE_STORE_RESET,
  UPDATE_STORE_SUCCESS,
} from "./Store_cost";

export const getStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DATA_STORE_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_DATA_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_DATA_STORE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STORE_REQ:
      return {
        ...state,
        loadingUpdate: true,
      };

    case UPDATE_STORE_SUCCESS:
      return {
        ...state,
        loadingUpdate: false,
        isUpdated: true,
        dataUpdate: action.payload,
      };

    case UPDATE_STORE_FAIL:
      return {
        ...state,
        loadingUpdate: false,
        isUpdated: false,
        errorUpdate: action.payload,
      };

    case UPDATE_STORE_RESET:
      return {};

    default:
      return state;
  }
};

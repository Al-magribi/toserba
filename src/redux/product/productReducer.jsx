import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQ,
  ADD_PRODUCT_RESET,
  ADD_PRODUCT_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQ,
  CREATE_REVIEW_RESET,
  CREATE_REVIEW_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQ,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQ,
  DELETE_PRODUCTS_RESET,
  DELETE_PRODUCTS_SUCCESS,
  GET_DETAIL_PRODUCT_FAIL,
  GET_DETAIL_PRODUCT_REQ,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQ,
  GET_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQ,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  UPLOAD_FILE_FAIL,
  UPLOAD_FILE_REQ,
  UPLOAD_FILE_RESET,
  UPLOAD_FILE_SUCCESS,
} from "./productConst";

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQ:
      return { addLoading: true };

    case ADD_PRODUCT_SUCCESS:
      return { addLoading: false, isAdded: true, added: action.payload };

    case ADD_PRODUCT_FAIL:
      return { addLoading: false, isAdded: false, added: action.payload };

    case ADD_PRODUCT_RESET:
      return {};

    default:
      return state;
  }
};

export const getProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQ:
      return { ...state, productsLoading: true };

    case GET_PRODUCTS_SUCCESS:
      return { productsLoading: false, Products: action.payload };

    case GET_PRODUCTS_FAIL:
      return { productsLoading: false, Products: action.payload };
    default:
      return state;
  }
};

export const detailProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DETAIL_PRODUCT_REQ:
      return { ...state, productLoading: true };

    case GET_DETAIL_PRODUCT_SUCCESS:
      return { productLoading: false, Product: action.payload };

    case GET_DETAIL_PRODUCT_FAIL:
      return { productLoading: false, Product: action.payload };
    default:
      return state;
  }
};

export const upDelProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQ:
    case DELETE_PRODUCT_REQ:
    case DELETE_PRODUCTS_REQ:
      return { loading: true };

    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, isUpdated: true, updated: action.payload };

    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, isDeleted: true, deleted: action.payload };

    case DELETE_PRODUCTS_SUCCESS:
      return { loading: false, allDeleted: true, deleted: action.payload };

    case UPDATE_PRODUCT_FAIL:
      return { loading: false, isUpdated: false, error: action.payload };

    case DELETE_PRODUCT_FAIL:
      return { loading: false, isDeleted: false, error: action.payload };

    case DELETE_PRODUCTS_FAIL:
      return { loading: false, allDeleted: false, error: action.payload };

    case UPDATE_PRODUCT_RESET:
    case DELETE_PRODUCT_RESET:
    case DELETE_PRODUCTS_RESET:
      return {};

    default:
      return state;
  }
};

export const uploadFileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_FILE_REQ:
      return { uploadLoading: true };

    case UPLOAD_FILE_SUCCESS:
      return {
        uploadLoading: false,
        isUploaded: true,
        uploaded: action.payload,
      };

    case UPLOAD_FILE_FAIL:
      return {
        uploadLoading: false,
        isUploaded: false,
        uploaded: action.payload,
      };

    case UPLOAD_FILE_RESET:
      return state;

    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQ:
      return { loadingReview: true };

    case CREATE_REVIEW_SUCCESS:
      return { loadingReview: false, isCreated: true, created: action.payload };

    case CREATE_REVIEW_FAIL:
      return {
        loadingReview: false,
        isCreated: false,
        created: action.payload,
      };

    case CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

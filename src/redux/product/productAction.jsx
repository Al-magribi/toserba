import axios from "axios";
import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQ,
  ADD_PRODUCT_SUCCESS,
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_REQ,
  CREATE_REVIEW_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQ,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQ,
  DELETE_PRODUCT_SUCCESS,
  GET_DETAIL_PRODUCT_FAIL,
  GET_DETAIL_PRODUCT_REQ,
  GET_DETAIL_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQ,
  GET_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQ,
  UPDATE_PRODUCT_SUCCESS,
  UPLOAD_FILE_FAIL,
  UPLOAD_FILE_REQ,
  UPLOAD_FILE_SUCCESS,
} from "./productConst";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_API });

export const addNewProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQ });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.post(
      `/api/product/add-new`,
      product,
      config
    );

    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

export const uploadFile = (file) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_FILE_REQ });

    const config = {
      headers: {
        "Content-Type": "application/vnd.ms-excel",
      },
      withCredentials: true,
    };

    const dataFile = new FormData();
    dataFile.append("file", file);

    const { data } = await axiosUrl.post(
      `/api/product/upload-product`,
      dataFile,
      config
    );

    dispatch({ type: UPLOAD_FILE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UPLOAD_FILE_FAIL, payload: error.response.data.message });
  }
};

export const getProducts = (searchTerm, category) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let url = `/api/product/get-all?search=${searchTerm}`;

    if (category) {
      url += `&category=${category}`;
    }

    const { data } = await axiosUrl.get(url, config);

    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_FAIL, payload: error.message });
  }
};

export const getProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: GET_DETAIL_PRODUCT_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUrl.get(`/api/product/${product}`, config);

    dispatch({ type: GET_DETAIL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_DETAIL_PRODUCT_FAIL, payload: error.message });
  }
};

export const updateProduct = (product, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQ });

    console.log(product);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.put(
      `/api/product/update/${id}`,
      product,
      config
    );

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.delete(`/api/product/delete/${id}`, config);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
  }
};

export const deleteProducts = () => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.delete(
      "/api/product/delete-products",
      config
    );

    dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCTS_FAIL, payload: error.message });
  }
};

export const createReview = (id, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVIEW_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.post(
      `/api/product/create-review/${id}`,
      reviewData,
      config
    );

    console.log(data.product);

    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);

    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

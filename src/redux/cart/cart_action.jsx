import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQ,
  ADD_TO_CART_SUCCESS,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_REQ,
  DELETE_ITEM_SUCCESS,
  DELETE_MY_CART_FAIL,
  DELETE_MY_CART_REQ,
  DELETE_MY_CART_SUCCESS,
  GET_MY_CART_FAIL,
  GET_MY_CART_REQ,
  GET_MY_CART_SUCCESS,
} from "./cart_const";
import axios from "axios";

const axios_api = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_API });

export const addToCart = (cart) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.post(
      "/api/cart/add-to-cart",
      cart,
      config
    );

    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAIL, payload: error.response.data.message });
  }
};

export const getMyCart = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MY_CART_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.get("/api/cart/my-cart", config);

    dispatch({ type: GET_MY_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_MY_CART_FAIL, payload: error.response.data.message });
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ITEM_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.delete(`/api/cart/my-cart/${id}`, config);

    dispatch({ type: DELETE_ITEM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_ITEM_FAIL, payload: error.response.data.message });
  }
};

export const deleteCart = (productIds, userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MY_CART_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.delete(
      `/api/cart/delete/my-cart/${userId}`,
      { data: productIds },
      config
    );

    dispatch({ type: DELETE_MY_CART_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: DELETE_MY_CART_FAIL, payload: error.message });
  }
};

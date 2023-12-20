import axios from "axios";
import {
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQ,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDERS_REQ,
  GET_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQ,
  MY_ORDERS_SUCCESS,
  MY_ORDER_DETAIL_FAIL,
  MY_ORDER_DETAIL_REQ,
  MY_ORDER_DETAIL_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQ,
  UPDATE_ORDER_SUCCESS,
} from "./order_const";

const axios_api = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_API });

export const getMyOrders = (user) => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.get(
      `/api/orders/my-order/${user}`,
      config
    );

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error.message });
  }
};

export const getOrderDetail = (user, orderId) => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_DETAIL_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.get(
      `/api/orders/detail-order/${user}/${orderId}`,
      config
    );

    dispatch({ type: MY_ORDER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDER_DETAIL_FAIL, payload: error.message });
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDERS_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.get("/api/orders/get-orders", config);

    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ORDERS_FAIL, payload: error.message });
  }
};

export const updateOrder = (id, updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.put(
      `/api/orders/update-order/${id}`,
      updateData,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.delete(
      `/api/orders/delete-order/${id}`,
      config
    );

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
  }
};

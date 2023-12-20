import axios from "axios";
import {
  CREATE_PAYMENT_FAIL,
  CREATE_PAYMENT_REQ,
  CREATE_PAYMENT_SUCCESS,
  GET_TOKEN_FAIL,
  GET_TOKEN_REQ,
  GET_TOKEN_SUCCESS,
  UPDATE_PAYMENT_FAIL,
  UPDATE_PAYMENT_REQ,
  UPDATE_PAYMENT_SUCCESS,
} from "./payment_const";

const axios_api = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_API });

export const getToken = (dataPayment) => async (dispatch) => {
  try {
    dispatch({ type: GET_TOKEN_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.post(
      `/api/payment/transactions`,
      dataPayment,
      config
    );

    dispatch({ type: GET_TOKEN_SUCCESS, payload: data.token });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_TOKEN_FAIL, payload: error.response.data.message });
  }
};

export const createPayment = (payment) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PAYMENT_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.post(
      "/api/payment/create",
      payment,
      config
    );

    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: CREATE_PAYMENT_FAIL, payload: error.message });
  }
};

export const upPayment = (id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PAYMENT_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios_api.get(`/api/payment/status/${id}`, config);

    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

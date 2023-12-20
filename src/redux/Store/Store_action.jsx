import axios from "axios";
import {
  GET_DATA_STORE_FAIL,
  GET_DATA_STORE_REQ,
  GET_DATA_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_REQ,
  UPDATE_STORE_SUCCESS,
} from "./Store_cost";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_API });

export const getStoreData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DATA_STORE_REQ });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.get("/api/store/get-data", config);

    dispatch({ type: GET_DATA_STORE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DATA_STORE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateStore = (updateData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STORE_REQ });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axiosUrl.put(
      "/api/store/update-store",
      updateData,
      config
    );

    dispatch({ type: UPDATE_STORE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: UPDATE_STORE_FAIL, payload: error.response.data.message });
  }
};

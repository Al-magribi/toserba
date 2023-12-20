import axios from "axios";
import {
  GET_CITIES_FAIL,
  GET_CITIES_REQ,
  GET_CITIES_SUCCESS,
  GET_COURIERS_FAIL,
  GET_COURIERS_REQ,
  GET_COURIERS_SUCCESS,
  GET_PROVINCES_FAIL,
  GET_PROVINCES_REQ,
  GET_PROVINCES_SUCCESS,
} from "./shippingConst";

const axiosUrl = axios.create({ baseURL: import.meta.env.VITE_DOMAIN_API });

export const getProvinces = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROVINCES_REQ });

    const { data } = await axiosUrl.get("/api/shipping/provinces");

    dispatch({ type: GET_PROVINCES_SUCCESS, payload: data.rajaongkir.results });
  } catch (error) {
    dispatch({
      type: GET_PROVINCES_FAIL,
      payload: error.message,
    });
  }
};

export const getCities = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CITIES_REQ });

    const { data } = await axiosUrl.get(`/api/shipping/city/${id}`);

    dispatch({ type: GET_CITIES_SUCCESS, payload: data.rajaongkir.results });
  } catch (error) {
    dispatch({ type: GET_CITIES_FAIL, payload: error.message });
  }
};

export const getServices =
  (origin, destination, weight, courier) => async (dispatch) => {
    try {
      dispatch({ type: GET_COURIERS_REQ });

      const { data } = await axiosUrl.get(
        `/api/shipping/get-cost/${origin}/${destination}/${weight}/${courier}`
      );

      const services = data.rajaongkir.results[0].costs;

      dispatch({ type: GET_COURIERS_SUCCESS, payload: services });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_COURIERS_FAIL, payload: error.message });
    }
  };

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

export const provincesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PROVINCES_REQ:
      return { provincesLoading: true };

    case GET_PROVINCES_SUCCESS:
      return { provincesLoading: false, provinces: action.payload };

    case GET_PROVINCES_FAIL:
      return { provincesLoading: false, provinceError: action.payload };

    default:
      return state;
  }
};

export const citiesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CITIES_REQ:
      return { citiesLoading: true };

    case GET_CITIES_SUCCESS:
      return { citiesLoading: false, cities: action.payload };

    case GET_CITIES_FAIL:
      return { citiesLoading: false, citiesError: action.payload };

    default:
      return state;
  }
};

export const couriersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_COURIERS_REQ:
      return { couriersLoading: true };

    case GET_COURIERS_SUCCESS:
      return { couriersLoading: false, services: action.payload };

    case GET_COURIERS_FAIL:
      return { couriersLoading: false, servicesError: action.payload };

    default:
      return state;
  }
};
